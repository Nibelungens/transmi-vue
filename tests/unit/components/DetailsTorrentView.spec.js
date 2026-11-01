import {store, mocks, shallowMount} from '@/../tests/tools/conponent.config'
import DetailsTorrentView from '@/components/DetailsTorrentView'

describe("DetailsTorrentView", () => {
    it("init", () => {
        const wrapper = shallowMount(DetailsTorrentView, {store, mocks})
        expect(wrapper).not.toBeNull();
    });
});