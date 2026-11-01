import {store, mocks, shallowMount} from '@/../tests/tools/conponent.config'
import PeersDetailsTorrentView from "@/components/details/PeersDetailsTorrentView";

describe("PeersDetailsTorrentView", () => {
    it("init", () => {
        const wrapper = shallowMount(PeersDetailsTorrentView, {store, mocks})
        expect(wrapper).not.toBeNull();
    });
});