import {localVue, store, mocks} from '@/../tests/tools/conponent.config'
import { shallowMount } from '@vue/test-utils'
import HeaderTransmission from "@/components/ui/HeaderTransmission";

describe("HeaderTransmission", () => {
    it("init", () => {
        const wrapper = shallowMount(HeaderTransmission, {store, localVue, mocks})
        expect(wrapper).not.toBeNull();
    });
});