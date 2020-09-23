import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './store/index.store'
import remainingFilter from './filters/remaining.filter'
import sizeFilter from './filters/size.filter.js'
import percentFilter from './filters/percent.filter'
import haveFilter from './filters/have.filter'
import availabilityFilter from './filters/availability.filter'
import uploadFilter from './filters/uploaded.filter'
import downloadFilter from './filters/downloaded.filter'
import stateFilter from './filters/state.filter'
import statusFilter from './filters/status.filter'
import runningTimeFilter from './filters/runningtime.filter'
import timeintervalFilter from './filters/timeInterval.filter'
import remainingTimeFilter from './filters/remainingtime.filter'
import lastActivityFilter from './filters/lastactivity.filter'
import memFilter from './filters/mem.filter'
import sizedetailsFilter from './filters/sizedetails.filter'
import creatorFilter from './filters/creator.filter'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import interceptor from "@/config/http.interceptor";
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.filter('formatSize', sizeFilter);
Vue.filter('formatPercent', percentFilter);
Vue.filter('formatRemaining', remainingFilter);
Vue.filter('formatHave', haveFilter);
Vue.filter('formatAvailability', availabilityFilter);
Vue.filter('formatUpload', uploadFilter);
Vue.filter('formatDownload', downloadFilter);
Vue.filter('formatState', stateFilter);
Vue.filter('formatStatus', statusFilter);
Vue.filter('formatRunningTime', runningTimeFilter);
Vue.filter('formatTimeInterval', timeintervalFilter);
Vue.filter('formatRemainingTime', remainingTimeFilter);
Vue.filter('formatLastActivity', lastActivityFilter);
Vue.filter('formatMem', memFilter);
Vue.filter('formatSizeDetails', sizedetailsFilter);
Vue.filter('formatCreator', creatorFilter);

new Vue({
    store: store,
    render: h => h(App),
    i18n,
    beforeCreate() {
        interceptor.init(store);
    }
}).$mount('#app')
