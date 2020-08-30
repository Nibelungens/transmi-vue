const filter = function (value, decimals = 2) {
    if (value === 0) {
        return '0%';
    } else {
        let satr = value * 100;
        return +parseFloat(satr.toString()).toFixed(decimals) + '%';
    }
}

export default filter;