import * as axios from "axios";

const TORRENT_START_NOW = "torrent-start-now";
const QUEUE_MOVE_BOTTOM = "queue-move-bottom";
const QUEUE_MOVE_DOWN = "queue-move-down";
const TORRENT_REMOVE = "torrent-remove";
const QUEUE_MOVE_TOP = "queue-move-top";
const TORRENT_VERIFY = "torrent-verify";
const TORRENT_START = "torrent-start";
const SESSION_STATS = "session-stats";
const QUEUE_MOVE_UP = "queue-move-up";
const TORRENT_STOP = "torrent-stop";
const TORRENT_GET = "torrent-get";
const SESSION_GET = "session-get";
const SESSION_SET = "session-set";
const TORRENT_ADD = "torrent-add";
const FREE_SPACE = "free-space";

const ARGUMENTS_TORRENT_ADD = {
  "download-dir": null,
  "paused": null
}

const ARGUMENTS_TORRENT_ALL = {
  "fields": [
    "metadataPercentComplete",
    "peersSendingToUs",
    "recheckProgress",
    "peersConnected",
    "seedRatioLimit",
    "leftUntilDone",
    "queuePosition",
    "sizeWhenDone",
    "rateDownload",
    "uploadedEver",
    "activityDate",
    "dateCreated",
    "percentDone",
    "errorString",
    "uploadRatio",
    "rateUpload",
    "isFinished",
    "totalSize",
    "status",
    "name",
    "eta" ,
    "error",
    "id"]
};
const ARGUMENTS_TORRENT_INFO = {
  "fields":[
    "metadataPercentComplete",
    "desiredAvailable",
    "recheckProgress",
    "downloadedEver",
    "haveUnchecked",
    "leftUntilDone",
    "activityDate",
    "uploadedEver",
    "sizeWhenDone",
    "downloadDir",
    "errorString",
    "corruptEver",
    "dateCreated",
    "failedEver",
    "isFinished",
    "hashString",
    "pieceCount",
    "haveValid",
    "startDate",
    "pieceSize",
    "totalSize",
    "isPrivate",
    "comment",
    "creator",
    "status",
    "name",
    "eta",
    "id"
  ],
  "ids":[]};

const ARGUMENTS_TORRENT_PEERS = {
  "fields":["peers", "name"],
  "ids":[]};

const ARGUMENTS_TORRENT_REMOVE = {
  "delete-local-data":false,
  "ids":[]
}

const ARGUMENT_IDS = {
  "ids":[]
}

const ARGUMENT_FREE_SPACE = {
  "path":null
}

const Transmission = {
  methods: {
    /**
     * @param {number} limit
     *
     * @typedef  {Object} Results
     * @property {Arguments} arguments
     * @property {string} result
     *
     * @typedef  {Object} Arguments
     *
     * @return {Promise<Results>}
     */
    setDownloadLimit(limit) {
      let args = {};

      if (limit != null) {
        args["speed-limit-down"] = limit;
        args["speed-limit-down-enabled"] = true;
      } else {
        args["speed-limit-down-enabled"] = false;
      }

      return this.request(SESSION_SET, args);
    },
    /**
     * @param {number} limit
     *
     * @typedef  {Object} Results
     * @property {Arguments} arguments
     * @property {string} result
     *
     * @typedef  {Object} Arguments
     *
     * @return {Promise<Results>}
     */
    setUploadLimit(limit) {
      let args = {};

      if (limit != null) {
        args["speed-limit-up"] = limit;
        args["speed-limit-up-enabled"] = true;
      } else {
        args["speed-limit-up-enabled"] = false;
      }

      return this.request(SESSION_SET, args);
    },
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
    /**
     * @typedef  {Object} Units
     * @property {number} memory-bytes
     * @property {array<string>} memory-units
     * @property {number} size-bytes
     * @property {array<string>} size-units
     * @property {number} speed-bytes
     * @property {array<string>} speed-units
     *
     * @typedef  {Object} Arguments
     * @property {number} alt-speed-down
     * @property {boolean} alt-speed-enabled
     * @property {number} alt-speed-time-begin
     * @property {number} alt-speed-time-day
     * @property {boolean} alt-speed-time-enabled
     * @property {number} alt-speed-time-end
     * @property {number} alt-speed-up
     * @property {boolean} blocklist-enabled
     * @property {number} blocklist-size
     * @property {string} blocklist-url
     * @property {number} cache-size-mb
     * @property {string} config-dir
     * @property {number} dht-enabled
     * @property {string} download-dir
     * @property {number} download-dir-free-space
     * @property {boolean} download-queue-enabled
     * @property {number} download-queue-size
     * @property {string} encryption
     * @property {number} idle-seeding-limit
     * @property {boolean} idle-seeding-limit-enabled
     * @property {string} incomplete-dir
     * @property {boolean} incomplete-dir-enabled
     * @property {boolean} lpd-enabled
     * @property {number} peer-limit-global
     * @property {number} peer-limit-per-torrent
     * @property {number} peer-port
     * @property {boolean} peer-port-random-on-start
     * @property {number} pex-enabled
     * @property {boolean} port-forwarding-enabled
     * @property {boolean} queue-stalled-enabled
     * @property {number} queue-stalled-minutes
     * @property {boolean} rename-partial-files
     * @property {number} rpc-version
     * @property {number} rpc-version-minimum
     * @property {boolean} script-torrent-done-enabled
     * @property {string} script-torrent-done-filename
     * @property {boolean} seed-queue-enabled
     * @property {number} seed-queue-size
     * @property {number} seedRatioLimit
     * @property {boolean} seedRatioLimited
     * @property {number} speed-limit-down
     * @property {boolean} speed-limit-down-enabled
     * @property {number} speed-limit-up
     * @property {boolean} speed-limit-up-enabled
     * @property {boolean} start-added-torrents
     * @property {boolean} trash-original-torrent-files
     * @property {boolean} utp-enabled
     * @property {string} version
     * @property {Units} units
     *
     * @return {Promise<Arguments>}
     */
    getSession() {
      return axios.post('/api',
          {
            "method": SESSION_GET
          });
    },
    /**
     * @typedef  {Object} Torrent
     * @property {number} id
     *
     * @typedef  {Object} Response
     * @property {string} result
     *
     * @param {Torrent} torrent
     *
     * @return {Promise<Response>}
     */
    verifyTorrent(torrent) {
      const args = ARGUMENT_IDS;

      if (Array.isArray(torrent)) {
        args.ids = torrent.map(t => t.id)
      } else if (torrent !== null && torrent.id !== null) {
        args.ids = [torrent.id]
      }

      return this.request(TORRENT_VERIFY, args);
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
      const args = ARGUMENT_IDS;

      if (Array.isArray(torrent)) {
        args.ids = torrent.map(t => t.id)
      } else if (torrent !== null && torrent.id !== null) {
        args.ids = [torrent.id]
      }

      return this.request(TORRENT_START, args);
    },
    startTorrentsNow(torrent) {
      const args = ARGUMENT_IDS;

      if (Array.isArray(torrent)) {
        args.ids = torrent.map(t => t.id)
      } else if (torrent !== null && torrent.id !== null) {
        args.ids = [torrent.id]
      }

      return this.request(TORRENT_START_NOW, args);
    },
    stopTorrents(torrent) {
      const args = ARGUMENT_IDS;

      if (Array.isArray(torrent)) {
        args.ids = torrent.map(t => t.id)
      } else if (torrent !== null && torrent.id !== null) {
        args.ids = [torrent.id]
      }

      return this.requestSimple(TORRENT_STOP, torrent);
    },
    /**
     *
     * @typedef  {Object} Torrents
     * @property {number} id
     * @property {string} name
     * @property {number} totalSize
     * @property {number} dateCreated
     * @property {number} peersSendingToUs
     * @property {boolean} isFinished
     * @property {number} peersConnected
     * @property {number} percentDone
     * @property {number} sizeWhenDone
     * @property {number} rateDownload
     * @property {number} rateUpload
     * @property {number} status
     * @property {number} metadataPercentComplete
     * @property {number} leftUntilDone
     * @property {number} uploadedEver
     * @property {number} uploadRatio
     * @property {number} seedRatioLimit
     * @property {number} eta
     * @property {string} errorString
     * @property {number} queuePosition
     * @property {number} activityDate
     * @property {number} uploadRatio
     * @property {number} error
     *
     * @typedef  {Object} Arguments
     * @property {array<Torrents>} torrents
     *
     * @return {Promise<Arguments>}
     */
    getTorrents() {
      return this.request(TORRENT_GET, ARGUMENTS_TORRENT_ALL);
    },
    /**
     *
     * @typedef  {Object} Torrent
     * @property {number} metadataPercentComplete
     * @property {number} desiredAvailable
     * @property {number} downloadedEver
     * @property {boolean} haveUnchecked
     * @property {number} leftUntilDone
     * @property {number} activityDate
     * @property {number} uploadedEver
     * @property {number} sizeWhenDone
     * @property {string} downloadDir
     * @property {string} errorString
     * @property {number} corruptEver
     * @property {number} dateCreated
     * @property {number} failedEver
     * @property {boolean} isFinished
     * @property {number} hashString
     * @property {number} pieceCount
     * @property {boolean} haveValid
     * @property {number} startDate
     * @property {number} pieceSize
     * @property {number} totalSize
     * @property {boolean} isPrivate
     * @property {string} comment
     * @property {string} creator
     * @property {number} status
     * @property {string} name
     * @property {number} eta
     * @property {number} id
     *
     * @typedef  {Object} Arguments
     * @property {array<Torrent>} torrents
     *
     * @param {array<Torrent>} torrents
     *
     * @return {Promise<Arguments>}
     */
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
    /**
     * @typedef  {Object} Torrent
     * @property {number} id
     *
     * @typedef  {Object} Response
     * @property {string} result
     *
     * @param {Torrent} torrent
     *
     * @return {Promise<Response>}
     */
    moveToTop(torrent) {
      const args = ARGUMENT_IDS;

      if (Array.isArray(torrent)) {
        args.ids = torrent.map(t => t.id)
      } else if (torrent !== null && torrent.id !== null) {
        args.ids = [torrent.id]
      }

      return this.request(QUEUE_MOVE_TOP, args);
    },
    /**
     * @typedef  {Object} Torrent
     * @property {number} id
     *
     * @typedef  {Object} Response
     * @property {string} result
     *
     * @param {Torrent} torrent
     *
     * @return {Promise<Response>}
     */
    moveToBottom(torrent) {
      const args = ARGUMENT_IDS;

      if (Array.isArray(torrent)) {
        args.ids = torrent.map(t => t.id)
      } else if (torrent !== null && torrent.id !== null) {
        args.ids = [torrent.id]
      }

      return this.request(QUEUE_MOVE_BOTTOM, args);
    },
    /**
     * @typedef  {Object} Torrent
     * @property {number} id
     *
     * @typedef  {Object} Response
     * @property {string} result
     *
     * @param {Torrent} torrent
     *
     * @return {Promise<Response>}
     */
    moveUp(torrent) {
      const args = ARGUMENT_IDS;

      if (Array.isArray(torrent)) {
        args.ids = torrent.map(t => t.id)
      } else if (torrent !== null && torrent.id !== null) {
        args.ids = [torrent.id]
      }

      return this.request(QUEUE_MOVE_UP, args);
    },
    /**
     * @typedef  {Object} Torrent
     * @property {number} id
     *
     * @typedef  {Object} Response
     * @property {string} result
     *
     * @param {Torrent} torrent
     *
     * @return {Promise<Response>}
     */
    moveDown(torrent) {
      const args = ARGUMENT_IDS;

      if (Array.isArray(torrent)) {
        args.ids = torrent.map(t => t.id)
      } else if (torrent !== null && torrent.id !== null) {
        args.ids = [torrent.id]
      }

      return this.request(QUEUE_MOVE_DOWN, args);
    },

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
    },
  }
}

export default Transmission;