const infos = function (torrents, i18n) {
    if (torrents.length < 1) {
        return i18n.t('message.filter.none');
    } else {
        let baseline = torrents[0].isPrivate;

        for (const torrent of torrents) {
            if (baseline !== torrent.isPrivate) {
                return i18n.t('message.details.info.mixed');
            }
        }
        return baseline ? i18n.t('message.details.info.privateTracker'): i18n.t('message.details.info.publicTracker');
    }
}

export default infos;