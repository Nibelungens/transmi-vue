import axios from "axios";
import {store} from "../store/vuex-store";

export default function interceptor() {

    axios.interceptors.request.use(config => {
        config.headers = {'x-transmission-session-id': store.getters["authentication/getToken"]};
        return config;
    })

    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        switch (error.response.status) {
            case 409:
                store.commit(`authentication/connect`, error.response.headers['x-transmission-session-id']);
                return axios(error.config);
            default:
                store.commit(`authentication/disconnect`);
                return Promise.reject(error);
        }
    });
}