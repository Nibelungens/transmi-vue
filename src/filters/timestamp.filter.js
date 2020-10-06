const timestamp = function (seconds) {
    if (!seconds) {
        return 'N/A';
    }

    const myDate = new Date(seconds * 1000);
    const now = new Date();

    let date = '';
    let time = '';

    const sameYear = now.getFullYear() === myDate.getFullYear();
    const sameMonth = now.getMonth() === myDate.getMonth();

    const dateDiff = now.getDate() - myDate.getDate();
    if (sameYear && sameMonth && Math.abs(dateDiff) <= 1) {
        if (dateDiff === 0) {
            date = 'Today';
        } else if (dateDiff === 1) {
            date = 'Yesterday';
        } else {
            date = 'Tomorrow';
        }
    } else {
        date = myDate.toDateString();
    }

    let hours = myDate.getHours();
    let period = 'AM';
    if (hours > 12) {
        hours = hours - 12;
        period = 'PM';
    }
    if (hours === 0) {
        hours = 12;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    let minutes = myDate.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    seconds = myDate.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    time = [hours, minutes, seconds].join(':');

    return [date, time, period].join(' ');
}

export default timestamp;