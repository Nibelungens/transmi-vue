import Status from '../../constantes/status.const'
import statusFilter from '../status.filter'

const filter = function (torrents, i18n) {
    if (torrents.length < 1) {
        return i18n.t('message.filter.none');
    } else {
        let isMixed = false;
        let allPaused = true;
        let allFinished = true;

        let baseline = torrents[0].status;
        for (const torrent of torrents) {
            if (torrent.status !== baseline) {
                isMixed = true;
            }
            if (torrent.status !== Status.STATUS_STOPPED) {
                allPaused = allFinished = false;
            }
            if (!torrent.isFinished) {
                allFinished = false;
            }
        }
        if (isMixed) {
            return i18n.t('message.details.info.mixed');
        } else if (allFinished) {
            return i18n.t('message.filter.state.finished');
        } else if (allPaused) {
            return i18n.t('message.filter.state.paused');
        } else {
            return statusFilter(torrents[0], i18n);
        }
    }
}

export default filter;