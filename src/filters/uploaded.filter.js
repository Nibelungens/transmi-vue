import sizeFilter from './size.filter.js'
import ratioFilter from './ratio.filter.js'
import commonUtils from '../utils/common.utils'

const filter = function (torrent, i18n) {
    let downloaded = torrent.downloadedEver;

    if (downloaded === 0) {
        downloaded = torrent.haveValid;
    }

    return i18n.t('message.filter.upload.ratio', [sizeFilter(torrent.uploadedEver), ratioFilter(commonUtils.ratio(torrent.uploadedEver, downloaded))]);
}

export default filter;