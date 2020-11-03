import ArgumentsIds from "@/services/class/arguments.ids.class"

export default
/**
 * ArgumentsSetLocation Class
 * @extends ArgumentsIds
 */
class ArgumentsSetLocation extends ArgumentsIds {
    /**
     * Create ArgumentsSetLocation
     * @param {string} location
     * @param {Array<number>} ids
     * @param {boolean} move
     */
    constructor(location, ids, move = true) {
        super(ids);
        this.location = location;
        this.ids = ids;
        this.move = move;
    }
}