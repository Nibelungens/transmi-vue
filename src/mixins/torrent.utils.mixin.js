const STATUS_STATE = {
    PAUSE: {    order: 4,    code: 0,   lib: 'En Pause',    bar: 'secondary',   animated: false},
    COMPLETE: { order: 3,    code: 0,   lib: 'Terminé',     bar: 'secondary',   animated: false},
    SEED: {     order: 2,    code: 6,   lib: 'En Partage',  bar: 'success',     animated: true},
    DOWNLOAD: { order: 1,    code: 4,   lib: 'En Cours',    bar: 'primary',     animated: true},
    UNKNOW: {   order: 0,    code: 999, lib: '?',           bar: 'danger',      animated: true}
};

const TorrentUtilsMixin = {
    computed: {
        getStatusState: () => STATUS_STATE
    },
    methods: {
        meta(torrent) {
            switch (torrent.status) {
                case this.getStatusState.PAUSE.code:
                    return torrent.isFinished ? this.getStatusState.COMPLETE : this.getStatusState.PAUSE;
                case this.getStatusState.SEED.code:
                    return this.getStatusState.SEED;
                case this.getStatusState.DOWNLOAD.code:
                    return this.getStatusState.DOWNLOAD;
                default:
                    return this.getStatusState.UNKNOW;
            }
        }
    }
}

export default TorrentUtilsMixin;