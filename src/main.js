import Vue from 'vue'
import i18n from '@/i18n'
import App from '@/App.vue'
import store from '@/store/index.store'
import interceptor from "@/config/interceptor.http";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import sizeFilter from '@/filters/size.filter.js';
import statusFilter from '@/filters/status.filter';
import percentFilter from '@/filters/percent.filter';
import remainingFilter from '@/filters/remaining.filter';
import haveFilter from '@/filters/infos/infos.have.filter';
import stateFilter from '@/filters/infos/infos.state.filter';
import errorFilter from '@/filters/infos/infos.error.filter';
import basicFilter from '@/filters/infos/infos.basic.filter';
import timeIntervalFilter from '@/filters/timeInterval.filter';
import privacyFilter from '@/filters/infos/infos.privacy.filter';
import uploadFilter from '@/filters/infos/infos.uploaded.filter';
import creatorFilter from '@/filters/infos/infos.creator.filter';
import downloadFilter from '@/filters/infos/infos.downloaded.filter';
import sizeDetailsFilter from '@/filters/infos/infos.size.details.filter';
import runningTimeFilter from '@/filters/infos/infos.running.time.filter';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import availabilityFilter from '@/filters/infos/infos.availability.filter';
import trackersStateFilter from "@/filters/trackers/trackers.state.filter";
import lastActivityFilter from '@/filters/infos/infos.last.activity.filter';
import remainingTimeFilter from '@/filters/infos/infos.remaining.time.filter';
import lastAnnounceFilter from "@/filters/trackers/trackers.lastannounce.filter";
import trackersLastScrapsFilter from "@/filters/trackers/trackers.lastScraps.filter";

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueFilterDateFormat);

Vue.filter('formatTimeInterval', timeIntervalFilter);
Vue.filter('formatRemaining', remainingFilter);
Vue.filter('formatPercent', percentFilter);
Vue.filter('formatCreator', creatorFilter);
Vue.filter('formatStatus', statusFilter);
Vue.filter('formatSize', sizeFilter);

Vue.filter('infosRemainingTime', remainingTimeFilter);
Vue.filter('infosLastActivity', lastActivityFilter);
Vue.filter('infosAvailability', availabilityFilter);
Vue.filter('infosRunningTime', runningTimeFilter);
Vue.filter('infosSizeDetails', sizeDetailsFilter);
Vue.filter('infosDownload', downloadFilter);
Vue.filter('infosPrivacy', privacyFilter);
Vue.filter('infosUpload', uploadFilter);
Vue.filter('infosState', stateFilter);
Vue.filter('infosError', errorFilter);
Vue.filter('infosBasic', basicFilter);
Vue.filter('infosHave', haveFilter);

Vue.filter('trackersLastAnnounce', lastAnnounceFilter);
Vue.filter('trackersState', trackersStateFilter);
Vue.filter('trackersLastScraps', trackersLastScrapsFilter);

new Vue({
    store: store,
    render: h => h(App),
    i18n,
    beforeCreate() {
        interceptor.init(store);
    }
}).$mount('#app')
