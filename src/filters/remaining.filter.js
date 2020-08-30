const filter = function (value) {
    if (value < 0) return 'remaining time unknown';
    if (value === 0) return 'finish';

    const minutes = Math.floor(value / 60);
    const hours   = Math.floor(value / (60*60));
    const days   = Math.floor(value / (60*60*24));

    if (days !== 0 && days !== -1) return days + ' days and ' + (hours - (24*days)) + ' hours remaining';
    if (hours !== 0 && hours !== -1) return hours + ' hours and ' + (minutes - (60*hours)) + ' minutes remaining';
    if (minutes !== 0 && minutes !== -1) return minutes + ' minutes and ' + (value - (60*minutes)) + ' seconds remaining';

    return value + ' seconds remaining';
}

export default filter;