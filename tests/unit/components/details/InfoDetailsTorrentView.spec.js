import {store, mocks, shallowMount} from '@/../tests/tools/conponent.config'
import InfoDetailsTorrentView from "@/components/details/InfoDetailsTorrentView";

describe("InfoDetailsTorrentView", () => {
    it("init", () => {
        const wrapper = shallowMount(InfoDetailsTorrentView, {store, mocks})
        expect(wrapper).not.toBeNull();
    });
});