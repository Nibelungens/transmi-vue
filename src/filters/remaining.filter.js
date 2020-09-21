import timeInterval from './timeInterval.filter.js'
import Status from '../constantes/status.const'
import percentFilter from './percent.filter.js'
import ratioFilter from './ratio.filter.js'
import sizeFilter from './size.filter.js'

const filter = function (torrent) {
    if (torrent.metadataPercentComplete < 1) {
        let MetaDataStatus = 'retrieving';
        if (torrent.status === Status.STATUS_STOPPED) {
            MetaDataStatus = 'needs';
        }
        const percent = 100 * torrent.metadataPercentComplete;
        return ['Magnetized transfer - ' + MetaDataStatus + ' metadata (', percentFilter(percent), '%)',].join('');
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
            c = [sizeFilter(sizeWhenDone), ' of ', sizeFilter(torrent.totalSize), ' (', percentFilter(100 * torrent.percentDone), '%)',];
        }
        // append UL stats: ', uploaded 8.59 GiB (Ratio: 12.3)'
        c.push(', uploaded ', sizeFilter(torrent.uploadedEver), ' (Ratio ', ratioFilter(torrent.uploadRatio), ')');
    } else {
        // not done yet
        c = [sizeFilter(sizeWhenDone - torrent.leftUntilDone), ' of ', sizeFilter(sizeWhenDone), ' (', percentFilter(100 * torrent.percentDone), '%)',];
    }

    // maybe append eta
    if (torrent.status !== 0 && (!is_done || torrent.seedRatioLimit > 0)) {
        c.push(' - ');
        const eta = torrent.eta;
        if (eta < 0 || eta >= 999 * 60 * 60 /* arbitrary */) {
            c.push('remaining time unknown');
        } else {
            c.push(timeInterval(torrent.eta), ' remaining');
        }
    }

    return c.join('');
}

export default filter;