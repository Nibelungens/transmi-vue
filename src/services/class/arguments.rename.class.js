import ArgumentsIds from "@/services/class/arguments.ids.class"

export default
/**
 * ArgumentsRename Class
 * @extends ArgumentsIds
 */
class ArgumentsRename extends ArgumentsIds {
    /**
     * Create ArgumentsRename
     * @param {string} path
     * @param {string} name
     * @param {Array<number>} ids
     */
    constructor(path, name, ids) {
        super(ids);
        this.path = path;
        this.name = name;
    }
}