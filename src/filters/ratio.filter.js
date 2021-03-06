import percentFilter from './percent.filter'

const ratio = function (value) {
    if (value === -1) {
        return 'None';
    }
    if (value === -2) {
        return '&infin;';
    }
    return percentFilter(value);
}

export default ratio;