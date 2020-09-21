const filter = function (value) {
    const days = Math.floor(value / 86400);
    const hours = Math.floor((value % 86400) / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    value = Math.floor(value % 60);
    const d = days + ' ' + (days > 1 ? 'days' : 'day');
    const h = hours + ' ' + (hours > 1 ? 'hours' : 'hour');
    const m = minutes + ' ' + (minutes > 1 ? 'minutes' : 'minute');
    const s = value + ' ' + (value > 1 ? 'seconds' : 'second');

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
        if (minutes >= 4 || !value) {
            return m;
        }
        return m + ', ' + s;
    }
    return s;
}

export default filter;