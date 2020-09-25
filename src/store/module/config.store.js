const state = () => ({
    timeRefresh: 1000
})

const getters = {
    getTimeRefresh: state => state.timeRefresh
}

const actions = {

}

const mutations = {
    SET_TIME_REFRESH(state, payload) {
        state.timeRefresh.push(payload);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}