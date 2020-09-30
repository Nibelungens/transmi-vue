import sizeFilter from '../size.filter.js'
import ratioFilter from '../ratio.filter.js'
import commonUtils from '../../utils/common.utils'

const infos = function (torrents, i18n) {
    if (torrents.length < 1) {
        return i18n.t('message.filter.none');
    } else {
        let downloaded = 0;
        let uploaded = 0;

        if (torrents.length === 1) {
            downloaded = torrents[0].downloadedEver;
            uploaded = torrents[0].uploadedEver;

            if (downloaded === 0) {
                downloaded = torrents[0].haveValid;
            }
        } else {
            for (const torrent of torrents) {
                downloaded += torrent.downloadedEver;
                uploaded += torrent.uploadedEver;
            }
        }

        return i18n.t('message.filter.upload.ratio', [sizeFilter(uploaded), ratioFilter(commonUtils.ratio(uploaded, downloaded))]);
    }
}

export default infos;