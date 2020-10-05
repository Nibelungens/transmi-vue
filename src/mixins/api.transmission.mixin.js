import api_torrent from "@/services/api_torrent.transmission.service";
import api_config from "@/services/api_config.transmission.service";
import api_queue from "@/services/api_queue.transmission.service";

const api = {
  data: function() {
    return {
      api_torrent: api_torrent,
      api_config: api_config,
      api_queue: api_queue
    }
  }
}

export default api;