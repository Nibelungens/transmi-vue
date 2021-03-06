import Status from '../constantes/status.const'
import percentFilter from '@/filters/percent.filter.js'

/**
 * @typedef  {Object} Torrent
 * @property {string} status
 * @property {number} recheckProgress
 *
 * @param {Torrent} torrent
 * @param {Object} i18n
 */
const status = function (torrent, i18n) {
    switch (torrent.status) {
        case Status.STATUS_STOPPED:
            return torrent.isFinished ? i18n.t('message.filter.status.complete') : i18n.t('message.filter.status.paused');
        case Status.STATUS_CHECK_WAIT:
            return i18n.t('message.filter.status.queuedVerification');
        case Status.STATUS_CHECK:
            return i18n.t('message.filter.status.verifying', [percentFilter(torrent.recheckProgress*100)]);
        case Status.STATUS_DOWNLOAD_WAIT:
            return i18n.t('message.filter.status.queuedDownload');
        case Status.STATUS_DOWNLOAD:
            return i18n.t('message.filter.status.downloading');
        case Status.STATUS_SEED_WAIT:
            return i18n.t('message.filter.status.queuedSeeding');
        case Status.STATUS_SEED:
            return i18n.t('message.filter.status.seeding');
        case null:
        case undefined:
            return i18n.t('message.filter.status.unknown');
        default:
            return i18n.t('message.filter.status.error');
    }
}

export default status;