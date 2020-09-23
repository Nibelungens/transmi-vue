import sizeFilter from './size.filter.js'

const filter = function (torrent, i18n) {
    let downloaded = torrent.downloadedEver;
    let corrupt = torrent.corruptEver;

    if (corrupt) {
        return i18n.t('message.filter.download.corrupt', [sizeFilter(downloaded), sizeFilter(corrupt)]);
    } else {
        return sizeFilter(downloaded);
    }
}

export default filter;