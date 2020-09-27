import {localVue, store, mocks} from '@/../tests/tools/conponent.config'
import { shallowMount } from '@vue/test-utils'
import ListTorrentsView from "@/components/ListTorrentsView";

describe("ListTorrentsView", () => {
    it("init", () => {
        const wrapper = shallowMount(ListTorrentsView, {store, localVue, mocks})
        expect(wrapper).not.toBeNull();
    });
});