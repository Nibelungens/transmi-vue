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

new Vue({
    store: store,
    render: h => h(App),
    i18n,
    beforeCreate() {
        interceptor.init(store);
    }
}).$mount('#app')
