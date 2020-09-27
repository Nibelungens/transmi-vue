import {localVue, store, mocks} from '@/../tests/tools/conponent.config'
import { shallowMount } from '@vue/test-utils'
import PeersDetailsTorrentView from "@/components/details/PeersDetailsTorrentView";

describe("PeersDetailsTorrentView", () => {
    it("init", () => {
        const wrapper = shallowMount(PeersDetailsTorrentView, {store, localVue, mocks})
        expect(wrapper).not.toBeNull();
    });
});