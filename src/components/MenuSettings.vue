<template>
  <div>
    <b-modal id="modal-about" dialog-class="user-select-none" centered hide-footer>
      <template v-slot:modal-title>
        <b-icon icon="question-circle-fill"></b-icon><span class="ml-3">{{ $t('message.menuSettings.aboutModal.title') }}</span>
      </template>
      <img src="@/assets/logo-128.png" alt="logo" class="mx-auto d-block"/>
      <div class="font-weight-bold text-center mt-1">{{$t('message.menuSettings.aboutModal.transmission', [this.version])}}</div>
      <div class="font-weight-bold text-center">{{$t('message.menuSettings.aboutModal.transmissionVue', [this.getClientVersion()])}}</div>
      <div class="font-weight-lighter text-center mt-2">{{$t('message.menuSettings.aboutModal.description')}}</div>
      <div class="font-weight-lighter text-center mb-4">{{$t('message.menuSettings.aboutModal.copyright')}}</div>
    </b-modal>
    <b-modal id="modal-stat" size="sm" dialog-class="user-select-none" centered hide-footer>
      <template v-slot:modal-title>
        <b-icon icon="info-circle-fill"></b-icon><span class="ml-3">{{ $t('message.menuSettings.statsModal.title') }}</span>
      </template>
      <div class="d-flex justify-content-center">
        <div v-if="!loadedStat" class="info-spin spin-stats">
          <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
      </div>
      <div v-show="loadedStat">
        <div class="font-weight-bold mb-2 ml-2">{{$t('message.menuSettings.statsModal.current')}}</div>
        <div class="ml-4 stat-row">
          <div class="d-inline-flex stat-row-label">{{$t('message.menuSettings.statsModal.uploaded')}}: </div>
          <div class="d-inline-flex">{{ this.stats['current-stats'].uploadedBytes | formatSize }}</div>
        </div>
        <div class="ml-4 stat-row">
          <div class="d-inline-flex stat-row-label">{{$t('message.menuSettings.statsModal.downloaded')}}: </div>
          <div class="d-inline-flex">{{ this.stats['current-stats'].downloadedBytes | formatSize }}</div>
        </div>
        <div class="ml-4 stat-row">
          <div class="d-inline-flex stat-row-label">{{$t('message.menuSettings.statsModal.ratio')}}: </div>
          <div class="d-inline-flex">{{ this.getRatio(this.stats['current-stats'].downloadedBytes, this.stats['current-stats'].uploadedBytes) }}</div>
        </div>
        <div class="ml-4 stat-row">
          <div class="d-inline-flex stat-row-label">{{$t('message.menuSettings.statsModal.runningTime')}}: </div>
          <div class="d-inline-flex">{{ this.stats['current-stats'].secondsActive | formatSize }}</div>
        </div>
        <div class="font-weight-bold mb-2 ml-2 mt-2">{{$t('message.menuSettings.statsModal.total')}}</div>
        <div class="ml-4 stat-row">
          <div class="d-inline-flex stat-row-label">{{$t('message.menuSettings.statsModal.started')}}: </div>
          <div class="d-inline-flex">{{ this.stats['cumulative-stats'].sessionCount }}</div>
        </div>
        <div class="ml-4 stat-row">
          <div class="d-inline-flex stat-row-label">{{$t('message.menuSettings.statsModal.uploaded')}}: </div>
          <div class="d-inline-flex">{{ this.stats['cumulative-stats'].uploadedBytes | formatSize }}</div>
        </div>
        <div class="ml-4 stat-row">
          <div class="d-inline-flex stat-row-label">{{$t('message.menuSettings.statsModal.downloaded')}}: </div>
          <div class="d-inline-flex">{{ this.stats['cumulative-stats'].downloadedBytes | formatSize }}</div>
        </div>
        <div class="ml-4 stat-row">
          <div class="d-inline-flex stat-row-label">{{$t('message.menuSettings.statsModal.ratio')}}: </div>
          <div class="d-inline-flex">{{ this.getRatio(this.stats['cumulative-stats'].downloadedBytes, this.stats['cumulative-stats'].uploadedBytes) }}</div>
        </div>
        <div class="ml-4 stat-row mb-2">
          <div class="d-inline-flex stat-row-label">{{$t('message.menuSettings.statsModal.runningTime')}}: </div>
          <div class="d-inline-flex">{{ this.stats['cumulative-stats'].secondsActive | formatSize }}</div>
        </div>
      </div>
    </b-modal>
    <transition name="slide-x">
      <div v-show="extendsTools" class="drown-up" id="menuSettingRoot">
        <ul class="list-group m-list">
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="openModalAbout">
            {{$t('message.menuSettings.about')}}
          </li>
          <li class="list-group-item m-divider"/>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="openLink('https://transmissionbt.com/')">
            {{$t('message.menuSettings.homepage')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="openLink('https://transmissionbt.com/donate/')">
            {{$t('message.menuSettings.jar')}}
          </li>
          <li class="list-group-item m-divider"/>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="openModalStatistics">
            {{$t('message.menuSettings.statistics')}}
          </li>
          <li class="list-group-item m-divider"/>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="openDownload">
            <div class="label-m">{{$t('message.menuSettings.downloadRate')}}</div>
            <div class="ico-m"><b-icon icon="caret-right-fill"></b-icon></div>
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="openUpload">
            <div class="label-m">{{$t('message.menuSettings.uploadRate')}}</div>
            <div class="ico-m"><b-icon icon="caret-right-fill"></b-icon></div>
          </li>
          <li class="list-group-item m-divider"/>
          <li href="#" class="list-group-item m-row list-group-item-action last" v-on:click="openTransferts">
            <div class="label-m">{{$t('message.menuSettings.sortTransferts')}}</div>
            <div class="ico-m"><b-icon icon="caret-right-fill"></b-icon></div>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="slide-y-transfert">
      <div v-show="extendsTransferts" class="drown-up-transfert">
        <ul class="list-group m-list">
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort(COLUMN.QUEUE_POSITION)">
            <span class="dot"><b-icon v-show="col === COLUMN.QUEUE_POSITION" icon="check"/></span>{{$t('message.menuSettings.transferts.queue')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort(COLUMN.ACTIVITY_DATE)">
            <span class="dot"><b-icon v-show="col === COLUMN.ACTIVITY_DATE" icon="check"/></span>{{$t('message.menuSettings.transferts.activity')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort(COLUMN.DATE_CREATED)">
            <span class="dot"><b-icon v-show="col === COLUMN.DATE_CREATED" icon="check"/></span>{{$t('message.menuSettings.transferts.age')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort(COLUMN.NAME)">
            <span class="dot"><b-icon v-show="col === COLUMN.NAME" icon="check"/></span>{{$t('message.menuSettings.transferts.name')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort(COLUMN.METADATA_PERCENT_COMPLETE)">
            <span class="dot"><b-icon v-show="col === COLUMN.METADATA_PERCENT_COMPLETE" icon="check"/></span>{{$t('message.menuSettings.transferts.progress')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort(COLUMN.UPLOAD_RATIO)">
            <span class="dot"><b-icon v-show="col === COLUMN.UPLOAD_RATIO" icon="check"/></span>{{$t('message.menuSettings.transferts.ratio')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort(COLUMN.TOTAL_SIZE)">
            <span class="dot"><b-icon v-show="col === COLUMN.TOTAL_SIZE" icon="check"/></span>{{$t('message.menuSettings.transferts.size')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort(COLUMN.STATUS)">
            <span class="dot"><b-icon v-show="col === COLUMN.STATUS" icon="check"/></span>{{$t('message.menuSettings.transferts.state')}}
          </li>
          <li class="list-group-item m-divider"/>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="reverseSort">
            <span class="dot"><b-icon v-show="reverse" icon="check"/></span>{{$t('message.menuSettings.transferts.reverse')}}
          </li>
        </ul>
      </div>
    </transition>
    <transition name="slide-y-upload">
      <div v-show="extendsUpload" class="drown-up-upload">
        <ul class="list-group m-list">
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="setUpload(null)">
            <span class="dot"><b-icon v-show="uploadLimit === null" icon="check"/></span>{{$t('message.menuSettings.upload.unlimited')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="setUpload(100)">
            <span class="dot"><b-icon v-show="uploadLimit === 100" icon="check"/></span>{{$t('message.menuSettings.upload.limit', [100])}}
          </li>
          <li class="list-group-item m-divider"/>
          <li v-for="rate in rates" :key="rate" href="#" class="list-group-item m-row list-group-item-action" v-bind:class="{ 'last': isLast(rate) }" v-on:click="setUpload(rate)">
            <span class="dot"><b-icon v-show="uploadLimit === rate" icon="check"/></span>{{$t('message.menuSettings.upload.rate', [rate])}}
          </li>
        </ul>
      </div>
    </transition>
    <transition name="slide-y-download">
      <div v-show="extendsDownload" class="drown-up-download">
        <ul class="list-group m-list">
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="setDownload(null)">
            <span class="dot"><b-icon v-show="downloadLimit === null" icon="check"/></span>{{$t('message.menuSettings.upload.unlimited')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="setDownload(100)">
            <span class="dot"><b-icon v-show="downloadLimit === 100" icon="check"/></span>{{$t('message.menuSettings.upload.limit', [100])}}
          </li>
          <li class="list-group-item m-divider"/>
          <li v-for="rate in rates" :key="rate" href="#" class="list-group-item m-row list-group-item-action" v-bind:class="{ 'last': isLast(rate) }" v-on:click="setDownload(rate)">
            <span class="dot"><b-icon v-show="downloadLimit === rate" icon="check"/></span>{{$t('message.menuSettings.upload.rate', [rate])}}
          </li>
        </ul>
      </div>
  </transition>
  </div>
</template>

<script>
import TransmissionApi from '@/mixins/transmission.api.mixin';
import keyStore from '@/constantes/key.store.const';
import events from '@/constantes/key.event.const';
import commonUtils from '@/utils/common.utils';
import { version } from '@/../package.json';
import Result from '@/mixins/result.mixin';
import bus from '@/config/bus.event';
import { mapGetters } from 'vuex';

const ID_ROOT = 'menuSettingRoot';
const MODAL_ABOUT = 'modal-about';
const MODAL_STAT = 'modal-stat';

export default {
  name: "MenuSettings",
  mixins: [
      TransmissionApi,
      Result
  ],
  data: function() {
    return {
      rates: [5, 10, 20, 30, 40, 50, 75, 100, 150, 200, 250, 500, 750],
      extendsTransferts: false,
      extendsDownload: false,
      extendsUpload: false,
      extendsTools: false,
      downloadLimit: null,
      uploadLimit: null,
      loadedStat: false,
      stats: {
        "current-stats": {
          uploadedBytes: null,
          downloadedBytes: null,
          ratio: null,
          secondsActive: null
        },
        "cumulative-stats": {
          uploadedBytes: null,
          downloadedBytes: null,
          ratio: null,
          secondsActive: null
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      reverse: keyStore.GET_SELECT_SORT_REVERSE,
      col: keyStore.GET_SELECT_SORT_COL,
      version: keyStore.GET_VERSION
    })
  },
  created() {
    this.COLUMN = {
      METADATA_PERCENT_COMPLETE: 'metadataPercentComplete',
      QUEUE_POSITION: 'queuePosition',
      ACTIVITY_DATE: 'activityDate',
      DATE_CREATED: 'dateCreated',
      UPLOAD_RATIO: 'uploadRatio',
      TOTAL_SIZE: 'totalSize',
      STATUS: 'status',
      NAME: 'name'
    };
  },
  mounted() {
    bus.$on(events.SWITCH_MENU_SETTINGS, this.switch);
    this.$root.$el.addEventListener('mouseup', this.closeAll);
  },
  methods: {
    getRatio(downloaded, uploaded) {
      return commonUtils.ratio(uploaded, downloaded)
    },
    openModalAbout() {
      this.extendsTransferts = this.extendsDownload = this.extendsUpload = this.extendsTools = false;
      this.$bvModal.show(MODAL_ABOUT);
    },
    openModalStatistics() {
      this.extendsTransferts = this.extendsDownload = this.extendsUpload = this.extendsTools = false;
      this.$bvModal.show(MODAL_STAT);
      this.getSessionStat()
          .then((response => {
              this.stats = response.data.arguments;
              this.loadedStat = true;
          }))
      .catch(this.fail);
    },
    openLink(link) {
      window.open(link);
    },
    getClientVersion() {
      return version;
    },
    idNotInPath(event, id) {
      return !event.path.map(element => element.id).includes(id)
    },
    closeAll(event) {
      if (this.extendsTools &&
          this.idNotInPath(event, ID_ROOT)) {
        this.extendsTransferts = this.extendsDownload = this.extendsUpload = this.extendsTools = false;
      }
    },
    switch() {
      this.extendsTools = !this.extendsTools
      this.extendsTransferts = this.extendsDownload = this.extendsUpload = false;

      if (this.extendsTools) {
        this.getSession()
          .then(result => {
            if (result.data.result === 'success') {
              result.data.arguments['speed-limit-down-enabled']
                  ? this.downloadLimit = result.data.arguments['speed-limit-down']
                  : this.downloadLimit = null;
              result.data.arguments['speed-limit-up-enabled']
                  ? this.uploadLimit = result.data.arguments['speed-limit-up']
                  : this.uploadLimit = null;
            }
          })
        .catch(this.fail)
      }
    },
    sort(sortCol) {
      this.$store.commit(keyStore.SET_SORT, [sortCol, this.reverse]);
    },
    reverseSort() {
      this.$store.commit(keyStore.SET_SORT, [this.col, !this.reverse]);
    },
    setUpload(value) {
      this.setUploadLimit(value)
          .then(() => {this.uploadLimit = value})
          .catch(this.fail);
    },
    setDownload(value) {
      this.setDownloadLimit(value)
          .then(() => {this.downloadLimit = value})
          .catch(this.fail);
    },
    isLast(value) {
      return this.rates[this.rates.length-1] === value;
    },
    openTransferts() {
      this.extendsTransferts = !this.extendsTransferts;
      this.extendsDownload = this.extendsUpload = false;
    },
    openUpload() {
      this.extendsUpload = !this.extendsUpload;
      this.extendsTransferts = this.extendsDownload = false;
    },
    openDownload() {
      this.extendsDownload = !this.extendsDownload;
      this.extendsTransferts = this.extendsUpload = false;
    }
  }
}
</script>

<style scoped>
.spin-stats {
  padding-top: 35%;
  height: 243px;
}

.stat-row {
  font-size: smaller;
}

.stat-row-label {
  display: inline-flex;
  width: 150px;
}

.dot {
  display: inline-block;
  width: 15px;
}

.label-m {
  text-align: left;
}

.ico-m {
  text-align: right;
  margin-top: -19px;
}

.m-list {
  width: 180px;
}

.m-divider {
  padding: 0;
  margin: 0;
  height: 1px;
}

.last {
  border-bottom-style: solid !important;
}

.drown-up-upload {
  position: fixed;
  bottom: 74px;
  left: 198px;
}

.drown-up-download {
  position: fixed;
  bottom: 105px;
  left: 198px;
}

.drown-up-transfert {
  position: fixed;
  bottom: 43px;
  left: 198px;
}

.drown-up {
  position: fixed;
  bottom: 43px;
  left: 16px;
}

.m-row {
  color: #495057;
  cursor: pointer;
  margin: 0;
  font-size: smaller;
  border-bottom-style: hidden;
  text-align: left;
  padding: 5px 8px;
}

.m-row:hover {
  background-color: lightgrey;
}

.slide-x-enter-active,
.slide-x-leave-active {
  transition: height .2s ease-out;
}

.slide-x-enter,
.slide-x-leave-to {
  height: 0;
  z-index: -1;
}

.slide-x-enter-to,
.slide-x-leave {
  z-index: -1;
  height: 209px;
}

.slide-y-transfert-enter-active,
.slide-y-transfert-active,
.slide-y-upload-enter-active,
.slide-y-upload-active,
.slide-y-download-enter-active,
.slide-y-download-active {
  transition: height .2s ease-out;
}

.slide-y-transfert-enter,
.slide-y-transfert-leave-to,
.slide-y-upload-enter,
.slide-y-upload-leave-to,
.slide-y-download-enter,
.Slide-y-download-leave-to {
  height: 0;
  z-index: -1;
}

.slide-y-transfert-enter-to,
.slide-y-transfert-leave {
  height: 263px;
  z-index: -1;
}

.slide-y-upload-enter-to,
.slide-y-upload-leave  {
  height: 438px;
  z-index: -1;
}

.slide-y-download-enter-to,
.slide-y-download-leave {
  height: 438px;
  z-index: -1;
}
</style>