# transmission-vue

## Documentation

* Vue.js: https://fr.vuejs.org/v2/guide/
* Vue-cli: https://cli.vuejs.org/guide/
* Bootstrap-vue: https://bootstrap-vue.org/docs
* Transmission-Rpc: https://github.com/transmission/transmission/blob/master/extras/rpc-spec.txt

## Vue.js

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
## Docker

|Nom|Type|Commentaire|
|---|---|---|
|80|PORT| le port exposé par le docker est le 80 (non sécurisé)
|URL_TRANSMISION|ENV|Variable d'environement pour spécifier l'url transmission (host+port, ex: http://localhost:9000, pas besoin de détailler le chemin) 
|/logs|MONTAGE| emplacement des logs ngynx, a monter, pour recupérer les logs

### Config Ngynx

Emplacement: templates/nginx.conf.template

```
rewrite ^/api /transmission/rpc break;
proxy_pass ${URL_TRANSMISION};
```

=> Le template utilise une variable d'environnement pour configurer le proxy/reverse proxy.