import api_parent from "@/services/api_parent.transmission.service";

const TORRENT_SET_LOCATION = "torrent-set-location";
const TORRENT_RENAME_PATH = "torrent-rename-path";
const TORRENT_START_NOW = "torrent-start-now";
const TORRENT_REMOVE = "torrent-remove";
const TORRENT_VERIFY = "torrent-verify";
const TORRENT_START = "torrent-start";
const TORRENT_STOP = "torrent-stop";
const TORRENT_GET = "torrent-get";
const TORRENT_ADD = "torrent-add";

const ARGUMENTS_TORRENT_ADD = {
  "download-dir": null,
  "paused": null
}

const ARGUMENTS_RENAME = {
  ids: [],
  name: null,
  path: null
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
    "downloadDir",
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

const ARGUMENTS_SET_LOCATION = {
  "location": null,
  "move": false,
  "ids":[]
}

const ARGUMENT_IDS = {
  "ids":[]
}

const api_torrent = {
  /**
   * @typedef  {Object} Torrent
   * @property {number} id
   *
   * @typedef  {Object} Results
   * @property {Arguments} arguments
   * @property {string} result
   *
   * @typedef  {Object} Arguments
   *
   * @param {number} location
   * @param {array<Torrent>} torrents
   *
   * @return {Promise<Results>}
   */
  setLocation(torrents, location) {
    let args = ARGUMENTS_SET_LOCATION;

    if (torrents != null) {
      args.move = true;
      args.location = location;
      args.ids = torrents.map(torrent => torrent.id);
    }

    return api_parent.request(TORRENT_SET_LOCATION, args);
  },
  /**
   * @typedef  {Object} Torrent
   * @property {number} id
   * @property {number} name
   *
   * @typedef  {Object} Results
   * @property {Arguments} arguments
   * @property {string} result
   *
   * @typedef  {Object} Arguments
   *
   * @param {string} newName
   * @param {Torrent} torrent
   *
   * @return {Promise<Results>}
   */
  setRename(torrent, newName) {
    let args = ARGUMENTS_RENAME;

    if (torrent != null) {
      args.name = newName;
      args.path = torrent.name;
      args.ids.push(torrent.id);
    }

    return api_parent.request(TORRENT_RENAME_PATH, args);
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

    return api_parent.request(TORRENT_ADD, args);
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

    return api_parent.request(TORRENT_VERIFY, args);
  },

  removeTorrent(torrent, trash) {
    const args = ARGUMENTS_TORRENT_REMOVE;
    args['delete-local-data'] = trash;

    if (Array.isArray(torrent)) {
      args.ids = torrent.map(t => t.id)
    } else if (torrent !== null && torrent.id !== null) {
      args.ids = [torrent.id]
    }

    return api_parent.request(TORRENT_REMOVE, args);
  },

  startTorrents(torrent) {
    const args = ARGUMENT_IDS;

    if (Array.isArray(torrent)) {
      args.ids = torrent.map(t => t.id)
    } else if (torrent !== null && torrent.id !== null) {
      args.ids = [torrent.id]
    }

    return api_parent.request(TORRENT_START, args);
  },

  startTorrentsNow(torrent) {
    const args = ARGUMENT_IDS;

    if (Array.isArray(torrent)) {
      args.ids = torrent.map(t => t.id)
    } else if (torrent !== null && torrent.id !== null) {
      args.ids = [torrent.id]
    }

    return api_parent.request(TORRENT_START_NOW, args);
  },

  stopTorrents(torrent) {
    const args = ARGUMENT_IDS;

    if (Array.isArray(torrent)) {
      args.ids = torrent.map(t => t.id)
    } else if (torrent !== null && torrent.id !== null) {
      args.ids = [torrent.id]
    }

    return api_parent.requestSimple(TORRENT_STOP, torrent);
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
    return api_parent.request(TORRENT_GET, ARGUMENTS_TORRENT_ALL);
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

    return api_parent.request(TORRENT_GET, args);
  },

  getPeersTorrent(torrents) {
    const args = ARGUMENTS_TORRENT_PEERS;
    args.ids = torrents.map(torrent =>torrent.id)

    return api_parent.request(TORRENT_GET, args);
  }
}

export default api_torrent;