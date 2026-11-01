import {store, mocks, shallowMount} from '@/../tests/tools/conponent.config'
import HeaderTransmission from "@/components/ui/HeaderTransmission";

describe("HeaderTransmission", () => {
    it("init", () => {
        const wrapper = shallowMount(HeaderTransmission, {store, mocks})
        expect(wrapper).not.toBeNull();
    });
});