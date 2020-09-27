import {localVue, store, mocks} from '@/../tests/tools/conponent.config'
import { shallowMount } from '@vue/test-utils'
import SetInterval from "@/components/SetInterval";

describe("SetInterval", () => {
    it("init", () => {
        const wrapper = shallowMount(SetInterval, {store, localVue, mocks})
        expect(wrapper).not.toBeNull();
    });
});