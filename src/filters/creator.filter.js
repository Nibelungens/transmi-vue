const filter = function (torrent, i18n) {
    let creator = torrent.creator;
    let date = torrent.dateCreated;

    const empty_creator = !creator || !creator.length;
    const empty_date = !date;

    if (empty_creator && empty_date) {
        return i18n.t('message.filter.creator.unknown');
    } else if (empty_date && !empty_creator) {
        return i18n.t('message.filter.creator.createdBy', [creator]);
    } else if (empty_creator && !empty_date) {
        return i18n.t('message.filter.creator.createdOn', [new Date(date * 1000).toDateString()]);
    } else {
        return i18n.t('message.filter.creator.createdByOn', [creator, new Date(date * 1000).toDateString()]);
    }
}

export default filter;