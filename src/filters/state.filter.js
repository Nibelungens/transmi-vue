import Status from '../constantes/status.const'
import statusFilter from './status.filter'

const filter = function (torrent, i18n) {
    if (torrent.isFinished) {
        return i18n.t('message.filter.state.finished');
    } else if (torrent.status === Status.STATUS_STOPPED) {
        return i18n.t('message.filter.state.paused');
    } else {
        return statusFilter(torrent, i18n);
    }
}

export default filter;