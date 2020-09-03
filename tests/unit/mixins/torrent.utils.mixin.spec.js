import { shallowMount } from '@vue/test-utils'
import TorrentUtilsMixin from "@/mixins/torrent.utils.mixin";

let wrapper;

beforeEach(() => {
    const Component = {
        render() {},
        mixins: [TorrentUtilsMixin]
    };

    wrapper = shallowMount(Component);
});

afterEach(() => {
    wrapper.destroy();
});

describe('torrent.utils.mixin.js', () => {
    it ('getStatusState', () => {
        const result = wrapper.vm.getStatusState;

        expect(result)
            .not.toBeNull()
        expect(result)
            .not.toBeNaN()
        expect(result)
            .not.toBeUndefined();

    });

    it('Test PAUSE', () => {
        const torrent = { status: 0, isFinished: false };

        const result = wrapper.vm.meta(torrent);

        expect(result).toEqual(wrapper.vm.getStatusState.PAUSE);
    });

    it('Test COMPLETE', () => {
        const torrent = { status: 0, isFinished: true };

        const result = wrapper.vm.meta(torrent);

        expect(result).toEqual(wrapper.vm.getStatusState.COMPLETE);
    });

    it('Test SEED (finished)', () => {
        const torrent = { status: 6, isFinished: true };

        const result = wrapper.vm.meta(torrent);

        expect(result).toEqual(wrapper.vm.getStatusState.SEED);
    });

    it('Test SEED (not finished)', () => {
        const torrent = { status: 6, isFinished: false };

        const result = wrapper.vm.meta(torrent);

        expect(result).toEqual(wrapper.vm.getStatusState.SEED);
    });

    it('Test DOWNLOAD (finished)', () => {
        const torrent = { status: 4, isFinished: true };

        const result = wrapper.vm.meta(torrent);

        expect(result).toEqual(wrapper.vm.getStatusState.DOWNLOAD);
    });

    it('Test DOWNLOAD (not finished)', () => {
        const torrent = { status: 4, isFinished: false };

        const result = wrapper.vm.meta(torrent);

        expect(result).toEqual(wrapper.vm.getStatusState.DOWNLOAD);
    });

    it('Test UNKNOW', () => {
        const torrent = { status: 42, isFinished: false };

        const result = wrapper.vm.meta(torrent);

        expect(result).toEqual(wrapper.vm.getStatusState.UNKNOW);
    });
})