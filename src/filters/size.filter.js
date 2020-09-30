import common from '../utils/common.utils'

const size = function (bytes, mem) {
    let size_K = 1000;
    let size_B_str = 'B';
    let size_K_str = 'kB';
    let size_M_str = 'MB';
    let size_G_str = 'GB';
    let size_T_str = 'TB';

    if (mem != null && mem === true) {
        size_K = 1024;
        size_B_str = 'B';
        size_K_str = 'kiB';
        size_M_str = 'MiB';
        size_G_str = 'GiB';
        size_T_str = 'TiB';
    }

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
        ? [common.toTruncFixed(convertedSize, 2), unit].join(' ')
        : [common.toTruncFixed(convertedSize, 1), unit].join(' ');
}

export default size;