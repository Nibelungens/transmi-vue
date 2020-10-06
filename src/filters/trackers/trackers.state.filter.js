import trackerState from "@/constantes/trackerState.const";
import timeInterval from "@/filters/timeInterval.filter";

const trackers = function (tracker, i18n) {
    let timeUntilAnnounce;

    switch (tracker.announceState) {
        case trackerState.TRACKER_ACTIVE:
            return i18n.t('message.filter.trackerState.progress');
        case trackerState.TRACKER_WAITING:
            timeUntilAnnounce = tracker.nextAnnounceTime - new Date().getTime() / 1000;
            if (timeUntilAnnounce < 0) {
                timeUntilAnnounce = 0;
            }
            return i18n.t('message.filter.trackerState.next', [timeInterval(timeUntilAnnounce)]);
        case trackerState.TRACKER_QUEUED:
            return i18n.t('message.filter.trackerState.queued');
        case trackerState.TRACKER_INACTIVE:
            return tracker.isBackup
                ? i18n.t('message.filter.trackerState.backup')
                : i18n.t('message.filter.trackerState.scheduled');
        default:
            return i18n.t('message.filter.trackerState.unknown', [tracker.announceState]);
    }
}

export default trackers;