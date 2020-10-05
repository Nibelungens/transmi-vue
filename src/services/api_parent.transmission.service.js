import * as axios from "axios";

const api_parent = {
  request(method, args) {
    return axios.post('/api',
        {
          "method": method,
          "arguments": args
        });
  },
  requestSimple(method, torrent) {
    let ids = null;

    if (Array.isArray(torrent)) {
      ids = torrent.map(t => t.id)
    } else {
      ids = [torrent.id]
    }

    return this.request(method, {"ids": ids});
  }
}

export default api_parent;