const size_K = 1000;
const size_B_str = 'B';
const size_K_str = 'kB';
const size_M_str = 'MB';
const size_G_str = 'GB';
const size_T_str = 'TB';

const filter = function (bytes) {
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
        ? [convertedSize.toFixed(2), unit].join(' ')
        : [convertedSize.toFixed(1), unit].join(' ');
}

export default filter;