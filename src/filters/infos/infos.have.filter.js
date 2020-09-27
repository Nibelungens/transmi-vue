import sizeFilter from '../size.filter.js'
import percentFilter from '../percent.filter'

const filter = function (torrents, i18n) {
    if (torrents.length < 1) {
        return i18n.t('message.filter.none');
    } else {
        let haveUnchecked = 0;
        let leftUntilDone = 0;
        let sizeWhenDone = 0;
        let haveValid = 0;

        for (const torrent of torrents) {
            if (torrent.metadataPercentComplete >= 1) {
                haveUnchecked += torrent.haveUnchecked;
                leftUntilDone += torrent.leftUntilDone;
                sizeWhenDone += torrent.sizeWhenDone;
                haveValid += torrent.haveValid;
            }
        }

        let d = 100.0 * (sizeWhenDone ? (sizeWhenDone - leftUntilDone) / sizeWhenDone : 1);

        if (!haveUnchecked && !leftUntilDone) {
            return i18n.t('message.filter.have.one', [sizeFilter(haveValid)]);
        } else if (!haveUnchecked) {
            return i18n.t('message.filter.have.two', [sizeFilter(sizeWhenDone), sizeFilter(sizeWhenDone), percentFilter(d)]);
        } else {
            return i18n.t('message.filter.have.three', [sizeFilter(haveValid), sizeFilter(sizeWhenDone), percentFilter(d), sizeFilter(haveUnchecked)]);
        }
    }
}

export default filter;