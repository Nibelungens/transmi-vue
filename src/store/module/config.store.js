const state = () => ({
    downloadDirFreeSpace: null,
    downloadLimit: null,
    timeRefresh: 1000,
    downloadDir: null,
    uploadLimit: null,
    selectSort: {
        col: 'name',
        reverse: false
    }
})

const getters = {
    getDownloadDirFreeSpace: state => state.downloadDirFreeSpace,
    getSelectSortReverse: state => state.selectSort.reverse,
    getSelectSortCol: state => state.selectSort.col,
    getDownloadLimit: state => state.downloadLimit,
    getTimeRefresh: state => state.timeRefresh,
    getDownloadDir: state => state.downloadDir,
    getUploadLimit: state => state.uploadLimit
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
    },
    SET_SORT(state, payload) {
        state.selectSort.col = payload[0];
        state.selectSort.reverse = payload[1];
    },
    SET_UPLOAD(state, payload) {
        state.uploadLimit = payload;
    },
    SET_DOWNLOAD(state, payload) {
        state.downloadLimit = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}