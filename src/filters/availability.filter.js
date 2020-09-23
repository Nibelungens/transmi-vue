import percentFilter from './percent.filter.js'

const filter = function (torrent, i18n) {
    if (torrent.sizeWhenDone === 0) {
        return i18n.t('message.filter.none');
    } else {
        let avaibility = torrent.haveValid + torrent.haveUnchecked + torrent.desiredAvailable;
        return percentFilter((100.0 * avaibility) / torrent.sizeWhenDone) + '%';
    }
}

export default filter;