import common from '../utils/common.utils'

const mem_K = 1024;
const mem_B_str = 'B';
const mem_K_str = 'KiB';
const mem_M_str = 'MiB';
const mem_G_str = 'GiB';
const mem_T_str = 'TiB';

const filter = function (bytes) {
    if (bytes < mem_K) {
        return [bytes, mem_B_str].join(' ');
    }

    let convertedSize;
    let unit;

    if (bytes < Math.pow(mem_K, 2)) {
        convertedSize = bytes / mem_K;
        unit = mem_K_str;
    } else if (bytes < Math.pow(mem_K, 3)) {
        convertedSize = bytes / Math.pow(mem_K, 2);
        unit = mem_M_str;
    } else if (bytes < Math.pow(mem_K, 4)) {
        convertedSize = bytes / Math.pow(mem_K, 3);
        unit = mem_G_str;
    } else {
        convertedSize = bytes / Math.pow(mem_K, 4);
        unit = mem_T_str;
    }

    // try to have at least 3 digits and at least 1 decimal
    return convertedSize <= 9.995
        ? [common.toTruncFixed(convertedSize, 2), unit].join(' ')
        : [common.toTruncFixed(convertedSize, 1), unit].join(' ');
}

export default filter;