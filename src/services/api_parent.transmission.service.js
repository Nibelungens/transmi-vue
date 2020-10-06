import * as axios from "axios";

/**
 * @typedef  {Object} Torrent
 * @property {number} metadataPercentComplete
 * @property {array<FileStats>} status
 * @property {TrackerStats} trackerStats
 * @property {number} desiredAvailable
 * @property {number} downloadedEver
 * @property {number} haveUnchecked
 * @property {number} queuePosition
 * @property {number} activityDate
 * @property {number} dateCreated
 * @property {number} corruptEver
 * @property {number} uploadRatio
 * @property {number} haveValid
 * @property {number} startDate
 * @property {number} totalSize
 * @property {number} fileStats
 * @property {Peers} peers
 * @property {string} name
 * @property {number} id
 *
 * @typedef  {Object} Peers
 * @property {boolean} clientIsInterested
 * @property {boolean} isDownloadingFrom
 * @property {boolean} peerIsInterested
 * @property {boolean} clientIsChoked
 * @property {boolean} isUploadingTo
 * @property {boolean} peerIsChoked
 * @property {boolean} isEncrypted
 * @property {number} rateToClient
 * @property {boolean} isIncoming
 * @property {number} rateToPeer
 * @property {string} clientName
 * @property {number} progress
 * @property {string} address
 * @property {string} flagStr
 * @property {boolean} isUTP
 * @property {number} port
 *
 * @typedef  {Object} FileStats
 * @property {number} bytesCompleted
 * @property {number} priority
 * @property {boolean} wanted
 *
 * @typedef  {Object} TrackerStats
 * @property {boolean} lastAnnounceSucceeded
 * @property {number} lastAnnouncePeerCount
 * @property {number} lastAnnounceStartTime
 * @property {boolean} lastAnnounceTimedOut
 * @property {boolean} lastScrapeSucceeded
 * @property {boolean} lastScrapeTimedOut
 * @property {number} lastScrapeStartTime
 * @property {string} lastAnnounceResult
 * @property {number} nextAnnounceTime
 * @property {string} lastScrapeResult
 * @property {number} lastAnnounceTime
 * @property {number} lastScrapeTime
 * @property {number} nextScrapeTime
 * @property {boolean} hasAnnounced
 * @property {number} downloadCount
 * @property {number} announceState
 * @property {number} leecherCount
 * @property {number} scrapeState
 * @property {number} seederCount
 * @property {boolean} hasScraped
 * @property {boolean} isBackup
 * @property {string} announce
 * @property {string} scrape
 * @property {string} host
 * @property {number} tier
 * @property {number} id
 *
 * @typedef  {Object} Units
 * @property {number} memory-bytes
 * @property {array<string>} memory-units
 * @property {number} size-bytes
 * @property {array<string>} size-units
 * @property {number} speed-bytes
 * @property {array<string>} speed-units
 *
 * @typedef  {Object} Units
 * @property {number} memory-bytes
 * @property {array<string>} memory-units
 * @property {number} size-bytes
 * @property {array<string>} size-units
 * @property {number} speed-bytes
 * @property {array<string>} speed-units
 *
 * @typedef  {Object} Stats
 * @property {number} downloadedBytes
 * @property {number} filesAdded
 * @property {number} secondsActive
 * @property {number} sessionCount
 * @property {number} uploadedBytes
 *
 * @typedef {Promise} AxiosPromise
 */
const api_parent = {
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
  }
}

export default api_parent;