import {localVue, store, mocks} from '@/../tests/tools/conponent.config'
import { shallowMount } from '@vue/test-utils'
import TorrentView from "@/components/TorrentView";

describe("TorrentView", () => {
    const torrent_init = {
        id: 0,
        eta: 0,
        name: 'name',
        error: 'error',
        status: 0,
        totalSize: 0,
        rateUpload: 0,
        isFinished: true,
        percentDone: 'precent',
        errorString: 'error',
        uploadRatio: 0,
        sizeWhenDone: 'size',
        uploadedEver: 'up',
        rateDownload: 0,
        leftUntilDone: 0,
        peersConnected: 0,
        seedRatioLimit: 0,
        peersSendingToUs: 0,
        metadataPercentComplete: 0
    };

    it("init", () => {
        const wrapper = shallowMount(TorrentView, {
            propsData: {torrent: torrent_init},
            store, localVue, mocks})
        expect(wrapper).not.toBeNull();
    });
});