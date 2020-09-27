import {localVue, store, mocks} from '@/../tests/tools/conponent.config'
import DetailsTorrentView from '@/components/DetailsTorrentView'
import { shallowMount } from '@vue/test-utils'

describe("DetailsTorrentView", () => {
    it("init", () => {
        const wrapper = shallowMount(DetailsTorrentView, {store, localVue, mocks})
        expect(wrapper).not.toBeNull();
    });
});