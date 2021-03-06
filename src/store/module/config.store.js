const state = () => ({
    downloadDirFreeSpace: null,
    detailsPanel: false,
    timeRefresh: 1000,
    downloadDir: null,
    version: null,
    selectSort: {
        col: 'name',
        reverse: false
    }
})

const getters = {
    getDownloadDirFreeSpace: s => s.downloadDirFreeSpace,
    getSelectSortReverse: s => s.selectSort.reverse,
    getSelectSortCol: s => s.selectSort.col,
    getDetailsPanel: s => s.detailsPanel,
    getDownloadDir: s => s.downloadDir,
    getTimeRefresh: s => s.timeRefresh,
    getVersion: s => s.version,
}

const actions = {

}

const mutations = {
    SET_TIME_REFRESH(s, payload) {
        s.timeRefresh = payload;
    },
    SET_CONFIG(s, payload) {
        s.downloadDir = payload['download-dir'];
        s.downloadDirFreeSpace = payload['download-dir-free-space'];
        s.version = payload.version;
    },
    SET_DOWNLOAD_DIR_FREE_SPACE(s, payload) {
        s.downloadDirFreeSpace = payload;
    },
    SET_SORT(s, payload) {
        s.selectSort.col = payload[0];
        s.selectSort.reverse = payload[1];
    },
    SET_DETAILS_PANEL(s, payload) {
        s.detailsPanel = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}