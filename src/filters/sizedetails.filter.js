import sizeFilter from './size.filter.js'
import memFilter from './mem.filter'

const filter = function (torrent, i18n) {
    if (!torrent.totalSize) {
        return i18n.t('message.filter.none');
    } else if (torrent.pieceSize > 0) {
        return i18n.t('message.filter.sizeDetails.piecesMiss', [sizeFilter(torrent.totalSize), torrent.pieceCount, memFilter(torrent.pieceSize)]);
    } else {
        return i18n.t('message.filter.sizeDetails.pieces', [sizeFilter(torrent.totalSize), torrent.pieceCount]);
    }
}

export default filter;