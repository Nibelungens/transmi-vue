import {store, mocks, shallowMount} from '@/../tests/tools/conponent.config'
import ListTorrentsView from "@/components/ListTorrentsView";

describe("ListTorrentsView", () => {
    it("init", () => {
        const wrapper = shallowMount(ListTorrentsView, {store, mocks})
        expect(wrapper).not.toBeNull();
    });
});