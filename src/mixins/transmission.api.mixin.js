import * as axios from "axios";

const TORRENT_START = "torrent-start";
const TORRENT_STOP = "torrent-stop";
const TORRENT_GET = "torrent-get";
const TORRENT_REMOVE = "torrent-remove";
const FREE_SPACE = "free-space";
const SESSION_GET = "session-get";
const TORRENT_ADD = "torrent-add";
const SESSION_STATS = "session-stats";

const ARGUMENTS_TORRENT_ADD = {
  "download-dir": null,
  "paused": null
}

const ARGUMENTS_TORRENT_ALL = {
  "fields": [
    "id",
    "name",
    "totalSize",
    "peersSendingToUs",
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
    "eta" ,
    "errorString",
    "error"]
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
    "totalSize",
    "downloadDir",
    "isPrivate",
    "creator",
    "dateCreated",
    "comment",
    "metadataPercentComplete",
    "failedEver"],
  "ids":[]};

const ARGUMENTS_TORRENT_PEERS = {
  "fields":["peers", "name"],
  "ids":[]};

const ARGUMENTS_TORRENT_REMOVE = {
  "delete-local-data":false,
  "ids":[]
}

const ARGUMENT_FREE_SPACE = {
  "path":null
}

const Transmission = {
  methods: {
    addTorrent(downloadDir, metaInfo, url, start) {
      const args = ARGUMENTS_TORRENT_ADD;
      args['download-dir'] = downloadDir;

      if (url != null) {
        args['filename'] = url;
      } else {
        args['metainfo'] = metaInfo;
      }
      args['paused'] = !start;

      return this.request(TORRENT_ADD, args);
    },
    getSession() {
      return axios.post('/api',
          {
            "method": SESSION_GET
          });
    },
    /**
     * @typedef  {Object} Stats
     * @property {number} downloadedBytes
     * @property {number} filesAdded
     * @property {number} secondsActive
     * @property {number} sessionCount
     * @property {number} uploadedBytes
     *
     * @typedef  {Object} Arguments
     * @property {number} activeTorrentCount
     * @property {Stats} cumulative-stats
     * @property {Stats} current-stats
     * @property {number} downloadSpeed
     * @property {number} pausedTorrentCount
     * @property {number} torrentCount
     * @property {number} uploadSpeed
     *
     * @return {Promise<Arguments>}
     */
    getSessionStat() {
      return axios.post('/api',
          {
            "method": SESSION_STATS
          });
    },
    getFreeSpace(path) {
      const args = ARGUMENT_FREE_SPACE;
      args.path = path;

      return this.request(FREE_SPACE, args);
    },
    removeTorrent(torrent, trash) {
      const args = ARGUMENTS_TORRENT_REMOVE;
      args['delete-local-data'] = trash;

      if (Array.isArray(torrent)) {
        args.ids = torrent.map(t => t.id)
      } else if (torrent !== null && torrent.id !== null) {
        args.ids = [torrent.id]
      }

      return this.request(TORRENT_REMOVE, args);
    },
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
    getInfoTorrent(torrents) {
      const args = ARGUMENTS_TORRENT_INFO;
      args.ids = torrents.map(torrent =>torrent.id)

      return this.request(TORRENT_GET, args);
    },
    getPeersTorrent(torrents) {
      const args = ARGUMENTS_TORRENT_PEERS;
      args.ids = torrents.map(torrent =>torrent.id)

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

export default Transmission;