
import Notification from "@/store/module/notification.store";
import Torrents from '@/store/module/torrents.store';
import Config from "@/store/module/config.store";
import Token from "@/store/module/token.store";
import Vuex from "vuex";
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        Torrents,
        Token,
        Config,
        Notification
    }
});

export default store;