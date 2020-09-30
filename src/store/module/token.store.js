const state = () => ({
    token: '',
    auth: false
})

const getters = {
    getToken: s => s.token,
    isAuth: s => s.auth
}

const actions = {

}

const mutations = {
    CONNECT(s, payload) {
        s.auth = true;
        s.token = payload;
    },
    DISCONNECT(s) {
        s.auth = false;
        s.token = '';
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}