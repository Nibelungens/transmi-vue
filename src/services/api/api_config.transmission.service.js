import ArgumentsLimitDown from "@/services/class/arguments.limit.down.class";
import ArgumentsLimitUp from "@/services/class/arguments.limit.up.class";
import api_parent from "@/services/api/api_parent.transmission.service";
import ArgumentsSpace from "@/services/class/arguments.space.class";
import Methods from "@/services/const/methods.const";

/**
 * @typedef  {Object} Arguments
 * @property {array<Torrent>} torrents
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
 * @property {number} activeTorrentCount
 * @property {Stats} cumulative-stats
 * @property {Stats} current-stats
 * @property {number} downloadSpeed
 * @property {number} pausedTorrentCount
 * @property {number} torrentCount
 * @property {number} uploadSpeed
 *
 * @typedef {Object} Response
 * @property {Arguments} arguments
 * @property {string} result
 *
 */
const api_config = {
  /**
   * @method setDownloadLimit
   * @param {number} limit
   * @return {AxiosPromise<Response>}
   */
  setDownloadLimit(limit) {
    const argumentsLimitDown = limit
        ?new ArgumentsLimitDown(true, limit)
        :new ArgumentsLimitDown(false)

    return api_parent.request(Methods.SESSION_SET, argumentsLimitDown);
  },

  /**
   * @method setUploadLimit
   * @param {number} limit
   * @return {AxiosPromise<Response>}
   */
  setUploadLimit(limit) {
    const argumentsLimitUp = limit
        ?new ArgumentsLimitUp(true, limit)
        :new ArgumentsLimitUp(false)

    return api_parent.request(Methods.SESSION_SET, argumentsLimitUp);
  },

  /**
   * @method getSession
   * @return {AxiosPromise<Arguments>}
   */
  getSession() {
    return api_parent.request(Methods.SESSION_GET);
  },

  /**
   * @method getSessionStat
   * @return {AxiosPromise<Arguments>}
   */
  getSessionStat() {
    return api_parent.request(Methods.SESSION_STATS);
  },

  /**
   * @method getFreeSpace
   * @param {string} path
   * @return {AxiosPromise<Arguments>}
   */
  getFreeSpace(path) {
    return api_parent.request(Methods.FREE_SPACE, new ArgumentsSpace(path));
  }
};

export default api_config;