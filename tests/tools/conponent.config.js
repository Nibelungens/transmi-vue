import {createLocalVue} from "@vue/test-utils";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);
localVue.use(Vuex);

localVue.filter('formatTimeInterval', () => 'formatTimeInterval' );
localVue.filter('formatRemaining', () => 'formatRemaining' );
localVue.filter('formatPercent', () => 'formatPercent' );
localVue.filter('formatCreator', () => 'formatCreator' );
localVue.filter('formatStatus', () => 'formatStatus' );
localVue.filter('formatSize', () => 'formatSize' );
localVue.filter('formatMem', () => 'formatMem' );

localVue.filter('infosRemainingTime', () => 'infosRemainingTime');
localVue.filter('infosLastActivity', () => 'infosLastActivity');
localVue.filter('infosAvailability', () => 'infosAvailability');
localVue.filter('infosRunningTime', () => 'infosRunningTime');
localVue.filter('infosSizeDetails', () => 'infosSizeDetails');
localVue.filter('infosDownload', () => 'infosDownload');
localVue.filter('infosPrivacy', () => 'infosPrivacy');
localVue.filter('infosUpload', () => 'infosUpload');
localVue.filter('infosState', () => 'infosState');
localVue.filter('infosError', () => 'infosError');
localVue.filter('infosBasic', () => 'infosBasic');
localVue.filter('infosHave', () => 'infosHave');

const store = new Vuex.Store({
    getters: {
        'Torrents/getSelectedTorrents': () => [],
        'Torrents/getTorrents': () => [],
        'Config/getTimeRefresh': () => 1000,
    },
    mutations: {
        'Torrents/ADD_SELECTED': () => null,
        'Torrents/SELECTED': () => null,
        'Torrents/REMOVE_SELECTED': () => null,
        'Torrents/SET_LIST_TORRENT': () => null,
        'Config/SET_TIME_REFRESH': () => null
    }
});
const mocks = {
    $t: (msg) => msg
}

export { localVue, store, mocks };