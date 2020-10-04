const NB_MILLISECONDS = 86400;
const NB_MINUTE_SECONDS = 60;
const NB_HOURS = 3600;

const timeInterval = function (value) {
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

export default timeInterval;