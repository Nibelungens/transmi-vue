const infos = function (torrents, i18n) {
    if (torrents.length < 1) {
        return i18n.t('message.filter.none');
    } else {
        let error = torrents[0].errorString;
        for (const torrent of torrents) {
            if (error !== torrent.errorString) {
                return i18n.t('message.details.info.mixed');
            }
        }
        return (error === '') ? i18n.t('message.filter.none'): error;
    }
}

export default infos;