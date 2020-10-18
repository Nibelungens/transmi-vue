import api_parent from "@/services/api_parent.transmission.service";

const QUEUE_MOVE_BOTTOM = "queue-move-bottom";
const QUEUE_MOVE_DOWN = "queue-move-down";
const QUEUE_MOVE_UP = "queue-move-up";
const QUEUE_MOVE_TOP = "queue-move-top";

const ARGUMENT_IDS = {
  "ids":[]
}

/**
 * @typedef  {Object} Response
 * @property {string} result
 */
const api_queue = {
  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  moveToTop(torrents) {
    const args = ARGUMENT_IDS;
    args.ids = torrents.map(t => t.id)

    return api_parent.request(QUEUE_MOVE_TOP, args);
  },

  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  moveToBottom(torrents) {
    const args = ARGUMENT_IDS;
    args.ids = torrents.map(t => t.id)

    return api_parent.request(QUEUE_MOVE_BOTTOM, args);
  },

  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  moveUp(torrents) {
    const args = ARGUMENT_IDS;
    args.ids = torrents.map(t => t.id)

    return api_parent.request(QUEUE_MOVE_UP, args);
  },

  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  moveDown(torrents) {
    const args = ARGUMENT_IDS;
    args.ids = torrents.map(t => t.id)

    return api_parent.request(QUEUE_MOVE_DOWN, args);
  }
}

export default api_queue;