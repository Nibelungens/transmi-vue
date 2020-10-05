import * as axios from "axios";

const SESSION_STATS = "session-stats";
const SESSION_GET = "session-get";
const SESSION_SET = "session-set";
const FREE_SPACE = "free-space";

const ARGUMENT_FREE_SPACE = {
  "path":null
}

const api_config = {
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

    return this.api_parent.request(SESSION_SET, args);
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

    return this.api_parent.request(SESSION_SET, args);
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

    return this.api_parent.request(FREE_SPACE, args);
  }
};

export default api_config;