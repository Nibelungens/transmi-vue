/**
 * @typedef  {Object} Torrent
 * @property {string} creator
 * @property {number} dateCreated
 *
 * @param {Torrent[]} torrents
 * @param {Object} i18n
 */
const infos = function (torrents, i18n) {
    if (torrents.length < 1) {
        return i18n.t('message.filter.none');
    } else {
        let mixed_creator = false;
        let mixed_date = false;
        let creator = torrents[0].creator;
        let date = torrents[0].dateCreated;

        for (const torrent of torrents) {
            if (creator !== torrent.creator) {
                mixed_creator = true;
            }
            if (date !== torrent.dateCreated) {
                mixed_date = true;
            }
        }

        const empty_creator = !creator || !creator.length;
        const empty_date = !date;

        if (mixed_creator || mixed_date) {
            return i18n.t('message.details.info.mixed');
        } else if (empty_creator && empty_date) {
            return i18n.t('message.filter.creator.unknown');
        } else if (empty_date && !empty_creator) {
            return i18n.t('message.filter.creator.createdBy', [creator]);
        } else if (empty_creator && !empty_date) {
            return i18n.t('message.filter.creator.createdOn', [new Date(date * 1000).toDateString()]);
        } else {
            return i18n.t('message.filter.creator.createdByOn', [creator, new Date(date * 1000).toDateString()]);
        }
    }
}

export default infos;