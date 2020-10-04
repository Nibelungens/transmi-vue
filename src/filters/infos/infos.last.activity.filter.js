import timeInterval from '@/filters/timeInterval.filter'

/**
 * @typedef  {Object} Torrent
 * @property {number} activityDate
 *
 * @param {Torrent[]} torrents
 * @param {Object} i18n
 */
const infos = function (torrents, i18n) {
    let latest = -1;

    if (torrents.length < 1) {
        return i18n.t('message.filter.none');
    } else {

        for (const torrent of torrents) {
            let activityDate = torrent.activityDate;

            if (latest < activityDate) {
                latest = activityDate;
            }
        }
        let lastActivity = Date.now() / 1000 - latest;

        if (lastActivity < 0) {
            return i18n.t('message.filter.none');
        } else if (lastActivity < 5) {
            return i18n.t('message.filter.lastactivity.active');
        } else {
            return i18n.t('message.filter.lastactivity.ago', [timeInterval(lastActivity)]);
        }
    }
}

export default infos;