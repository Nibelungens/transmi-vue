const state = () => ({
    torrents: [],
    selectedTorrent: []
})

const getters = {
    getTorrents: state => state.torrents,
    getSelectedTorrent: state => state.selectedTorrent
}

const actions = {

}

const mutations = {
    ADD_SELECTED(state, payload) {
        state.selectedTorrent.push(payload);
    },
    REMOVE_SELECTED(state, payload) {
        state.selectedTorrent.splice(state.selectedTorrent.indexOf(payload), 1);
    },
    SET_LIST_TORRENT(state, payload) {
        state.torrents = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}