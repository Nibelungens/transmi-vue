import sizeFilter from '../size.filter.js'

const filter = function (torrents, i18n) {
    if (torrents.length < 1) {
        return i18n.t('message.filter.none');
    } else {
        let downloaded = 0;
        let failed = 0;

        for (const torrent of torrents) {
            downloaded += torrent.downloadedEver;
            failed += torrent.failedEver;
        }
        if (failed) {
            return i18n.t('message.filter.download.corrupt', [sizeFilter(downloaded), sizeFilter(failed)]);
        } else {
            return sizeFilter(downloaded);
        }
    }
}

export default filter;