import sizeFilter from './size.filter.js'

const filter = function (torrent, i18n) {
    if (!torrent.haveUnchecked && !torrent.leftUntilDone) {
        return i18n.t('message.filter.have.one', [sizeFilter(torrent.haveValid)]);
    } else if (!torrent.haveUnchecked) {
        return i18n.t('message.filter.have.two', [sizeFilter(torrent.haveValid), sizeFilter(torrent.sizeWhenDone)]);
    } else {
        return i18n.t('message.filter.have.three', [sizeFilter(torrent.haveValid), sizeFilter(torrent.sizeWhenDone), sizeFilter(torrent.haveUnchecked)]);
    }
}

export default filter;