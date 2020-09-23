const common = class CommonUtils {
    static ratio(numerator, denominator) {
        let result = Math.floor((100 * numerator) / denominator) / 100;

        // check for special cases
        if (result === Number.POSITIVE_INFINITY || result === Number.NEGATIVE_INFINITY) {
            result = -2;
        } else if (isNaN(result)) {
            result = -1;
        }

        return result;
    }
}

export default common;