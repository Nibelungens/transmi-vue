import {store, mocks, shallowMount} from '@/../tests/tools/conponent.config'
import SetInterval from "@/components/SetInterval";

describe("SetInterval", () => {
    it("init", () => {
        const wrapper = shallowMount(SetInterval, {store, mocks})
        expect(wrapper).not.toBeNull();
    });
});