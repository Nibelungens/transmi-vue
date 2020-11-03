export default
/**
 * ArgumentsLimitUp Class
 */
class ArgumentsLimitUp {
    /**
     * Create ArgumentsLimitUp
     * @param {boolean} speedLimitUpEnabled
     * @param {number} speedLimitUp
     */
    constructor(speedLimitUpEnabled, speedLimitUp = undefined) {
        this["speed-limit-up"] = speedLimitUp;
        this["speed-limit-up-enabled"] = speedLimitUpEnabled;
    }
}