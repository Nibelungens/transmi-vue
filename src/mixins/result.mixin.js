import events from "@/constantes/event.const";
import common from "@/utils/common.utils";
import bus from "@/config/bus.event";
import {mapGetters} from "vuex";
import keyStore from "@/constantes/key.store.const";

const result = {
    computed: {
        ...mapGetters({
            getSortCol: keyStore.GET_SELECT_SORT_COL,
            getSelectSortReverse: keyStore.GET_SELECT_SORT_REVERSE
        })
    },
    methods: {
        detailSuccessStore(response) {
            if (response != null && response.data !== null) {
                const torrents = common.sortTorrents(response.data.arguments.torrents, this.getSelectSortReverse, this.getSortCol);
                this.$store.commit(keyStore.SET_LIST_TORRENT, torrents);
            }
        },

        detailSuccess(response) {
            if (response != null && response.data !== null) {
                this.torrents = common.sortTorrents(response.data.arguments.torrents, this.getSelectSortReverse, this.getSortCol);
            }
        },

        success(response) {
            bus.$emit(events.NOTIFICATION_SUCCESS, response.data.result);
            bus.$emit(events.REFRESH_LIST_TORRENT);
        },

        fail(error) {
            bus.$emit(events.NOTIFICATION_FAIL, error);
        }
    }
}

export default result;