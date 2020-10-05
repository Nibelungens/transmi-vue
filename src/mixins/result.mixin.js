import events from "@/constantes/event.const";
import bus from "@/config/bus.event";

const result = {
    methods: {
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