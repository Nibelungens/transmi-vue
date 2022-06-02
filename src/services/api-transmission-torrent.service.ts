import axios, {AxiosResponse} from "axios";
import {InjectionKey} from "vue";
import {ArgumentsTorrentsResponse} from "../data/request/arguments-torrents-response.data";
import {TransmissionResponse} from "../data/request/transmission-response.data";

export const key: InjectionKey<ApiTransmissionTorrentService> = Symbol();

export class ApiTransmissionTorrentService {
    getAllTorrents(): Promise<AxiosResponse<TransmissionResponse<ArgumentsTorrentsResponse>>> {
        return axios.post('/api',
            {
                'method': 'torrent-get',
                'arguments': {
                    'fields': [
                        'metadataPercentComplete',
                        'peersSendingToUs',
                        'recheckProgress',
                        'peersConnected',
                        'seedRatioLimit',
                        'leftUntilDone',
                        'queuePosition',
                        'sizeWhenDone',
                        'rateDownload',
                        'uploadedEver',
                        'activityDate',
                        'dateCreated',
                        'percentDone',
                        'downloadDir',
                        'errorString',
                        'uploadRatio',
                        'rateUpload',
                        'isFinished',
                        'totalSize',
                        'status',
                        'name',
                        'eta',
                        'error',
                        'haveValid',
                        'haveUnchecked',
                        'desiredAvailable',
                        'id'
                    ]
                }
            });
    }
}