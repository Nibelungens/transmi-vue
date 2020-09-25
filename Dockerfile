# étape de production
FROM nginx:1.19.2-alpine as production-stage

ENV URL_TRANSMISION http://localhost:9000

RUN mkdir /logs

COPY ./dist /usr/share/nginx/html
COPY templates/nginx.conf.template /etc/nginx/nginx.conf.template

EXPOSE 80
VOLUME /logs

CMD envsubst < etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'