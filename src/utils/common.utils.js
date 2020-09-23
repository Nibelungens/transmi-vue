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

    static toTruncFixed(number, place) {
        const ret = Math.floor(number * Math.pow(10, place)) / Math.pow(10, place);
        return ret.toFixed(place);
    }
}

export default common;