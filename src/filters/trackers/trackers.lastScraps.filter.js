import timestamp from "@/filters/timestamp.filter";

const trackers = function (tracker, i18n) {
    if (tracker.hasScraped) {
        let lastScrapeTime = timestamp(tracker.lastScrapeTime);

        if (tracker.lastScrapeSucceeded) {
            return i18n.t('message.filter.lastScrape.succeeded', [lastScrapeTime]);
        } else {
            const separator = tracker.lastScrapeResult
                ? tracker.lastScrapeResult.concat(' - ')
                : '';

            return i18n.t('message.filter.lastScrape.error', [separator, lastScrapeTime]);
        }
    }
    return i18n.t('message.filter.lastScrape.na');
}

export default trackers;