import {createStore} from 'vuex'
import {store as configStoreModule} from "./modules/config.store.module";
import {store as authenticationStoreModule} from "./modules/authentication.store.modules";
import {store as torrentsStoreModule} from "./modules/torrents.store.module";

export const store = createStore({
    modules: {
        config: configStoreModule,
        authentication: authenticationStoreModule,
        torrents: torrentsStoreModule
    }
});
