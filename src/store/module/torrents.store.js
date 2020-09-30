const state = () => ({
    torrents: [],
    selectedTorrents: []
})

const getters = {
    getTorrents: s => s.torrents,
    getSelectedTorrents: s => s.selectedTorrents,
}

const actions = {

}

const mutations = {
    SELECTED(s, payload) {
        s.selectedTorrents = [payload];
    },
    UNSELECTED(s) {
        s.selectedTorrents = [];
    },
    ADD_SELECTED(s, payload) {
        s.selectedTorrents.push(payload);
    },
    REMOVE_SELECTED(s, payload) {
        const index = s.selectedTorrents.findIndex((torrent) => torrent.id === payload.id);
        if (index !== -1) {
            s.selectedTorrents.splice(index, 1);
        }
    },
    SET_LIST_TORRENT(s, payload) {
        s.torrents = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}