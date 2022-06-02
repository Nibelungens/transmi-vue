import interceptor from './config/interceptor.axios';
import {bus, key as busKey} from './config/event-bus.config';
import {i18nConfig} from './config/i18n.config';
import {createApp} from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'

import {store} from "./store/vuex-store";

import {
    ApiTransmissionTorrentService,
    key as apiTransmissionTorrentKey
} from "./services/api-transmission-torrent.service";

createApp(App)
    .use(i18nConfig)
    .use(interceptor)
    .use(store)
    // Service injection
    .provide(busKey, bus)
    .provide(apiTransmissionTorrentKey, new ApiTransmissionTorrentService())
    // That all folks
    .mount('#app');
