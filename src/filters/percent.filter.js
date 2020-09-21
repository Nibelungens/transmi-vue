const filter = function (value) {
    if (value < 10.0) {
        return value.toFixed(2);
    } else if (value < 100.0) {
        return value.toFixed(1);
    } else {
        return value.toFixed(0);
    }
}

export default filter;