import Status from "@/constantes/status.const";
import timeIntervalFilter from '../timeInterval.filter'
import stateFilter from './infos.state.filter'

/**
 * @typedef  {Object} Torrent
 * @property {string} status
 * @property {number} startDate
 *
 * @param {Torrent[]} torrents
 * @param {Object} i18n
 */
const infos = function (torrents, i18n) {
    if (torrents.length < 1) {
        return i18n.t('message.filter.none');
    } else {
        let allPaused = true;
        let baseline = torrents[0].startDate;
        for (const torrent of torrents) {
            if (baseline !== torrent.startDate) {
                baseline = 0;
            }
            if (torrent.status !== Status.STATUS_STOPPED) {
                allPaused = false;
            }
        }
        if (allPaused) {
            return stateFilter(torrents, i18n);
        } else if (!baseline) {
            return i18n.t('message.filter.runningTime.mixed');
        } else {
            return timeIntervalFilter(Date.now() / 1000 - baseline);
        }
    }
}

export default infos;