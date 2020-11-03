import ArgumentsIds from "@/services/class/arguments.ids.class"

const ALL = [
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
        "id"];

const INFO = [
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
    ];

const PEERS = [
        "metadataPercentComplete",
        "queuePosition",
        "activityDate",
        "dateCreated",
        "uploadRatio",
        "totalSize",
        "status",
        "peers",
        "name",
        "id"];

const TRACKERS = [
        "metadataPercentComplete",
        "queuePosition",
        "trackerStats",
        "activityDate",
        "dateCreated",
        "uploadRatio",
        "totalSize",
        "status",
        "name",
        "id"];

const FILE = [
        "metadataPercentComplete",
        "queuePosition",
        "activityDate",
        "dateCreated",
        "uploadRatio",
        "totalSize",
        "fileStats",
        "status",
        "files",
        "name",
        "id"];

export default
/**
 * ArgumentsTorrentGet Class
 */
class ArgumentsTorrentGet extends ArgumentsIds {
    /**
     * Create ArgumentsTorrentGet
     * @param {Array<string>} fields
     * @param {array<number>} ids
     */
    constructor(fields, ids = undefined) {
        super(ids);
        this.fields = fields;
    }

    /**
     * all
     * @return {ArgumentsTorrentGet}
     */
    static all() {
        return new ArgumentsTorrentGet(ALL);
    }

    /**
     * info
     * @param {Array<number>} ids
     * @return {ArgumentsTorrentGet}
     */
    static info(ids) {
        return new ArgumentsTorrentGet(INFO, ids);
    }

    /**
     * peers
     * @param {Array<number>} ids
     * @return {ArgumentsTorrentGet}
     */
    static peers(ids) {
        return new ArgumentsTorrentGet(PEERS, ids);
    }

    /**
     * trackers
     * @param {Array<number>} ids
     * @return {ArgumentsTorrentGet}
     */
    static trackers(ids) {
        return new ArgumentsTorrentGet(TRACKERS, ids);
    }

    /**
     * file
     * @param {Array<number>} ids
     * @return {ArgumentsTorrentGet}
     */
    static file(ids) {
        return new ArgumentsTorrentGet(FILE, ids);
    }
}