import {AuthenticationStore} from "../interfaces/authentication-store.data";


export const store = {
    namespaced: true,
    state() {
        return {
            token: '',
            auth: false
        }
    },
    getters: {
        getToken(state: AuthenticationStore) {
            return state.token;
        },
        isAuth(state: AuthenticationStore) {
            return state.auth;
        }
    },
    mutations: {
        connect(state: AuthenticationStore, payload: string) {
            state.auth = true;
            state.token = payload;
        },
        disconnect(state: AuthenticationStore) {
            state.auth = false;
            state.token = '';
        }
    }
}