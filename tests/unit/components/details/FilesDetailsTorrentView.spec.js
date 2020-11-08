import {localVue, store, mocks} from '@/../tests/tools/conponent.config'
import { shallowMount } from '@vue/test-utils'
import FilesDetailsTorrentView from "@/components/details/FilesDetailsTorrentView";

describe("TrackersDetailsTorrentView", () => {
    it("init", () => {
        const wrapper = shallowMount(FilesDetailsTorrentView, {store, localVue, mocks})
        expect(wrapper).not.toBeNull();
    });

    it("getPath_basic", () => {
        const wrapper = shallowMount(FilesDetailsTorrentView, {store, localVue, mocks})

        const jT = {
            name: "test",
            id: 666,
            files: [
                {name: "files01.f" ,bytesCompleted: 101, length: 0},
                {name: "files02.f" ,bytesCompleted: 102, length: 0}
            ],
            fileStats: [
                {wanted: true ,bytesCompleted: 101, priority: 0},
                {wanted: true ,bytesCompleted: 102, priority: 0}
            ]
        };

        const result = wrapper.vm.getPath(jT);

        console.log(result);
        expect(result).toStrictEqual({
            bytesCompleted: NaN,
            length: NaN,
            name: "test",
            id: 666,
            folder: true,
            wanted: true,
            priority: 0,
            children: [
                {id: 0, name: "files01.f", bytesCompleted: 101, wanted: true, priority: 0, length: 0},
                {id: 1, name: "files02.f", bytesCompleted: 102, wanted: true, priority: 0, length: 0}]
        });
    });

    it("getPath_folder", () => {
        const wrapper = shallowMount(FilesDetailsTorrentView, {store, localVue, mocks})

        const jT = {
            name: "test",
            id: 666,
            files: [
                {name: "folder01/files01.f" ,bytesCompleted: 101, length: 0},
                {name: "folder01/files02.f" ,bytesCompleted: 102, length: 0},
                {name: "folder01/folder03/files02.f" ,bytesCompleted: 103, length: 0},
                {name: "folder02/folder01/files02.f" ,bytesCompleted: 104, length: 0}
            ],
            fileStats: [
                {wanted: true ,bytesCompleted: 101, priority: 0},
                {wanted: true ,bytesCompleted: 102, priority: 0},
                {wanted: true ,bytesCompleted: 103, priority: 0},
                {wanted: true ,bytesCompleted: 104, priority: 0}
            ]
        };

        const result = wrapper.vm.getPath(jT);

        expect(result).toStrictEqual({
            bytesCompleted: NaN,
            length: NaN,
            name: "test",
            id: 666,
            folder: true,
            wanted: true,
            priority: 0,
            children: [{
                    bytesCompleted: 306,
                    length: 0,
                    folder: true,
                    wanted: true,
                    priority: 0,
                    children: [
                        {id: 0, bytesCompleted: 101, name: "files01.f", priority: 0, wanted: true, length: 0},
                        {id: 1, bytesCompleted: 102, name: "files02.f", priority: 0, wanted: true, length: 0},
                        {folder: true, wanted: true, priority: 0, bytesCompleted: 103, length: 0,
                            children: [{id: 2, bytesCompleted: 103, name: "files02.f", priority: 0, wanted: true, length: 0}],
                            name: "folder03"}],
                    name: "folder01"},{
                    bytesCompleted: 104,
                    length: 0,
                    folder: true,
                    wanted: true,
                    priority: 0,
                    children: [
                        {folder: true, wanted: true, priority: 0, bytesCompleted: 104, length: 0,
                            children: [{id: 3, bytesCompleted: 104, name: "files02.f", priority: 0, wanted: true, length: 0}],
                            name: "folder01"}],
                    name: "folder02"}
            ]
        });
    });
    it("getPath_many_folder", () => {
        const wrapper = shallowMount(FilesDetailsTorrentView, {store, localVue, mocks})

        const jT = {
            name: "test",
            id: 666,
            files: [
                {   name: "folder01/folder01/folder01/folder01/folder01/folder01/folder01/folder01/folder01/folder01/folder01/files01.f",
                    bytesCompleted: 101, length: 1010}
            ],
            fileStats: [
                {wanted: true, bytesCompleted: 101, priority: 0}
            ]
        };

        const result = wrapper.vm.getPath(jT);

        console.log(result);
        expect(result).toStrictEqual({
            name: "test",
            id: 666,
            bytesCompleted: NaN,
            length: NaN,
            folder: true,
            wanted: true,
            priority: 0,
            children: [{folder: true, wanted: true, priority: 0, bytesCompleted: 101, length: 1010,
                children: [{folder: true, wanted: true, priority: 0, bytesCompleted: 101, length: 1010,
                    children: [{folder: true, wanted: true, priority: 0, bytesCompleted: 101, length: 1010,
                        children: [ {folder: true, wanted: true, priority: 0, bytesCompleted: 101, length: 1010,
                            children: [{folder: true, wanted: true, priority: 0, bytesCompleted: 101, length: 1010,
                                children: [ {folder: true, wanted: true, priority: 0, bytesCompleted: 101, length: 1010,
                                    children: [{folder: true, wanted: true, priority: 0, bytesCompleted: 101, length: 1010,
                                        children: [{folder: true, wanted: true, priority: 0, bytesCompleted: 101, length: 1010,
                                            children: [{folder: true, wanted: true, priority: 0, bytesCompleted: 101, length: 1010,
                                                children: [{folder: true, wanted: true, priority: 0, bytesCompleted: 101, length: 1010,
                                                    children: [{folder: true, wanted: true, priority: 0, bytesCompleted: 101, length: 1010,
                                                        children: [{id: 0, bytesCompleted: 101, name: "files01.f", priority: 0, wanted: true, length: 1010}],
                                                            name: "folder01"}],
                                                    name: "folder01"}],
                                                name: "folder01"}],
                                            name: "folder01"}],
                                        name: "folder01"}],
                                    name: "folder01"}],
                                name: "folder01"}],
                            name: "folder01"}],
                        name: "folder01"}],
                    name: "folder01"}],
                name: "folder01"}]});
    });
    it("getPath_wanted", () => {
        const wrapper = shallowMount(FilesDetailsTorrentView, {store, localVue, mocks})

        const jT = {
            name: "test",
            id: 666,
            files: [
                {name: "folder01/files01.f" ,bytesCompleted: 101, length: 1101},
                {name: "folder01/files02.f" ,bytesCompleted: 102, length: 1102},
                {name: "folder01/folder03/files02.f" ,bytesCompleted: 103, length: 1103},
                {name: "folder02/folder01/files02.f" ,bytesCompleted: 104, length: 1104}
            ],
            fileStats: [
                {wanted: true ,bytesCompleted: 101, priority: 0},
                {wanted: false ,bytesCompleted: 102, priority: 0},
                {wanted: true ,bytesCompleted: 103, priority: 0},
                {wanted: false ,bytesCompleted: 104, priority: 0}
            ]
        };

        const result = wrapper.vm.getPath(jT);

        console.log(result);
        expect(result).toStrictEqual({
            name: "test",
            id: 666,
            folder: true,
            wanted: true,
            priority: 0,
            bytesCompleted: NaN,
            length: NaN,
            children: [{
                folder: true, wanted: true, priority: 0, bytesCompleted: 306, length: 3306,
                children: [
                    {id: 0, bytesCompleted: 101, name: "files01.f", priority: 0, wanted: true, length: 1101},
                    {id: 1, bytesCompleted: 102, name: "files02.f", priority: 0, wanted: false, length: 1102},
                    {folder: true, wanted: true, priority: 0, bytesCompleted: 103, length: 1103,
                        children: [{id: 2, bytesCompleted: 103, name: "files02.f", priority: 0, wanted: true, length: 1103}],
                        name: "folder03"}],
                name: "folder01"},{
                folder: true, wanted: false, priority: 0, bytesCompleted: 104, length: 1104,
                children: [
                    {folder: true, wanted: false, priority: 0, bytesCompleted: 104, length: 1104,
                        children: [{id: 3, bytesCompleted: 104, name: "files02.f", priority: 0, wanted: false, length: 1104}],
                        name: "folder01"}],
                name: "folder02"}
            ]
        });
    });

    it("getPath_priority", () => {
        const wrapper = shallowMount(FilesDetailsTorrentView, {store, localVue, mocks})

        const jT = {
            name: "test",
            id: 666,
            files: [
                {name: "folder01/files01.f" ,bytesCompleted: 101, length: 0},
                {name: "folder01/files02.f" ,bytesCompleted: 102, length: 0},
                {name: "folder01/folder03/files02.f" ,bytesCompleted: 103, length: 0},
                {name: "folder02/files02.f" ,bytesCompleted: 104, length: 0},
                {name: "folder02/files03.f" ,bytesCompleted: 105, length: 0}
            ],
            fileStats: [
                {wanted: true ,bytesCompleted: 101, priority: 0},
                {wanted: true ,bytesCompleted: 102, priority: 0},
                {wanted: true ,bytesCompleted: 103, priority: 1},
                {wanted: true ,bytesCompleted: 104, priority: -1},
                {wanted: true ,bytesCompleted: 105, priority: -1}
            ]
        };

        const result = wrapper.vm.getPath(jT);

        console.log(result);
        expect(result).toStrictEqual({
            name: "test",
            id: 666,
            folder: true,
            wanted: true,
            priority: null,
            bytesCompleted: NaN,
            length: NaN,
            children: [{
                folder: true, wanted: true, priority: null, bytesCompleted: 306, length: 0,
                children: [
                    {id: 0, bytesCompleted: 101, name: "files01.f", priority: 0, wanted: true, length: 0},
                    {id: 1, bytesCompleted: 102, name: "files02.f", priority: 0, wanted: true, length: 0},
                    {folder: true, wanted: true, priority: 1, bytesCompleted: 103, length: 0,
                        children: [{id: 2, bytesCompleted: 103, name: "files02.f", priority: 1, wanted: true, length: 0}],
                        name: "folder03"}],
                name: "folder01"},{
                folder: true, wanted: true, priority: -1, bytesCompleted: 209, length: 0,
                children: [
                    {id: 3, bytesCompleted: 104, name: "files02.f", priority: -1, wanted: true, length: 0},
                    {id: 4, bytesCompleted: 105, name: "files03.f", priority: -1, wanted: true, length: 0}],
                name: "folder02"}
            ]
        });
    });
});