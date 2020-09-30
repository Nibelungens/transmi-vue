import Axios from "axios";

const SESSION_TOKEN = 'x-transmission-session-id';
const CODE_ERROR_TOKEN = 409;

const interceptor = {
    init(store) {
        Axios.interceptors.request.use(config => {
            config.headers = {'x-transmission-session-id': store.getters['Token/getToken']};
            return config;
        })

        Axios.interceptors.response.use(config => {
            return config;
        }, error => {
            if (error.response.status === CODE_ERROR_TOKEN) {
                store.commit('Token/CONNECT', error.response.headers[SESSION_TOKEN])
                return Axios.request(error.config);
            } else {
                store.commit('Token/DISCONNECT')
                return error;
            }
        });
    }
}

export default interceptor;