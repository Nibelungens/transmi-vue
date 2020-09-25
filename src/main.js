import Vue from 'vue'
import i18n from '@/i18n'
import App from '@/App.vue'
import store from '@/store/index.store'
import interceptor from "@/config/http.interceptor";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import memFilter from '@/filters/mem.filter'
import haveFilter from '@/filters/have.filter'
import stateFilter from '@/filters/state.filter'
import sizeFilter from '@/filters/size.filter.js'
import statusFilter from '@/filters/status.filter'
import percentFilter from '@/filters/percent.filter'
import uploadFilter from '@/filters/uploaded.filter'
import creatorFilter from '@/filters/creator.filter'
import remainingFilter from '@/filters/remaining.filter'
import downloadFilter from '@/filters/downloaded.filter'
import sizeDetailsFilter from '@/filters/sizedetails.filter'
import runningTimeFilter from '@/filters/runningtime.filter'
import availabilityFilter from '@/filters/availability.filter'
import timeIntervalFilter from '@/filters/timeInterval.filter'
import lastActivityFilter from '@/filters/lastactivity.filter'
import remainingTimeFilter from '@/filters/remainingtime.filter'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.filter('formatRemainingTime', remainingTimeFilter);
Vue.filter('formatLastActivity', lastActivityFilter);
Vue.filter('formatAvailability', availabilityFilter);
Vue.filter('formatTimeInterval', timeIntervalFilter);
Vue.filter('formatRunningTime', runningTimeFilter);
Vue.filter('formatSizeDetails', sizeDetailsFilter);
Vue.filter('formatRemaining', remainingFilter);
Vue.filter('formatDownload', downloadFilter);
Vue.filter('formatPercent', percentFilter);
Vue.filter('formatCreator', creatorFilter);
Vue.filter('formatUpload', uploadFilter);
Vue.filter('formatStatus', statusFilter);
Vue.filter('formatState', stateFilter);
Vue.filter('formatSize', sizeFilter);
Vue.filter('formatHave', haveFilter);
Vue.filter('formatMem', memFilter);

new Vue({
    store: store,
    render: h => h(App),
    i18n,
    beforeCreate() {
        interceptor.init(store);
    }
}).$mount('#app')
