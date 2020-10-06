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

    static sortTorrents(torrents, selectSortReverse, sortCol) {
        let torrentsClone = [...torrents];
        torrentsClone.sort((a, b) => this.compare(a, b, sortCol));

        if (selectSortReverse) torrentsClone.reverse();

        return torrentsClone;
    }

    static compare(a, b, col) {
        if (a[col] > b[col]) return 1;
        if (b[col] > a[col]) return -1;

        return 0;
    }
}

export default common;