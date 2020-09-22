import percentFilter from './percent.filter.js'
import sizeFilter from './size.filter.js'

const filter = function (torrent, i18n) {
    const d = 100.0 * (torrent.sizeWhenDone ? (torrent.sizeWhenDone - torrent.leftUntilDone) / torrent.sizeWhenDone : 1);
    let str = percentFilter(d);

    if (!torrent.haveUnchecked && !torrent.leftUntilDone) {
        str = i18n.t('message.filter.have.one', [sizeFilter(torrent.haveValid)]);
    } else if (!torrent.haveUnchecked) {
        str = i18n.t('message.filter.have.two', [sizeFilter(torrent.haveValid), sizeFilter(torrent.sizeWhenDone)]);
    } else {
        str = i18n.t('message.filter.have.three', [sizeFilter(torrent.haveValid), sizeFilter(torrent.sizeWhenDone), sizeFilter(torrent.haveUnchecked)]);
    }

    return str;
}

export default filter;