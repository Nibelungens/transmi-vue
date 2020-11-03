export default
/**
 * ArgumentsLimitDown Class
 */
class ArgumentsLimitDown {
    /**
     * Create ArgumentsLimitDown
     * @param {boolean} speedLimitDownEnabled
     * @param {number} speedLimitDown
     */
    constructor(speedLimitDownEnabled, speedLimitDown = undefined) {
        this["speed-limit-down"] = speedLimitDown;
        this["speed-limit-down-enabled"] = speedLimitDownEnabled;
    }
}