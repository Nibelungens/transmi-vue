const state = () => ({
    downloadDirFreeSpace: null,
    downloadLimit: null,
    timeRefresh: 1000,
    downloadDir: null,
    uploadLimit: null,
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
    getDownloadLimit: s => s.downloadLimit,
    getTimeRefresh: s => s.timeRefresh,
    getDownloadDir: s => s.downloadDir,
    getUploadLimit: s => s.uploadLimit,
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
    SET_UPLOAD(s, payload) {
        s.uploadLimit = payload;
    },
    SET_DOWNLOAD(s, payload) {
        s.downloadLimit = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}