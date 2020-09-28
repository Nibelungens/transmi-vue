const state = () => ({
    timeRefresh: 1000,
    downloadDir: null,
    downloadDirFreeSpace: null
})

const getters = {
    getTimeRefresh: state => state.timeRefresh,
    getDownloadDir: state => state.downloadDir,
    getDownloadDirFreeSpace: state => state.downloadDirFreeSpace
}

const actions = {

}

const mutations = {
    SET_TIME_REFRESH(state, payload) {
        state.timeRefresh = payload;
    },
    SET_CONFIG(state, payload) {
        state.downloadDir = payload['download-dir'];
        state.downloadDirFreeSpace = payload['download-dir-free-space'];
    },
    SET_DOWNLOAD_DIR_FREE_SPACE(state, payload) {
        state.downloadDirFreeSpace = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}