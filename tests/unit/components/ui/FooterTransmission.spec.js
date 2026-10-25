import {store, mocks, shallowMount} from '@/../tests/tools/conponent.config'
import FooterTransmission from "@/components/ui/FooterTransmission";

describe("FooterTransmission", () => {
    it("init", () => {
        const wrapper = shallowMount(FooterTransmission, {store, mocks})
        expect(wrapper).not.toBeNull();
    });
});