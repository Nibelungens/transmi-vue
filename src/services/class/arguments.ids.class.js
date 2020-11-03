export default
/**
 * ArgumentsIds Class
 */
class ArgumentsIds {
    /**
     * Create ArgumentsIds
     * @param {Array<number>} ids
     */
    constructor(ids) {
        this.ids = ids;
    }

    /**
     * ArgumentsIds id
     * @param {Torrent} torrent
     * @return {ArgumentsIds}
     */
    static one(torrent) {
        return new ArgumentsIds(Array.of(torrent.id));
    }

    /**
     * ArgumentsIds ids
     * @param {Array<Torrent>} torrents
     * @return {ArgumentsIds}
     */
    static many(torrents) {
        const ids = torrents.map(torrent => torrent.id);
        return new ArgumentsIds(ids);
    }
}