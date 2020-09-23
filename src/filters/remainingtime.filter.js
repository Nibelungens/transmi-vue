import timeInterval from './timeInterval.filter.js'

const filter = function (torrent, i18n) {
    if (torrent.eta > 0) {
        return timeInterval(torrent.eta);
    } else {
        return i18n.t('message.filter.remainingTime.unknown');
    }
}

export default filter;