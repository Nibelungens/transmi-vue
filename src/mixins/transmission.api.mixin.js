import * as axios from "axios";

const TORRENT_START = "torrent-start";
const TORRENT_STOP = "torrent-stop";
const TORRENT_GET = "torrent-get";
const ARGUMENTS_TORRENT_ALL = {
  "fields": [
    "id",
    "name",
    "totalSize",
    "peersGettingFromUs",
    "isFinished",
    "peersConnected",
    "percentDone",
    "sizeWhenDone",
    "rateDownload",
    "rateUpload" ,
    "status",
    "metadataPercentComplete",
    "leftUntilDone",
    "uploadedEver",
    "uploadRatio",
    "seedRatioLimit",
    "eta" ]
};
const ARGUMENTS_TORRENT_INFO = {
  "fields":[
    "id",
    "name",
    "hashString",
    "sizeWhenDone",
    "leftUntilDone",
    "haveUnchecked",
    "haveValid",
    "desiredAvailable",
    "downloadedEver",
    "uploadedEver",
    "corruptEver",
    "isFinished",
    "status",
    "startDate",
    "eta",
    "activityDate",
    "errorString",
    "pieceSize",
    "pieceCount",
    "totalSize"],
  "ids":[0]};

const TransmissionApiMixin = {
  methods: {
    startTorrents(torrent) {
      return this.requestSimple(TORRENT_START, torrent);
    },
    stopTorrents(torrent) {
      return this.requestSimple(TORRENT_STOP, torrent);
    },
    getTorrents() {
      return this.request(TORRENT_GET, ARGUMENTS_TORRENT_ALL);
    },
    requestSimple(method, torrent) {
      let ids = null;

      if (Array.isArray(torrent)) {
        ids = torrent.map(t => t.id)
      } else {
        ids = [torrent.id]
      }

      return this.request(method, {"ids": ids});
    },
    getInfoTorrent(torrent) {
      const args = ARGUMENTS_TORRENT_INFO;
      args.ids = [torrent.id];
      return this.request(TORRENT_GET, args);
    },
    request(method, args) {
      return axios.post('/api',
          {
            "method": method,
            "arguments": args
          });
    }
  }
}

export default TransmissionApiMixin;