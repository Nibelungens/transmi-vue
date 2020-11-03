export default
/**
 * Notification Class
 */
class Notification {
    static LVL_ERROR = "error";
    static LVL_WARNING = "warning";
    static LVL_SUCCESS = "success";
    static LVL_INFO = "info";

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