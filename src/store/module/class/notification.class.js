export default
/**
 * Notification Class
 */
class Notification {
    static get LVL_ERROR() { return "error" }
    static get LVL_WARNING() { return "warning" }
    static get LVL_SUCCESS() { return "success" }
    static get LVL_INFO() { return "info" }

    /**
     * Create Notification
     * @param {Date} timestamp
     * @param {string} level
     * @param {string} message
     */
    constructor(timestamp, level, message) {
        this.timestamp = timestamp;
        this.message = message;
        this.level = level;
    }

    static success(message) {
        return new Notification(new Date(), this.LVL_SUCCESS, message);
    }

    static error(message) {
        return new Notification(new Date(), this.LVL_ERROR, message);
    }

    static warning(message) {
        return new Notification(new Date(), this.LVL_WARNING, message);
    }

    static start() {
        return new Notification(new Date(), this.LVL_INFO, 'Transmi(vue) Started');
    }
}