
import Notification from "@/store/module/notification.store";
import Torrents from '@/store/module/torrents.store';
import Config from "@/store/module/config.store";
import Token from "@/store/module/token.store";
import { createStore } from "vuex";

const store = createStore({
    modules: {
        Torrents,
        Token,
        Config,
        Notification
    }
});

export default store;