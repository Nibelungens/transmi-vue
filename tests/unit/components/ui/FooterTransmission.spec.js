import {localVue, store, mocks} from '@/../tests/tools/conponent.config'
import { shallowMount } from '@vue/test-utils'
import FooterTransmission from "@/components/ui/FooterTransmission";

describe("FooterTransmission", () => {
    it("init", () => {
        const wrapper = shallowMount(FooterTransmission, {store, localVue, mocks})
        expect(wrapper).not.toBeNull();
    });
});