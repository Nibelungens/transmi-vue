export default class TorrentUtils {
    public static percentFilter(value: number | undefined): string {
        if (value && value < 10.0) return value.toFixed(2);
        else if (value && value < 100.0) return value.toFixed(1);
        else if (value) return value.toFixed(0);
        else return 'undefined'
    }

    public static formatSize(bytes: number) {
        let size_K = 1000;
        let size_B_str = 'B';
        let size_K_str = 'kB';
        let size_M_str = 'MB';
        let size_G_str = 'GB';
        let size_T_str = 'TB';

        if (bytes < size_K) {
            return [bytes, size_B_str].join(' ');
        }

        let convertedSize;
        let unit;

        if (bytes < Math.pow(size_K, 2)) {
            convertedSize = bytes / size_K;
            unit = size_K_str;
        } else if (bytes < Math.pow(size_K, 3)) {
            convertedSize = bytes / Math.pow(size_K, 2);
            unit = size_M_str;
        } else if (bytes < Math.pow(size_K, 4)) {
            convertedSize = bytes / Math.pow(size_K, 3);
            unit = size_G_str;
        } else {
            convertedSize = bytes / Math.pow(size_K, 4);
            unit = size_T_str;
        }

        return convertedSize <= 9.995
            ? [(Math.floor(convertedSize * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2), unit].join(' ')
            : [(Math.floor(convertedSize * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(1), unit].join(' ');
    }

    public static ratioFilter(value: number) {
        switch (value) {
            case -1:
                return 'None';
            case -2:
                return '&infin;';
            default:
                return TorrentUtils.percentFilter(value);
        }
    }

    public static timeInterval(value: number) {
        const NB_MILLISECONDS = 86400;
        const NB_MINUTE_SECONDS = 60;
        const NB_HOURS = 3600;

        const days = Math.floor(value / NB_MILLISECONDS);
        const hours = Math.floor((value % NB_MILLISECONDS) / NB_HOURS);
        const minutes = Math.floor((value % NB_MILLISECONDS) / NB_MINUTE_SECONDS);
        const seconds = Math.floor(value % NB_MINUTE_SECONDS);

        const d = days + ' ' + (days > 1 ? 'days' : 'day');
        const h = hours + ' ' + (hours > 1 ? 'hours' : 'hour');
        const m = minutes + ' ' + (minutes > 1 ? 'minutes' : 'minute');
        const s = seconds + ' ' + (seconds > 1 ? 'seconds' : 'second');

        if (days) {
            if (days >= 4 || !hours) {
                return d;
            }
            return d + ', ' + h;
        }
        if (hours) {
            if (hours >= 4 || !minutes) {
                return h;
            }
            return h + ', ' + m;
        }
        if (minutes) {
            if (minutes >= 4 || !seconds) {
                return m;
            }
            return m + ', ' + s;
        }
        return s;
    }
}