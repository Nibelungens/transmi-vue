# étape de build
FROM node:erbium-alpine as build-stage

RUN npm install --loglevel=error @vue/cli@^4.5.0
WORKDIR /transmission-vue
COPY ./package*.json ./
RUN npm install --loglevel=error
ADD src ./src
RUN npm run build

# étape de production
FROM nginx:1.19.2-alpine as production-stage

ENV URL_TRANSMISION http://localhost:9000

RUN mkdir /logs

COPY --from=build-stage /transmission-vue/dist /usr/share/nginx/html
COPY templates/nginx.conf.template /etc/nginx/nginx.conf.template

EXPOSE 80
VOLUME /logs

CMD envsubst < etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'