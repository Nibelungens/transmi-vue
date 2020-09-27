import {localVue, store, mocks} from '@/../tests/tools/conponent.config'
import { shallowMount } from '@vue/test-utils'
import InfoDetailsTorrentView from "@/components/details/InfoDetailsTorrentView";

describe("InfoDetailsTorrentView", () => {
    it("init", () => {
        const wrapper = shallowMount(InfoDetailsTorrentView, {store, localVue, mocks})
        expect(wrapper).not.toBeNull();
    });
});