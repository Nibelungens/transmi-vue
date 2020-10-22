# transmi(vue)

:warning: Development in progress

New front-end in Vue-js for Bitorrent client transmission (https://transmissionbt.com/)

![CI-Test](https://github.com/Nibelungens/transmi-vue/workflows/CI-Test/badge.svg?branch=master)
![CI-Build](https://github.com/Nibelungens/transmi-vue/workflows/CI-Build/badge.svg?branch=master)

![Main page Transmi(vue)](https://github.com/Nibelungens/transmi-vue/raw/master/ressources/main.png)

<img src="https://github.com/Nibelungens/transmi-vue/raw/master/ressources/panel.png" alt="Panel Transmi(vue)" width="10%"/>
<img src="https://github.com/Nibelungens/transmi-vue/raw/master/ressources/peers.png" alt="Peers Transmi(vue)" width="10%"/>

## Documentation

### For Developer

* Vue.js: https://fr.vuejs.org/v2/guide/
* Vue-cli: https://cli.vuejs.org/guide/
* Bootstrap-vue: https://bootstrap-vue.org/docs
* Transmission-Rpc: https://github.com/transmission/transmission/blob/master/extras/rpc-spec.txt

## Vue.js

### Project setup
```shell script
npm install
```

### Compiles and hot-reloads for development
```shell script
npm run serve
```

### Compiles and minifies for production
```shell script
npm run build
```

### Lints and fixes files
```shell script
npm run lint
```
## Docker
https://hub.docker.com/r/nibelungens/transmi-vue

|Name|Type|Comments|
|---|---|---|
|80|PORT| Port exposed by the docker is 80 (not secure)
|URL_TRANSMISION|ENV| Environment variable to specify the transmission url (host + port, ex: http: // localhost: 9000, no need to detail the path)
|/logs|MONTAGE| Location of the ngynx logs, to be mounted, to retrieve the logs

### Docker Compose

#### Only Transmi(vue)

```yaml
version: "2.1"
services:
  transmi-vue:
    image: nibelungens/transmi-vue:latest
    container_name: transmission-vue
    environment:
      - URL_TRANSMISION=<transmission url>
    volumes:
      - <path to logs>:/logs #optional
    ports:
      - <port redirection>:80
    restart: unless-stopped
```

#### Transmi(vue) and Transmission

Based on linux server images: https://hub.docker.com/r/linuxserver/transmission

```yaml
version: "2.1"
services:
  transmission:
    image: linuxserver/transmission:latest
    container_name: transmission
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/London
      - USER=username #optional
      - PASS=password #optional
    volumes:
      - <path to data>:/config
      - <path to downloads>:/downloads
      - <path to watch folder>:/watch #optional
    ports:
      - 9091:9091
      - 51413:51413
      - 51413:51413/udp
    restart: unless-stopped
  transmi-vue:
    image: nibelungens/transmi-vue:latest
    container_name: transmi-vue
    environment:
      - URL_TRANSMISION=http://${HOST_API}:9091
    volumes:
      - <path to logs>:/logs #optional
    ports:
      - <http port for transmi(vue)>:80
    restart: unless-stopped
```

### Docker compose ready to use (portainer)

```yaml
version: "2.1"
services:
  transmission:
    image: linuxserver/transmission
    container_name: transmission-linuxserver
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Paris
    volumes:
      - ${CONFIG_VOL}:/config
      - ${DOWNLOAD_VOL}:/downloads
      - ${WATCH_VOL}:/watch
    ports:
      - ${PORT_API}:9091
      - 51413:51413
      - 51413:51413/udp
    restart: unless-stopped
  transmi-vue:
    image: nibelungens/transmi-vue:latest
    container_name: transmi-vue
    environment:
      - URL_TRANSMISION=http://${HOST_API}:${PORT_API}
    ports:
      - ${PORT_HTTP}:80
    restart: unless-stopped
```
###### Variables to replace
|Name|Comments|
|---|---|
|CONFIG_VOL|Path to data|
|DOWNLOAD_VOL|Path to downloads|
|WATCH_VOL|Path to watch folder|
|HOST_API|Hostname of transmission (for API)|
|PORT_API|Port of transmission (for API)|
|PORT_HTTP|HTTP Port of transmi(vue)|

### Config Ngynx

Location: templates/nginx.conf.template

```
rewrite ^/api /transmission/rpc break;
proxy_pass ${URL_TRANSMISION};
```

:arrow_right: The template uses an environment variable to configure the proxy / reverse proxy.