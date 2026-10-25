import { createApp } from 'vue'
import App from '@/App.vue'
import i18n from '@/i18n'
import store from '@/store/index.store'
import interceptor from '@/config/interceptor.http'
import registerIcons from '@/components/ui/icons'
import bootstrapPlugin from '@/components/ui/bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@/styles/bootstrap-compat.css'

import sizeFilter from '@/filters/size.filter'
import statusFilter from '@/filters/status.filter'
import percentFilter from '@/filters/percent.filter'
import remainingFilter from '@/filters/remaining.filter'
import haveFilter from '@/filters/infos/infos.have.filter'
import stateFilter from '@/filters/infos/infos.state.filter'
import errorFilter from '@/filters/infos/infos.error.filter'
import basicFilter from '@/filters/infos/infos.basic.filter'
import timeIntervalFilter from '@/filters/timeInterval.filter'
import privacyFilter from '@/filters/infos/infos.privacy.filter'
import uploadFilter from '@/filters/infos/infos.uploaded.filter'
import creatorFilter from '@/filters/infos/infos.creator.filter'
import downloadFilter from '@/filters/infos/infos.downloaded.filter'
import sizeDetailsFilter from '@/filters/infos/infos.size.details.filter'
import runningTimeFilter from '@/filters/infos/infos.running.time.filter'
import availabilityFilter from '@/filters/infos/infos.availability.filter'
import trackersStateFilter from '@/filters/trackers/trackers.state.filter'
import lastActivityFilter from '@/filters/infos/infos.last.activity.filter'
import remainingTimeFilter from '@/filters/infos/infos.remaining.time.filter'
import lastAnnounceFilter from '@/filters/trackers/trackers.lastannounce.filter'
import trackersLastScrapsFilter from '@/filters/trackers/trackers.lastScraps.filter'

const dateFormat = (value, pattern) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  if (pattern === 'HH:mm:ss') {
    return [date.getHours(), date.getMinutes(), date.getSeconds()]
      .map(part => String(part).padStart(2, '0'))
      .join(':')
  }

  return date.toLocaleString()
}

const app = createApp(App)

app.use(store)
app.use(i18n)
app.use(bootstrapPlugin)
app.config.globalProperties.$filters = {
  formatTimeInterval: timeIntervalFilter,
  formatRemaining: remainingFilter,
  formatPercent: percentFilter,
  formatCreator: creatorFilter,
  formatStatus: statusFilter,
  formatSize: sizeFilter,
  infosRemainingTime: remainingTimeFilter,
  infosLastActivity: lastActivityFilter,
  infosAvailability: availabilityFilter,
  infosRunningTime: runningTimeFilter,
  infosSizeDetails: sizeDetailsFilter,
  infosDownload: downloadFilter,
  infosPrivacy: privacyFilter,
  infosUpload: uploadFilter,
  infosState: stateFilter,
  infosError: errorFilter,
  infosBasic: basicFilter,
  infosHave: haveFilter,
  trackersLastAnnounce: lastAnnounceFilter,
  trackersState: trackersStateFilter,
  trackersLastScraps: trackersLastScrapsFilter,
  dateFormat
}
registerIcons(app)

interceptor.init(store)
app.mount('#app')
