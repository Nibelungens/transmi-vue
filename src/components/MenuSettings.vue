<template>
  <div>
    <b-modal id="modal-about" :title="$t('message.menuSettings.aboutModal.title')" centered hide-footer>
      <img src="../assets/logo.png" alt="logo" width="128" height="128" class="mx-auto d-block"/>
      <div class="font-weight-bold text-center mt-1">{{$t('message.menuSettings.aboutModal.transmission', [this.version])}}</div>
      <div class="font-weight-bold text-center">{{$t('message.menuSettings.aboutModal.transmissionVue', [this.getClientVersion()])}}</div>
      <div class="font-weight-lighter text-center mt-2">{{$t('message.menuSettings.aboutModal.description')}}</div>
      <div class="font-weight-lighter text-center mb-4">{{$t('message.menuSettings.aboutModal.copyright')}}</div>
    </b-modal>
    <b-modal id="modal-stat" size="sm" :title="$t('message.menuSettings.statsModal.title')" centered hide-footer>
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
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort('queue')">
            <span class="dot"><b-icon v-show="col === 'queue'" icon="check"/></span>{{$t('message.menuSettings.transferts.queue')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort('activity')">
            <span class="dot"><b-icon v-show="col === 'activity'" icon="check"/></span>{{$t('message.menuSettings.transferts.activity')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort('age')">
            <span class="dot"><b-icon v-show="col === 'age'" icon="check"/></span>{{$t('message.menuSettings.transferts.age')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort('name')">
            <span class="dot"><b-icon v-show="col === 'name'" icon="check"/></span>{{$t('message.menuSettings.transferts.name')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort('progress')">
            <span class="dot"><b-icon v-show="col === 'progress'" icon="check"/></span>{{$t('message.menuSettings.transferts.progress')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort('ratio')">
            <span class="dot"><b-icon v-show="col === 'ratio'" icon="check"/></span>{{$t('message.menuSettings.transferts.ratio')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort('size')">
            <span class="dot"><b-icon v-show="col === 'size'" icon="check"/></span>{{$t('message.menuSettings.transferts.size')}}
          </li>
          <li href="#" class="list-group-item m-row list-group-item-action" v-on:click="sort('state')">
            <span class="dot"><b-icon v-show="col === 'state'" icon="check"/></span>{{$t('message.menuSettings.transferts.state')}}
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
import { version } from '@/../package.json'
import events from "@/constantes/key.event.const";
import bus from "@/config/bus.event";
import {mapGetters} from "vuex";
import keyStore from "@/constantes/key.store.const";
import TransmissionApi from "@/mixins/transmission.api.mixin";
import Result from "@/mixins/result.mixin";
import commonUtils from "@/utils/common.utils";


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
      idSource: null,
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
      },
      loadedStat: false
    };
  },
  computed: {
    ...mapGetters({
      reverse: keyStore.GET_SELECT_SORT_REVERSE,
      downloadLimit: keyStore.GET_UPLOAD_LIMIT,
      uploadLimit: keyStore.GET_UPLOAD_LIMIT,
      col: keyStore.GET_SELECT_SORT_COL,
      version: keyStore.GET_VERSION
    })
  },
  mounted() {
    bus.$on(events.SWITCH_MENU_SETTINGS, this.switch);
    this.$root.$el.onclick = this.closeAll;
  },
  methods: {
    getRatio(downloaded, uploaded) {
      return commonUtils.ratio(uploaded, downloaded)
    },
    openModalAbout() {
      this.extendsTransferts = this.extendsDownload = this.extendsUpload = this.extendsTools = false;
      this.$bvModal.show('modal-about');
    },
    openModalStatistics() {
      this.extendsTransferts = this.extendsDownload = this.extendsUpload = this.extendsTools = false;
      this.$bvModal.show('modal-stat');
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
      if (this.idNotInPath(event, this.idSource) &&
          this.idNotInPath(event, 'menuSettingRoot')) {
        this.extendsTransferts = this.extendsDownload = this.extendsUpload = this.extendsTools = false;
      }
    },
    switch(id) {
      this.extendsTools = !this.extendsTools
      this.extendsTransferts = this.extendsDownload = this.extendsUpload = false;
      this.idSource = id;
    },
    sort(sortCol) {
      this.$store.commit(keyStore.SET_SORT, [sortCol, this.reverse]);
    },
    reverseSort() {
      this.$store.commit(keyStore.SET_SORT, [this.col, !this.reverse]);
    },
    setUpload(value) {
      this.$store.commit(keyStore.SET_UPLOAD, value);
    },
    setDownload(value) {
      this.$store.commit(keyStore.SET_DOWNLOAD, value);
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