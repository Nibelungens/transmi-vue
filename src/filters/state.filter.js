import Status from '../constantes/status.const'
import statusFilter from './status.filter'

const filter = function (torrent, i18n) {
    let allPaused = true;
    let allFinished = true;

    if (torrent.status !== Status.STATUS_STOPPED) {
        allPaused = allFinished = false;
    }
    if (!torrent.isFinished) {
        allFinished = false;
    }

    if (allFinished) {
        return i18n.t('message.filter.state.finished');
    } else if (allPaused) {
        return i18n.t('message.filter.state.paused');
    } else {
        return statusFilter(torrent, i18n);
    }
}

export default filter;