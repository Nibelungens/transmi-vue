import {store, mocks, shallowMount} from '@/../tests/tools/conponent.config'
import MenuContext from "@/components/MenuContext";

describe("MenuContext", () => {
    const torrent_init = {
        id: 0,
        status: 0,

    };

    it("init", () => {
        const wrapper = shallowMount(MenuContext, {props: {torrent: torrent_init}, store, mocks})
        expect(wrapper).not.toBeNull();
    });
});