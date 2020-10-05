const QUEUE_MOVE_BOTTOM = "queue-move-bottom";
const QUEUE_MOVE_DOWN = "queue-move-down";
const QUEUE_MOVE_UP = "queue-move-up";
const QUEUE_MOVE_TOP = "queue-move-top";

const ARGUMENT_IDS = {
  "ids":[]
}

const api_queue = {
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

    return this.api_parent.request(QUEUE_MOVE_TOP, args);
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

    return this.api_parent.request(QUEUE_MOVE_BOTTOM, args);
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

    return this.api_parent.request(QUEUE_MOVE_UP, args);
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

    return this.api_parent.request(QUEUE_MOVE_DOWN, args);
  }
}

export default api_queue;