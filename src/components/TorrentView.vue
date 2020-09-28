<template>
  <div class="pl-3 pr-3 pb-1 pt-1 torrent-row" v-bind:class="{ 'm-selected': selected }"
       v-on:contextmenu.prevent="openContextMenu"
       v-on:click="selectTorrentRow"
       v-on:dblclick="openDetails">
    <div class="title-row">{{ (torrent != null)? torrent.name: '' }}</div>
    <div class="peers-row">
      <div class="d-inline-flex text-danger" v-if="asError">{{ $t('message.torrent.error', [torrent.errorString]) }}</div>
      <div class="d-inline-flex" v-else>{{ torrent | formatStatus($i18n) }}{{ postStatus() }}</div>
      <div class="d-inline-flex" v-if="showDownloadRate()"><b-icon-arrow-down/>{{ torrent.rateDownload | formatSize }}/s</div>
      <div class="d-inline-flex" v-if="showUploadRate()"><b-icon-arrow-up/>{{ torrent.rateUpload | formatSize }}/s</div>
    </div>
    <div class="bar-row-ratio">
      <b-progress v-if="showRatio()" :max="1" :value="torrent.uploadRatio" variant="primary" class="w-100"/>
    </div >
    <div class="bar-row">
      <b-progress :max="1" :value="torrent.percentDone" :variant="barStyle()" class="w-100"/>
      <b-icon-play-fill v-on:click="stop()" v-bind:hidden="!isPlay" class="ml-2 mr-1"></b-icon-play-fill>
      <b-icon-pause-fill v-on:click="start()" v-bind:hidden="!isPause" class="ml-2 mr-1"></b-icon-pause-fill>
    </div >
    <div class="dl-row">{{ torrent | formatRemaining($i18n) }}</div>
    <menu-context v-bind:torrent="this.torrent"/>
  </div>
</template>

<script>
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import keyStore from "@/constantes/key.store.const";
import events from "@/constantes/key.event.const"
import Status from "@/constantes/status.const";
import bus from "@/config/event.bus";
import MenuContext from '@/components/MenuContext'
import ResultMixin from "@/mixins/result.mixin";

export default {
  name: 'TorrentView',
  components: {MenuContext},
  mixins: [
    TransmissionApiMixin,
    ResultMixin
  ],
  props: {
    torrent: {
      id: String,
      eta: String,
      name: String,
      error: String,
      status: Number,
      totalSize: Number,
      rateUpload: Number,
      isFinished: Boolean,
      percentDone: String,
      errorString: String,
      uploadRatio: Number,
      sizeWhenDone: String,
      uploadedEver: String,
      rateDownload: Number,
      leftUntilDone: Number,
      peersConnected: Number,
      seedRatioLimit: Number,
      peersSendingToUs: Number,
      metadataPercentComplete: Number
    }
  },
  data: function() {
    return {
        selected: false,
        showContext: false
      };
  },
  computed: {
    isPlay() {
      return this.torrent.status === Status.STATUS_DOWNLOAD ||
          this.torrent.status === Status.STATUS_SEED;
    },
    isPause() {
      return this.torrent.status === Status.STATUS_STOPPED;
    },
    asError() {
      return (this.torrent != null) ? this.torrent.error > 0: 0;
    }
  },
  mounted() {
    bus.$on(events.SELECTED, this.onSelectTorrentRowCtrlNotPress);
  },
  methods: {
    openContextMenu(event) {
      bus.$emit(events.SELECTED, this.torrent);
      bus.$emit(events.OPEN_CONTEXT, event, this.torrent);
    },
    // SELECT
    selectTorrentRow(event) {
      if (event.ctrlKey) {
        this.selected = !this.selected;
        this.selected
            ?this.$store.commit(keyStore.ADD_SELECTED, this.torrent)
            :this.$store.commit(keyStore.REMOVE_SELECTED, this.torrent);
      } else {
        bus.$emit(events.SELECTED, this.torrent);
      }
    },
    onSelectTorrentRowCtrlNotPress(torrent) {
      this.selected = (this.torrent.id === torrent.id);
      if(this.selected) this.$store.commit(keyStore.SELECTED, this.torrent);
    },
    //DETAILS
    openDetails() {
      bus.$emit(events.SWITCH_PANEL);
    },
    // ARROW
    showUploadRate() {
      return this.torrent.status === Status.STATUS_SEED || this.torrent.status === Status.STATUS_DOWNLOAD
    },
    showDownloadRate() {
      return this.torrent.status === Status.STATUS_DOWNLOAD && !this.asError;
    },
    postStatus() {
      let str = '';

      switch (this.torrent.status){
        case Status.STATUS_SEED:
          str = this.$t('message.torrent.to', [this.torrent.peersSendingToUs, this.torrent.peersConnected]);
          break;
        case Status.STATUS_DOWNLOAD:
          str = this.$t('message.torrent.from', [this.torrent.peersSendingToUs, this.torrent.peersConnected]);
          break;
      }

      return (this.showDownloadRate() || this.showUploadRate())
          ?str.concat(' - ')
          : str;
    },
    barStyle() {
      const STYLE_SECONDARY = 'secondary';
      const STYLE_SUCCESS = 'success';
      const STYLE_PRIMARY = 'primary';

      switch (this.torrent.status) {
        case Status.STATUS_STOPPED:
          return STYLE_SECONDARY;
        case Status.STATUS_CHECK_WAIT:
          return STYLE_SUCCESS;
        case Status.STATUS_CHECK:
          return STYLE_SUCCESS;
        case Status.STATUS_DOWNLOAD_WAIT:
          return STYLE_PRIMARY;
        case Status.STATUS_DOWNLOAD:
          return STYLE_PRIMARY;
        case Status.STATUS_SEED_WAIT:
          return STYLE_SUCCESS;
        case Status.STATUS_SEED:
          return STYLE_SUCCESS;
        default:
          return STYLE_SUCCESS;
      }
    },
    showRatio() {
      return this.torrent.uploadRatio < this.torrent.seedRatioLimit && this.torrent.percentDone >= 1
    },
    start() {
      this.startTorrents(this.torrent)
          .then(this.success)
          .catch(this.error);
    },
    stop() {
      this.stopTorrents(this.torrent)
          .then(this.success)
          .catch(this.error);
    }
  }
}
</script>

<style scoped>
.m-selected {
  border-left-color: cornflowerblue;
  border-left-width: 5px;
  border-left-style: solid;
  padding-left: 11px !important;
  background-color: lightgrey;
}

.torrent-row {
  user-select: none;
  cursor: pointer;
}

.title-row {
  font-weight: bold;
  font-size: small;
}

.bar-row {
  display: flex;
  margin-top: -26px;
  width: 100%;
  height: 23px;
}

.bar-row-ratio {
  height: 16px;
  margin-top: 8px;
  display: inline-flex;
  padding-right: 28px;
  width: 100%;
}

.peers-row {
  font-size: xx-small;
  color: gray;
}

.dl-row {
  font-size: xx-small;
  color: gray;
}
</style>
