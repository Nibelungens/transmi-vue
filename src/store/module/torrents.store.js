const state = () => ({
    torrents: [],
    selectedTorrents: []
})

const getters = {
    getTorrents: state => state.torrents,
    getSelectedTorrents: state => state.selectedTorrents,
}

const actions = {

}

const mutations = {
    SELECTED(state, payload) {
        state.selectedTorrents = [payload];
    },
    UNSELECTED(state) {
        state.selectedTorrents = [];
    },
    ADD_SELECTED(state, payload) {
        state.selectedTorrents.push(payload);
    },
    REMOVE_SELECTED(state, payload) {
        const index = state.selectedTorrents.findIndex((torrent) => torrent.id === payload.id);
        if (index !== -1) {
            state.selectedTorrents.splice(index, 1);
        }
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