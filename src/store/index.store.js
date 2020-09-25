import Vue from 'vue'
import Vuex from "vuex";
import Torrents from '@/store/module/torrents.store';
import Token from "@/store/module/token.store";
import Config from "@/store/module/config.store";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        Torrents,
        Token,
        Config
    }
});

export default store;