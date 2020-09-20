const SECOND_IN_MINUTES = 60
const MINUTES_IN_HOUR = 60
const HOUR_IN_DAY = 24

const filter = function (value) {
    if (value < 0) return 'remaining time unknown';
    if (value === 0) return 'finish';

    const minutes = Math.floor(value / SECOND_IN_MINUTES);
    const hours   = Math.floor(value / (SECOND_IN_MINUTES*MINUTES_IN_HOUR));
    const days   = Math.floor(value / (SECOND_IN_MINUTES*MINUTES_IN_HOUR*HOUR_IN_DAY));

    if (days !== 0 && days !== -1) return days + ' days and ' + (hours - (HOUR_IN_DAY*days)) + ' hours remaining';
    if (hours !== 0 && hours !== -1) return hours + ' hours and ' + (minutes - (MINUTES_IN_HOUR*hours)) + ' minutes remaining';
    if (minutes !== 0 && minutes !== -1) return minutes + ' minutes and ' + (value - (SECOND_IN_MINUTES*minutes)) + ' seconds remaining';

    return value + ' seconds remaining';
}

export default filter;