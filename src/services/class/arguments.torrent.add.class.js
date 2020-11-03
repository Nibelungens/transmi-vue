export default
/**
 * ArgumentsTorrentAdd Class
 */
class ArgumentsTorrentAdd {
    /**
     * Create ArgumentsTorrentAdd
     * @param {string} downloadDir
     * @param {boolean} paused
     * @param {string} filename
     * @param {string} metainfo
     */
    constructor(downloadDir, paused, filename, metainfo) {
        this["download-dir"] = downloadDir;
        this.paused = paused;
        this.filename = filename;
        this.metainfo = metainfo;
    }

    /**
     * Get ArgumentsTorrentAdd with URL
     * @param {string} downloadDir
     * @param {boolean} paused
     * @param {string} filename
     * @return {ArgumentsTorrentAdd}
     */
    static url(downloadDir, paused, filename) {
        return new ArgumentsTorrentAdd(downloadDir, paused, filename, undefined);
    }

    /**
     * Get ArgumentsTorrentAdd with METAINFO
     * @param {string} downloadDir
     * @param {boolean} paused
     * @param {string} metainfo
     * @return {ArgumentsTorrentAdd}
     */
    static metainfo(downloadDir, paused, metainfo) {
        return new ArgumentsTorrentAdd(downloadDir, paused, undefined, metainfo);
    }
}