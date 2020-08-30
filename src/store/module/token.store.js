const state = () => ({
    token: '',
    auth: false
})

const getters = {
    getToken: state => state.token,
    isAuth: state => state.auth
}

const actions = {

}

const mutations = {
    CONNECT(state, payload) {
        state.auth = true;
        state.token = payload;
    },
    DISCONNECT(state) {
        state.auth = false;
        state.token = '';
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}