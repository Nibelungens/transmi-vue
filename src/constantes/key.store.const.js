const key = {
    // GETTERS STORE NOTIFICATION
    GET_LAST: 'Notification/getLast',
    GET_HISTORY: 'Notification/getHistory',
    // GETTERS STORE TORRENT
    GET_SELECTED_TORRENTS: 'Torrents/getSelectedTorrents',
    GET_TORRENT: 'Torrents/getTorrents',
    // GETTERS STORE CONFIG
    GET_DOWNLOAD_DIR_FREE_SPACE: 'Config/getDownloadDirFreeSpace',
    GET_SELECT_SORT_REVERSE: 'Config/getSelectSortReverse',
    GET_SELECT_SORT_COL: 'Config/getSelectSortCol',
    GET_DETAILS_PANEL: 'Config/getDetailsPanel',
    GET_DOWNLOAD_DIR: 'Config/getDownloadDir',
    GET_TIME_REFRESH: 'Config/getTimeRefresh',
    GET_VERSION: 'Config/getVersion',
    // MUTATION STORE TORRENT
    SET_LIST_TORRENT: 'Torrents/SET_LIST_TORRENT',
    REMOVE_SELECTED: 'Torrents/REMOVE_SELECTED',
    SET_TIME_REFRESH: 'Config/SET_TIME_REFRESH',
    ADD_SELECTED: 'Torrents/ADD_SELECTED',
    UNSELECTED: 'Torrents/UNSELECTED',
    SELECTED: 'Torrents/SELECTED',
    // MUTATION STORE CONFIG
    SET_DOWNLOAD_DIR_FREE_SPACE: 'Config/SET_DOWNLOAD_DIR_FREE_SPACE',
    SET_DETAILS_PANEL: 'Config/SET_DETAILS_PANEL',
    SET_CONFIG: 'Config/SET_CONFIG',
    SET_SORT: 'Config/SET_SORT',
    // MUTATION STORE NOTIFICATION
    ADD_NOTIFICATION: 'Notification/ADD_NOTIFICATION'
}

export default key;