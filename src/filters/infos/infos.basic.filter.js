const infos = function (array, value, i18n) {
    let val = '';

    if (array.length === 0) {
        return i18n.t('message.filter.none');
    } else if (array.length === 1) {
        val = array[0][value];
    } else {
        val = array[0][value];

        for (const torrent of array) {
            if (torrent[value] !== val) {
                return i18n.t('message.details.info.mixed');
            }
        }
    }

    return (val !== '')
        ?val
        :i18n.t('message.filter.none');
}

export default infos;