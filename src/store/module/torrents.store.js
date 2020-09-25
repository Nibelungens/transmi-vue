const state = () => ({
    torrents: [],
    selectedTorrents: [],
    selectedTorrent: null
})

const getters = {
    getTorrents: state => state.torrents,
    getSelectedTorrents: state => state.selectedTorrents,
    getSelectedTorrent: state => state.selectedTorrent
}

const actions = {

}

const mutations = {
    ADD_SELECTED(state, payload) {
        state.selectedTorrents.push(payload);
    },
    REMOVE_SELECTED(state, payload) {
        state.selectedTorrents.splice(state.selectedTorrents.indexOf(payload), 1);
    },
    SET_LIST_TORRENT(state, payload) {
        state.torrents = payload;
    },
    SELECT(state, payload) {
        state.selectedTorrent = payload;
    },
    UNSELECT(state) {
        state.selectedTorrent = null;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}