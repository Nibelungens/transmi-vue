import events from "@/constantes/key.event.const";
import bus from "@/config/bus.event";
import keyStore from "@/constantes/key.store.const";

const result = {
    methods: {
        success(response) {
            bus.$emit(events.NOTIFICATION_SUCCESS, response.data.result);
            bus.$emit(events.ACTION);
        },
        fail(error) {
            bus.$emit(events.NOTIFICATION_FAIL, error);
        },
        successTorrent(response) {
            this.$store.commit(keyStore.SET_LIST_TORRENT, response.data.arguments.torrents)
        }
    }
}

export default result;