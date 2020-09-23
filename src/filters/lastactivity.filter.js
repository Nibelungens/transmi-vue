import timeInterval from './timeInterval.filter'

const filter = function (torrent, i18n) {
    let latest = -1;

    if (latest < torrent.activityDate) {
        latest = torrent.activityDate;
    }

    latest = Date.now() / 1000 - latest;

    if (latest < 0) {
        return i18n.t('message.filter.none');
    } else if (latest < 5) {
        return i18n.t('message.filter.lastactivity.active');
    } else {
        return i18n.t('message.filter.lastactivity.ago', [timeInterval(latest)]);
    }
}

export default filter;