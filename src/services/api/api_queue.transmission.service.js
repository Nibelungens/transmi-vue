import api_parent from "@/services/api/api_parent.transmission.service";
import ArgumentsIds from "@/services/class/arguments.ids.class";
import Methods from "@/services/const/methods.const";

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
    return api_parent.request(Methods.QUEUE_MOVE_TOP, ArgumentsIds.many(torrents));
  },

  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  moveToBottom(torrents) {
    return api_parent.request(Methods.QUEUE_MOVE_BOTTOM, ArgumentsIds.many(torrents));
  },

  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  moveUp(torrents) {
    return api_parent.request(Methods.QUEUE_MOVE_UP, ArgumentsIds.many(torrents));
  },

  /**
   * @param {array<Torrent>} torrents
   * @return {AxiosPromise<Response>}
   */
  moveDown(torrents) {
    return api_parent.request(Methods.QUEUE_MOVE_DOWN, ArgumentsIds.many(torrents));
  }
}

export default api_queue;