import timeInterval from '../timeInterval.filter.js'

const infos = function (torrents, i18n) {
    if (torrents.length < 1) {
        return i18n.t('message.filter.none');
    } else {
        let baseline = torrents[0].eta;
        for (const torrent of torrents) {
            if (baseline !== torrent.eta) {
                return i18n.t('message.details.info.mixed');
            }
        }
    }

    if (torrents[0].eta < 0) {
        return i18n.t('message.filter.remainingTime.unknown');
    } else {
        return timeInterval(torrents[0].eta);
    }
}

export default infos;