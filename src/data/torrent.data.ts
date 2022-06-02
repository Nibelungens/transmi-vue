import ToTranslateBundle from "./to-translate-bundle.data";
import TorrentInt from "./torrent.int.data";
import {
    STATUS_CHECK,
    STATUS_CHECK_WAIT,
    STATUS_DOWNLOAD,
    STATUS_DOWNLOAD_WAIT,
    STATUS_SEED, STATUS_SEED_WAIT,
    STATUS_STOPPED
} from "../const/status.const";
import TorrentUtils from "../utils/torrent.utils";

export default class Torrent implements TorrentInt {
    private _activityDate: number;
    private _dateCreated: number;
    private _desiredAvailable: number;
    private _downloadDir: string;
    private _error: number;
    private _errorString: string;
    private _eta: number;
    private _haveUnchecked: number;
    private _haveValid: number;
    private _id: number;
    private _isFinished: boolean;
    private _leftUntilDone: number;
    private _metadataPercentComplete: number;
    private _name: string;
    private _peersConnected: number;
    private _peersSendingToUs: number;
    private _percentDone: number;
    private _queuePosition: number;
    private _rateDownload: number;
    private _rateUpload: number;
    private _recheckProgress: number;
    private _seedRatioLimit: number;
    private _sizeWhenDone: number;
    private _status: number;
    private _totalSize: number;
    private _uploadRatio: number;
    private _uploadedEver: number;

    constructor(activityDate: number, dateCreated: number, desiredAvailable: number, downloadDir: string, error: number, errorString: string, eta: number, haveUnchecked: number, haveValid: number, id: number, isFinished: boolean, leftUntilDone: number, metadataPercentComplete: number, name: string, peersConnected: number, peersSendingToUs: number, percentDone: number, queuePosition: number, rateDownload: number, rateUpload: number, recheckProgress: number, seedRatioLimit: number, sizeWhenDone: number, status: number, totalSize: number, uploadRatio: number, uploadedEver: number) {
        this._activityDate = activityDate;
        this._dateCreated = dateCreated;
        this._desiredAvailable = desiredAvailable;
        this._downloadDir = downloadDir;
        this._error = error;
        this._errorString = errorString;
        this._eta = eta;
        this._haveUnchecked = haveUnchecked;
        this._haveValid = haveValid;
        this._id = id;
        this._isFinished = isFinished;
        this._leftUntilDone = leftUntilDone;
        this._metadataPercentComplete = metadataPercentComplete;
        this._name = name;
        this._peersConnected = peersConnected;
        this._peersSendingToUs = peersSendingToUs;
        this._percentDone = percentDone;
        this._queuePosition = queuePosition;
        this._rateDownload = rateDownload;
        this._rateUpload = rateUpload;
        this._recheckProgress = recheckProgress;
        this._seedRatioLimit = seedRatioLimit;
        this._sizeWhenDone = sizeWhenDone;
        this._status = status;
        this._totalSize = totalSize;
        this._uploadRatio = uploadRatio;
        this._uploadedEver = uploadedEver;
    }

    public static createInstance<T extends TorrentInt>(torrent: T): Torrent {
        return new Torrent(torrent.activityDate,
            torrent.dateCreated,
            torrent.desiredAvailable,
            torrent.downloadDir,
            torrent.error,
            torrent.errorString,
            torrent.eta,
            torrent.haveUnchecked,
            torrent.haveValid,
            torrent.id,
            torrent.isFinished,
            torrent.leftUntilDone,
            torrent.metadataPercentComplete,
            torrent.name,
            torrent.peersConnected,
            torrent.peersSendingToUs,
            torrent.percentDone,
            torrent.queuePosition,
            torrent.rateDownload,
            torrent.rateUpload,
            torrent.recheckProgress,
            torrent.seedRatioLimit,
            torrent.sizeWhenDone,
            torrent.status,
            torrent.totalSize,
            torrent.uploadRatio,
            torrent.uploadedEver);
    }

    asError(): boolean {
        return this.error ? this.error > 0 : false;
    }

    showDownloadRate(): boolean {
        return (this.status === STATUS_SEED || this.status === STATUS_DOWNLOAD) && !this.asError();
    }

    showUploadRate(): boolean {
        return this.status === STATUS_DOWNLOAD && !this.asError();
    }

    isPlay(): boolean {
        return this.status === STATUS_DOWNLOAD || this.status === STATUS_CHECK_WAIT || this.status === STATUS_SEED || this.status === STATUS_CHECK
    }

    isPause(): boolean {
        return this.status === STATUS_STOPPED
    }

    formatStatus(): ToTranslateBundle {
        switch (this.status) {
            case STATUS_STOPPED:
                return new ToTranslateBundle(this.isFinished ? 'status.complete' : 'status.paused');
            case STATUS_CHECK_WAIT:
                return new ToTranslateBundle('status.queuedVerification');
            case STATUS_CHECK:
                return new ToTranslateBundle('status.verifying', [TorrentUtils.percentFilter(this.recheckProgress * 100)]);
            case STATUS_DOWNLOAD_WAIT:
                return new ToTranslateBundle('status.queuedDownload');
            case STATUS_DOWNLOAD:
                return new ToTranslateBundle('status.downloading');
            case STATUS_SEED_WAIT:
                return new ToTranslateBundle('status.queuedSeeding');
            case STATUS_SEED:
                return new ToTranslateBundle('status.seeding');
            case null:
            case undefined:
            default:
                return new ToTranslateBundle('status.unknown');
        }
    }

    postStatus(): ToTranslateBundle {
        switch (this.status) {
            case STATUS_SEED:
                return new ToTranslateBundle('torrent.to', [this.peersSendingToUs, this.peersConnected]);
            case STATUS_DOWNLOAD:
                return new ToTranslateBundle('torrent.from', [this.peersSendingToUs, this.peersConnected]);
            default:
                return new ToTranslateBundle('torrent.error');
        }
    }

    remainingFilter(): ToTranslateBundle {
        let translated: ToTranslateBundle = new ToTranslateBundle();

        if (this.metadataPercentComplete < 1) {
            const percent = 100 * this.metadataPercentComplete;
            translated.add(this.status === STATUS_STOPPED ? 'remaining.magnetized.needs' : 'remaining.magnetized.retrieving', [TorrentUtils.percentFilter(percent)]);
        } else {
            const is_done = this.leftUntilDone < 1 || this.status === STATUS_SEED;

            if (is_done) {
                if (this.totalSize === this.sizeWhenDone) {
                    translated.add(TorrentUtils.formatSize(this.totalSize), undefined, true);
                } else {
                    translated.add('remaining.of', [TorrentUtils.formatSize(this.sizeWhenDone), TorrentUtils.formatSize(this.totalSize), TorrentUtils.percentFilter(100 * this.percentDone)]);
                }
                translated.add('remaining.upload', [TorrentUtils.formatSize(this.uploadedEver), TorrentUtils.ratioFilter(this.uploadRatio)]);
            } else {
                translated.add('remaining.of', [TorrentUtils.formatSize(this.sizeWhenDone - this.leftUntilDone), TorrentUtils.formatSize(this.sizeWhenDone), TorrentUtils.percentFilter(100 * this.percentDone)]);
            }

            if (this.status !== 0 && (!is_done || this.seedRatioLimit > 0)) {
                const eta = this.eta;
                if (eta < 0 || eta >= 999 * 60 * 60 /* arbitrary */) {
                    translated.add('remaining.timeUnknown');
                } else {
                    translated.add(TorrentUtils.timeInterval(this.eta));
                    translated.add('remaining.remaining');
                }
            }
        }

        return translated;
    }

    formattedDownloadRate(): ToTranslateBundle {
        return new ToTranslateBundle(TorrentUtils.formatSize(this.rateDownload), undefined, true);
    }

    formattedUploadRate(): ToTranslateBundle {
        return new ToTranslateBundle(TorrentUtils.formatSize(this.rateUpload), undefined, true);
    }

    percentComplete(): number {
        return this._metadataPercentComplete*100;
    }

    //#################################
    //####### GETTERS & SETTERS #######
    //#################################

    get activityDate(): number {
        return this._activityDate;
    }

    set activityDate(value: number) {
        this._activityDate = value;
    }

    get dateCreated(): number {
        return this._dateCreated;
    }

    set dateCreated(value: number) {
        this._dateCreated = value;
    }

    get desiredAvailable(): number {
        return this._desiredAvailable;
    }

    set desiredAvailable(value: number) {
        this._desiredAvailable = value;
    }

    get downloadDir(): string {
        return this._downloadDir;
    }

    set downloadDir(value: string) {
        this._downloadDir = value;
    }

    get error(): number {
        return this._error;
    }

    set error(value: number) {
        this._error = value;
    }

    get errorString(): string {
        return this._errorString;
    }

    set errorString(value: string) {
        this._errorString = value;
    }

    get eta(): number {
        return this._eta;
    }

    set eta(value: number) {
        this._eta = value;
    }

    get haveUnchecked(): number {
        return this._haveUnchecked;
    }

    set haveUnchecked(value: number) {
        this._haveUnchecked = value;
    }

    get haveValid(): number {
        return this._haveValid;
    }

    set haveValid(value: number) {
        this._haveValid = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get isFinished(): boolean {
        return this._isFinished;
    }

    set isFinished(value: boolean) {
        this._isFinished = value;
    }

    get leftUntilDone(): number {
        return this._leftUntilDone;
    }

    set leftUntilDone(value: number) {
        this._leftUntilDone = value;
    }

    get metadataPercentComplete(): number {
        return this._metadataPercentComplete;
    }

    set metadataPercentComplete(value: number) {
        this._metadataPercentComplete = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get peersConnected(): number {
        return this._peersConnected;
    }

    set peersConnected(value: number) {
        this._peersConnected = value;
    }

    get peersSendingToUs(): number {
        return this._peersSendingToUs;
    }

    set peersSendingToUs(value: number) {
        this._peersSendingToUs = value;
    }

    get percentDone(): number {
        return this._percentDone;
    }

    set percentDone(value: number) {
        this._percentDone = value;
    }

    get queuePosition(): number {
        return this._queuePosition;
    }

    set queuePosition(value: number) {
        this._queuePosition = value;
    }

    get rateDownload(): number {
        return this._rateDownload;
    }

    set rateDownload(value: number) {
        this._rateDownload = value;
    }

    get rateUpload(): number {
        return this._rateUpload;
    }

    set rateUpload(value: number) {
        this._rateUpload = value;
    }

    get recheckProgress(): number {
        return this._recheckProgress;
    }

    set recheckProgress(value: number) {
        this._recheckProgress = value;
    }

    get seedRatioLimit(): number {
        return this._seedRatioLimit;
    }

    set seedRatioLimit(value: number) {
        this._seedRatioLimit = value;
    }

    get sizeWhenDone(): number {
        return this._sizeWhenDone;
    }

    set sizeWhenDone(value: number) {
        this._sizeWhenDone = value;
    }

    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }

    get totalSize(): number {
        return this._totalSize;
    }

    set totalSize(value: number) {
        this._totalSize = value;
    }

    get uploadRatio(): number {
        return this._uploadRatio;
    }

    set uploadRatio(value: number) {
        this._uploadRatio = value;
    }

    get uploadedEver(): number {
        return this._uploadedEver;
    }

    set uploadedEver(value: number) {
        this._uploadedEver = value;
    }
}