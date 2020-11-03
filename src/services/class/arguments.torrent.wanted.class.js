import ArgumentsIds from "@/services/class/arguments.ids.class"
export default
/**
 * ArgumentsTorrentGet Class
 */
class ArgumentsTorrentWanted extends ArgumentsIds {
    /**
     * Create ArgumentsTorrentWanted
     * @param {Array<number>} filesUnwanted
     * @param {Array<number>} filesWanted
     * @param {Array<number>} ids
     */
    constructor(filesWanted, filesUnwanted, ids) {
        super(ids);
        this["files-unwanted"] = filesUnwanted;
        this["files-wanted"] = filesWanted;
    }

    /**
     * Get filesWanted
     * @param {Array<number>} filesWanted
     * @param {number} id
     * @return {ArgumentsTorrentWanted}
     */
    static wanted(filesWanted, id) {
        return new ArgumentsTorrentWanted(filesWanted, undefined, Array.of(id));
    }

    /**
     * Get filesUnwanted
     * @param {Array<number>} filesUnwanted
     * @param {number} id
     * @return {ArgumentsTorrentWanted}
     */
    static unwanted(filesUnwanted, id) {
        return new ArgumentsTorrentWanted(undefined, filesUnwanted, Array.of(id));
    }
}