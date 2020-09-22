import timeInterval from './timeInterval.filter.js'
import Status from '../constantes/status.const'
import percentFilter from './percent.filter.js'
import ratioFilter from './ratio.filter.js'
import sizeFilter from './size.filter.js'

const filter = function (torrent, i18n) {
    if (torrent.metadataPercentComplete < 1) {
        let MetaDataStatus = i18n.t('message.filter.remaining.retrieving');
        if (torrent.status === Status.STATUS_STOPPED) {
            MetaDataStatus = i18n.t('message.filter.remaining.needs');
        }
        const percent = 100 * torrent.metadataPercentComplete;
        return [i18n.t('message.filter.remaining.magnetized', [MetaDataStatus, percentFilter(percent)])].join('');
    }

    let c;
    const sizeWhenDone = torrent.sizeWhenDone;
    const totalSize = torrent.totalSize;
    const is_done = torrent.leftUntilDone < 1 || torrent.status === Status.STATUS_SEED;

    if (is_done) {
        if (totalSize === sizeWhenDone) {
            // seed: '698.05 MiB'
            c = [sizeFilter(totalSize)];
        } else {
            // partial seed: '127.21 MiB of 698.05 MiB (18.2%)'
            c = [i18n.t('message.filter.remaining.of', [sizeFilter(sizeWhenDone), sizeFilter(torrent.totalSize), percentFilter(100 * torrent.percentDone)])];
        }
        // append UL stats: ', uploaded 8.59 GiB (Ratio: 12.3)'
        c.push(i18n.t('message.filter.remaining.upload', [sizeFilter(torrent.uploadedEver), ratioFilter(torrent.uploadRatio)]));
    } else {
        // not done yet
        c = [i18n.t('message.filter.remaining.of', [sizeFilter(sizeWhenDone - torrent.leftUntilDone), sizeFilter(sizeWhenDone), percentFilter(100 * torrent.percentDone)])];
    }

    // maybe append eta
    if (torrent.status !== 0 && (!is_done || torrent.seedRatioLimit > 0)) {
        c.push(' - ');
        const eta = torrent.eta;
        if (eta < 0 || eta >= 999 * 60 * 60 /* arbitrary */) {
            // c.push('remaining time unknown');
            c.push(i18n.t('message.filter.remaining.timeUnknown'));
        } else {
            c.push(timeInterval(torrent.eta), i18n.t('message.filter.remaining.remaining'));
        }
    }

    return c.join('');
}

export default filter;