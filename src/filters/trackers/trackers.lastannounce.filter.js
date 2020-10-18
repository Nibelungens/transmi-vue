import timestamp from "@/filters/timestamp.filter";

const trackers = function (tracker, i18n) {
    if (tracker.hasAnnounced) {
        let lastAnnounceTime = timestamp(tracker.lastAnnounceTime);
        if (tracker.lastAnnounceSucceeded) {
            return i18n.t('message.filter.lastAnnounce.lastAnnounceGot', [lastAnnounceTime, tracker.lastAnnouncePeerCount]);
        } else {
            const separator = tracker.lastAnnounceResult
                ? tracker.lastAnnounceResult.concat(' - ')
                : '';
            return i18n.t('message.filter.lastAnnounce.lastAnnounceError', [separator, lastAnnounceTime]);
        }
    }
    return i18n.t('message.filter.lastAnnounce.lastAnnounceNA');
}

export default trackers;