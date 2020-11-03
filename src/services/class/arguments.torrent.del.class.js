import ArgumentsIds from "@/services/class/arguments.ids.class"

export default
/**
 * ArgumentsTorrentDel Class
 * @extends ArgumentsIds
 */
class ArgumentsTorrentDel extends ArgumentsIds {
    /**
     * Create ArgumentsTorrentDel
     * @param {boolean} deleteLocalData
     * @param {array<number>} ids
     */
    constructor(deleteLocalData, ids) {
        super(ids);
        this["delete-local-data"] = deleteLocalData;
    }
}