import api_parent from "@/services/api/api_parent.transmission.service";
import priority from "@/constantes/priority.const";
import ArgumentsSetLocation from "@/services/class/arguments.set.location.class"
import ArgumentsIds from "@/services/class/arguments.ids.class"
import ArgumentsRename from "@/services/class/arguments.rename.class"
import ArgumentsTorrentAdd from "@/services/class/arguments.torrent.add.class"
import ArgumentsTorrentDel from "@/services/class/arguments.torrent.del.class"
import ArgumentsTorrentGet from "@/services/class/arguments.torrent.get.class"
import ArgumentsTorrentWanted from "@/services/class/arguments.torrent.wanted.class"
import ArgumentsTorrentPriority from "@/services/class/arguments.torrent.priority.class"
import Methods from "@/services/const/methods.const";

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
   * @method setLocation
   * @param {string} location
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  setLocation(torrents, location) {
    const ids = torrents.map(torrent => torrent.id);
    return api_parent.request(Methods.TORRENT_SET_LOCATION,
        new ArgumentsSetLocation(location, ids));
  },

  /**
   * @method setRename
   * @param {string} newName
   * @param {Torrent} torrent
   * @return {AxiosPromise<Response>}
   */
  setRename(torrent, newName) {
    return api_parent.request(Methods.TORRENT_RENAME_PATH,
        new ArgumentsRename(torrent.name, newName, Array.of(torrent.id)));
  },

  /**
   * @method addTorrent
   * @param {string} downloadDir
   * @param {string} metaInfo
   * @param {boolean} start
   * @param {string} url
   * @return {AxiosPromise<Response>}
   */
  addTorrent(downloadDir, metaInfo, url, start) {
    const argumentsTorrentAdd = url
        ?ArgumentsTorrentAdd.url(downloadDir, !start, url)
        :ArgumentsTorrentAdd.metainfo(downloadDir, !start, metaInfo);

    return api_parent.request(Methods.TORRENT_ADD, argumentsTorrentAdd);
  },

  /**
   * @method verifyTorrent
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  verifyTorrent(torrents) {
    return api_parent.request(Methods.TORRENT_VERIFY,
        ArgumentsIds.many(torrents));
  },

  /**
   * @method removeTorrent
   * @param {array<Torrent>} torrents
   * @param {boolean} trash
   * @return {AxiosPromise<Response>}
   */
  removeTorrent(torrents, trash) {
    const ids = torrents.map(torrent => torrent.id);
    return api_parent.request(Methods.TORRENT_REMOVE,
        new ArgumentsTorrentDel(trash, ids));
  },

  /**
   * @method startTorrents
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  startTorrents(torrents) {
    return api_parent.request(Methods.TORRENT_START,
        ArgumentsIds.many(torrents));
  },

  /**
   * @method startTorrentsNow
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  startTorrentsNow(torrents) {
    return api_parent.request(Methods.TORRENT_START_NOW,
        ArgumentsIds.many(torrents));
  },

  /**
   * @method stopTorrents
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  stopTorrents(torrents) {
    return api_parent.request(Methods.TORRENT_STOP,
        ArgumentsIds.many(torrents));
  },

  /**
   * @method getTorrents
   * @return {AxiosPromise<Response>}
   */
  getTorrents() {
    return api_parent.request(Methods.TORRENT_GET,
        ArgumentsTorrentGet.all());
  },

  /**
   * @method getInfoTorrent
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  getInfoTorrent(torrents) {
    const ids = torrents.map(torrent => torrent.id);
    return api_parent.request(Methods.TORRENT_GET,
        ArgumentsTorrentGet.info(ids));
  },

  /**
   * @method getPeersTorrent
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  getPeersTorrent(torrents) {
    const ids = torrents.map(torrent => torrent.id);
    return api_parent.request(Methods.TORRENT_GET,
        ArgumentsTorrentGet.peers(ids));
  },

  /**
   * @method getTrackerTorrent
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  getTrackerTorrent(torrents) {
    const ids = torrents.map(torrent => torrent.id);
    return api_parent.request(Methods.TORRENT_GET,
        ArgumentsTorrentGet.trackers(ids));
  },

  /**
   * @method getFileTorrent
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  getFileTorrent(torrents) {
    const ids = torrents.map(torrent => torrent.id);
    return api_parent.request(Methods.TORRENT_GET,
        ArgumentsTorrentGet.file(ids));
  },

  /**
   * @method setUnwantedTorrent
   * @param {Number} torrent_id
   * @param {array<Number>} ids
   * @return {AxiosPromise<Response>}
   */
  setUnwantedTorrent(torrent_id, ids) {
    return api_parent.request(Methods.TORRENT_SET,
        ArgumentsTorrentWanted.unwanted(ids, torrent_id));
  },

  /**
   * @method setWantedTorrent
   * @param {Number} torrent_id
   * @param {array<Number>} ids
   * @return {AxiosPromise<Response>}
   */
  setWantedTorrent(torrent_id, ids) {
    return api_parent.request(Methods.TORRENT_SET,
        ArgumentsTorrentWanted.wanted(ids, torrent_id));
  },

  /**
   * @method setPriorityTorrent
   * @param {Number} torrent_id
   * @param {array<Number>} ids
   * @param {String} type_priority
   * @return {AxiosPromise<Response>}
   */
  setPriorityTorrent(torrent_id, ids, type_priority) {
    let argumentsTorrentPriority;

    switch (parseInt(type_priority)) {
      case priority.HIGH:
        argumentsTorrentPriority = ArgumentsTorrentPriority.high(ids, torrent_id);
        break;
      case priority.LOW:
        argumentsTorrentPriority = ArgumentsTorrentPriority.low(ids, torrent_id);
        break;
      case priority.NORM:
      default:
        argumentsTorrentPriority = ArgumentsTorrentPriority.normal(ids, torrent_id);
    }

    return api_parent.request(Methods.TORRENT_SET, argumentsTorrentPriority);
  }
}

export default api_torrent;