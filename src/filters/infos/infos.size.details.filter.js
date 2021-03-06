import sizeFilter from '../size.filter.js'

/**
 * @typedef  {Object} Torrent
 * @property {number} pieceSize
 * @property {number} pieceCount
 * @property {number} totalSize
 *
 * @param {Torrent[]} torrents
 * @param {Object} i18n
 */
const infos = function (torrents, i18n) {
    if (torrents.length < 1) {
            return i18n.t('message.filter.none');
    } else {
        let pieces = 0;
        let size = 0;
        let pieceSize = torrents[0].pieceSize;
        for (const torrent of torrents) {
            pieces += torrent.pieceCount;
            size += torrent.totalSize;
            if (pieceSize !== torrent.pieceSize) {
                pieceSize = 0;
            }
        }
        if (!size) {
            return i18n.t('message.filter.none');
        } else if (pieceSize > 0) {
            return i18n.t('message.filter.sizeDetails.piecesMiss', [sizeFilter(size), pieces, sizeFilter(pieceSize, true)]);
        } else {
            return i18n.t('message.filter.sizeDetails.pieces', [sizeFilter(size), pieces]);
        }
    }
}

export default infos;