const key = {
    // GETTERS STORE TORRENT
    GET_SELECTED_TORRENTS: 'Torrents/getSelectedTorrents',
    GET_TORRENT: 'Torrents/getTorrents',
    // GETTERS STORE CONFIG
    GET_DOWNLOAD_DIR_FREE_SPACE: 'Config/getDownloadDirFreeSpace',
    GET_SELECT_SORT_REVERSE: 'Config/getSelectSortReverse',
    GET_SELECT_SORT_COL: 'Config/getSelectSortCol',
    GET_DOWNLOAD_LIMIT: 'Config/getDownloadLimit',
    GET_DOWNLOAD_DIR: 'Config/getDownloadDir',
    GET_TIME_REFRESH: 'Config/getTimeRefresh',
    GET_UPLOAD_LIMIT: 'Config/getUploadLimit',
    // MUTATION STORE TORRENT
    SET_LIST_TORRENT: 'Torrents/SET_LIST_TORRENT',
    REMOVE_SELECTED: 'Torrents/REMOVE_SELECTED',
    SET_TIME_REFRESH: 'Config/SET_TIME_REFRESH',
    ADD_SELECTED: 'Torrents/ADD_SELECTED',
    UNSELECTED: 'Torrents/UNSELECTED',
    SELECTED: 'Torrents/SELECTED',
    // MUTATION STORE CONFIG
    SET_DOWNLOAD_DIR_FREE_SPACE: 'Config/SET_DOWNLOAD_DIR_FREE_SPACE',
    SET_DOWNLOAD: 'Config/SET_UPLOAD',
    SET_UPLOAD: 'Config/SET_UPLOAD',
    SET_CONFIG: 'Config/SET_CONFIG',
    SET_SORT: 'Config/SET_SORT'
}

export default key;