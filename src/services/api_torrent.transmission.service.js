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
  "fields":[
    "metadataPercentComplete",
    "queuePosition",
    "activityDate",
    "dateCreated",
    "uploadRatio",
    "totalSize",
    "status",
    "peers",
    "name",
    "id"],
  "ids":[]};

const ARGUMENTS_TORRENT_TRACKERS = {
  "fields":[
    "metadataPercentComplete",
    "queuePosition",
    "trackerStats",
    "activityDate",
    "dateCreated",
    "uploadRatio",
    "totalSize",
    "status",
    "name",
    "id"],
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

/**
 * @typedef  {Object} Arguments
 * @property {array<Torrent>} torrents
 *
 * @typedef {Object} Response
 * @property {Arguments} arguments
 * @property {string} result
 */
const api_torrent = {
  /**
   * @param {number} location
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  setLocation(torrents, location) {
    let args = ARGUMENTS_SET_LOCATION;

    if (torrents != null) {
      args.ids = torrents.map(torrent => torrent.id);
      args.location = location;
      args.move = true;
    }

    return api_parent.request(TORRENT_SET_LOCATION, args);
  },
  /**
   * @param {string} newName
   * @param {Torrent} torrent
   * @return {AxiosPromise<Response>}
   */
  setRename(torrent, newName) {
    let args = ARGUMENTS_RENAME;
    args.ids.push(torrent.id);
    args.path = torrent.name;
    args.name = newName;

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
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  verifyTorrent(torrents) {
    const args = ARGUMENT_IDS;
    args.ids = torrents.map(torrent => torrent.id);

    return api_parent.request(TORRENT_VERIFY, args);
  },

  /**
   * @param {array<Torrent>} torrents
   * @param {boolean} trash
   * @return {AxiosPromise<Response>}
   */
  removeTorrent(torrents, trash) {
    const args = ARGUMENTS_TORRENT_REMOVE;
    args.ids = torrents.map(torrent => torrent.id);
    args['delete-local-data'] = trash;

    return api_parent.request(TORRENT_REMOVE, args);
  },

  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  startTorrents(torrents) {
    const args = ARGUMENT_IDS;
    args.ids = torrents.map(torrent => torrent.id);

    return api_parent.request(TORRENT_START, args);
  },

  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  startTorrentsNow(torrents) {
    const args = ARGUMENT_IDS;
    args.ids = torrents.map(torrent => torrent.id)

    return api_parent.request(TORRENT_START_NOW, args);
  },

  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  stopTorrents(torrents) {
    const args = ARGUMENT_IDS;
    args.ids = torrents.map(torrent => torrent.id)

    return api_parent.request(TORRENT_STOP, args);
  },

  /**
   * @return {AxiosPromise<Response>}
   */
  getTorrents() {
    return api_parent.request(TORRENT_GET, ARGUMENTS_TORRENT_ALL);
  },

  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  getInfoTorrent(torrents) {
    const args = ARGUMENTS_TORRENT_INFO;
    args.ids = torrents.map(torrent => torrent.id)

    return api_parent.request(TORRENT_GET, args);
  },

  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  getPeersTorrent(torrents) {
    const args = ARGUMENTS_TORRENT_PEERS;
    args.ids = torrents.map(torrent => torrent.id)

    return api_parent.request(TORRENT_GET, args);
  },

  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  getTrackerTorrent(torrents) {
    const args = ARGUMENTS_TORRENT_TRACKERS;
    args.ids = torrents.map(torrent => torrent.id)

    return api_parent.request(TORRENT_GET, args);
  }
}

export default api_torrent;