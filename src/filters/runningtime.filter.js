import Status from "@/constantes/status.const";
import timeIntervalFilter from './timeInterval.filter'
import stateFilter from './state.filter'

const filter = function (torrent, i18n) {
    if (torrent.status === Status.STATUS_STOPPED) {
        return stateFilter(torrent, i18n);
    } else if (!torrent.startDate) {
        return i18n.t('message.filter.runningTime.mixed');
    } else {
        return timeIntervalFilter(Date.now() / 1000 - torrent.startDate);
    }
}

export default filter;