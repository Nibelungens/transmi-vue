import ArgumentsIds from "@/services/class/arguments.ids.class"
export default
/**
 * ArgumentsTorrentGet Class
 */
class ArgumentsTorrentPriority extends ArgumentsIds {
    /**
     * Create ArgumentsTorrentPriority
     * @param {Array<number>} low
     * @param {Array<number>} normal
     * @param {Array<number>} high
     * @param {Array<number>} ids
     */
    constructor(low, normal, high, ids) {
        super(ids);
        this["priority-low"] = low;
        this["priority-normal"] = normal;
        this["priority-high"] = high;
    }

    /**
     * low
     * @param {Array<number>} ids
     * @param {number} torrentId
     * @return {ArgumentsTorrentPriority}
     */
    static low(ids, torrentId) {
        return new ArgumentsTorrentPriority(ids, undefined, undefined, Array.of(torrentId));
    }

    /**
     * normal
     * @param {Array<number>} ids
     * @param {number}torrentId
     * @return {ArgumentsTorrentPriority}
     */
    static normal(ids, torrentId) {
        return new ArgumentsTorrentPriority(undefined, ids, undefined, Array.of(torrentId));
    }

    /**
     * high
     * @param {Array<number>} ids
     * @param {number} torrentId
     * @return {ArgumentsTorrentPriority}
     */
    static high(ids, torrentId) {
        return new ArgumentsTorrentPriority(undefined, undefined, ids, Array.of(torrentId));
    }
}