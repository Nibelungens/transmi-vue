import {localVue, store, mocks} from '@/../tests/tools/conponent.config'
import { shallowMount } from '@vue/test-utils'
import MenuContext from "@/components/MenuContext";

describe("MenuContext", () => {
    const torrent_init = {
        id: 0,
        status: 0,

    };

    it("init", () => {
        const wrapper = shallowMount(MenuContext, {propsData: {torrent: torrent_init}, store, localVue, mocks})
        expect(wrapper).not.toBeNull();
    });
});