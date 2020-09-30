import percentFilter from '../percent.filter.js'

/**
 * @typedef  {Object} Torrent
 * @property {number} metadataPercentComplete
 * @property {number} haveValid
 * @property {number} haveUnchecked
 * @property {number} desiredAvailable
 *
 * @param {Torrent[]} torrents
 * @param {Object} i18n
 */
const infos = function (torrents, i18n) {
    let sizeWhenDone = 0;
    let available = 0;

    for (const torrent of torrents) {
        if (torrent.metadataPercentComplete >= 1) {
            sizeWhenDone += torrent.sizeWhenDone;
            available += torrent.haveValid + torrent.haveUnchecked + torrent.desiredAvailable;
        }
    }

    if (torrents.length < 1) {
        return i18n.t('message.filter.none');
    } else if (sizeWhenDone === 0) {
        return i18n.t('message.filter.none');
    } else {
        return percentFilter((100.0 * available) / sizeWhenDone) + '%';
    }
}

export default infos;