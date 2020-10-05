<template>
  <div>
    <div class="pl-3 pr-3 torrent-row" v-bind:class="{ 'm-selected': selected }"
         v-on:click.shift.exact="selectTorrentRowCtrlMaj"
         v-on:click.ctrl.exact="selectTorrentRowCtrl"
         v-on:contextmenu.prevent="openContextMenu"
         v-on:click.exact="selectTorrentRow"
         v-on:dblclick="openDetails">
      <div class="d-flex">
        <div class="title-row font-weight-bold mr-auto">{{ (torrent != null)? torrent.name: '' }}</div>
        <span class="badge badge-primary queue"><span v-b-tooltip.hover :title="$t('message.torrent.queued')"><b-icon-layers-half/> {{ torrent.queuePosition+1 }}</span></span>
      </div>
      <div class="peers-row">
        <div class="d-inline-flex text-danger" v-if="asError">{{ $t('message.torrent.error', [torrent.errorString]) }}</div>
        <div class="d-inline-flex" v-else>{{ torrent | formatStatus($i18n) }}{{ postStatus() }}</div>
        <div class="d-inline-flex" v-if="showDownloadRate()"><b-icon-arrow-down/>{{ torrent.rateDownload | formatSize }}/s</div>
        <div class="d-inline-flex" v-if="showUploadRate()"><b-icon-arrow-up/>{{ torrent.rateUpload | formatSize }}/s</div>
      </div>
      <div class="bar-row-second">
        <b-progress v-if="showSecondBar()" :max="1" :value="getSecondBarValue()" :variant="getSecondBarStyle()" class="w-100"/>
      </div >
      <div class="bar-row">
        <b-progress :max="1" :value="torrent.percentDone" :variant="getMainBarStyle()" class="w-100"/>
        <b-icon-play-fill v-on:click="stop()" v-bind:hidden="!isPlay" class="ml-2 mr-1"></b-icon-play-fill>
        <b-icon-pause-fill v-on:click="start()" v-bind:hidden="!isPause" class="ml-2 mr-1"></b-icon-pause-fill>
      </div >
      <div class="dl-row">{{ torrent | formatRemaining($i18n) }}</div>
    </div>
  </div>
</template>

<script>
import api from "@/mixins/api.transmission.mixin";
import events from '@/constantes/event.const';
import key from '@/constantes/key.store.const';
import status from '@/constantes/status.const';
import result from '@/mixins/result.mixin';
import bus from '@/config/bus.event';
import { mapGetters } from "vuex";

const STYLE_SECONDARY = 'secondary';
const STYLE_SUCCESS = 'success';
const STYLE_PRIMARY = 'primary';
const STYLE_WARNING = 'warning';

export default {
  name: 'TorrentView',
  mixins: [
    api,
    result
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
      return this.torrent.status === status.STATUS_DOWNLOAD ||
          this.torrent.status === status.STATUS_CHECK_WAIT ||
          this.torrent.status === status.STATUS_SEED ||
          this.torrent.status === status.STATUS_CHECK;
    },
    isPause() {
      return this.torrent.status === status.STATUS_STOPPED;
    },
    asError() {
      return (this.torrent != null) ? this.torrent.error > 0: 0;
    },
    ...mapGetters({
      torrents: key.GET_TORRENT,
      selectedTorrents: key.GET_SELECTED_TORRENTS
    })
  },
  mounted() {
    bus.$on(events.UNSELECTED_ALL_TORRENT, this.unselectThis);
    bus.$on(events.SELECT_ALL_TORRENT, this.selectThis);
    bus.$on(events.SELECTED, this.onSelectMany);
  },
  methods: {
    getSecondBarValue() {
      return (this.torrent.status === status.STATUS_CHECK_WAIT || this.torrent.status === status.STATUS_CHECK)
          ? this.torrent.recheckProgress
          : this.torrent.uploadRatio;
    },
    unselectThis(event) {
      if(event === undefined || !event.path.map(element => element.id).includes('context-menu')) {
        this.selected = false;
        this.$store.commit(key.REMOVE_SELECTED, this.torrent);
      }
    },
    selectThis() {
      this.selected = true;
      this.$store.commit(key.ADD_SELECTED, this.torrent);
    },
    majSelected() {
      if (this.selectedTorrents.length > 1) {
        const firstIndex = this.torrents.findIndex((element) => element.id === this.selectedTorrents[0].id);
        const lastIndex = this.torrents.findIndex((element) => element.id === this.selectedTorrents[this.selectedTorrents.length-1].id)+1;

        const torrentSlice = (firstIndex < lastIndex)
            ? [...this.torrents].slice(firstIndex, lastIndex)
            : [...this.torrents].slice(lastIndex, firstIndex);

        if (torrentSlice != null &&
            torrentSlice.length !== 0) {
          bus.$emit(events.SELECTED, torrentSlice);
        }
      }
    },
    openContextMenu(event) {
      bus.$emit(events.OPEN_CONTEXT_MENU, event, this.torrent);
    },
    // SELECT
    selectTorrentRow() {
      bus.$emit(events.UNSELECTED_ALL_TORRENT);
      bus.$emit(events.SELECTED, [this.torrent]);
    },
    selectTorrentRowCtrlMaj() {
      this.selectTorrentRowCtrl();
      this.majSelected();
    },
    selectTorrentRowCtrl() {
      this.selected = !this.selected;
      this.selected
          ?this.$store.commit(key.ADD_SELECTED, this.torrent)
          :this.$store.commit(key.REMOVE_SELECTED, this.torrent);
    },
    onSelectMany(torrents) {
      const listId = torrents.map(torrent => torrent.id);
      this.selected = listId.includes(this.torrent.id);

      if(this.selected) {
        this.$store.commit(key.ADD_SELECTED, this.torrent);
      }
    },
    //DETAILS
    openDetails() {
      bus.$emit(events.SWITCH_INSPECTOR_PANEL);
    },
    // ARROW
    showUploadRate() {
      return (this.torrent.status === status.STATUS_SEED || this.torrent.status === status.STATUS_DOWNLOAD) && !this.asError;
    },
    showDownloadRate() {
      return this.torrent.status === status.STATUS_DOWNLOAD && !this.asError;
    },
    postStatus() {
      let str = '';

      switch (this.torrent.status){
        case status.STATUS_SEED:
          str = this.$t('message.torrent.to', [this.torrent.peersSendingToUs, this.torrent.peersConnected]);
          break;
        case status.STATUS_DOWNLOAD:
          str = this.$t('message.torrent.from', [this.torrent.peersSendingToUs, this.torrent.peersConnected]);
          break;
      }

      return (this.showDownloadRate() || this.showUploadRate())
          ?str.concat(' - ')
          : str;
    },
    getSecondBarStyle() {
      switch (this.torrent.status) {
        case status.STATUS_CHECK_WAIT:
        case status.STATUS_CHECK:
          return STYLE_WARNING;
        case status.STATUS_STOPPED:
        case status.STATUS_DOWNLOAD_WAIT:
        case status.STATUS_DOWNLOAD:
        case status.STATUS_SEED_WAIT:
        case status.STATUS_SEED:
        default:
          return STYLE_PRIMARY;
      }
    },
    getMainBarStyle() {
      switch (this.torrent.status) {
        case status.STATUS_CHECK_WAIT:
        case status.STATUS_CHECK:
        case status.STATUS_DOWNLOAD_WAIT:
        case status.STATUS_DOWNLOAD:
          return STYLE_PRIMARY;
        case status.STATUS_STOPPED:
          return STYLE_SECONDARY;
        case status.STATUS_SEED_WAIT:
        case status.STATUS_SEED:
        default:
          return STYLE_SUCCESS;
      }
    },
    showSecondBar() {
      return (this.torrent.uploadRatio < this.torrent.seedRatioLimit && this.torrent.percentDone >= 1) ||
          this.torrent.status === status.STATUS_CHECK_WAIT ||
          this.torrent.status === status.STATUS_CHECK;
    },
    start() {
      this.api_torrent.startTorrents(this.torrent)
          .then(this.success)
          .catch(this.error);
    },
    stop() {
      this.api_torrent.stopTorrents(this.torrent)
          .then(this.success)
          .catch(this.error);
    }
  }
}
</script>

<style scoped>
.queue {
  margin-right: 1.6%;
  margin-top: 5px;
  width: 40px;
}

.m-selected {
  border-left-color: cornflowerblue;
  border-left-width: 5px;
  border-left-style: solid;
  padding-left: 11px !important;
  background-color: lightgrey;
}

.torrent-row {
  cursor: pointer;
}

.title-row {
  font-size: small;
}

.bar-row {
  display: flex;
  margin-top: -26px;
  width: 100%;
  height: 23px;
}

.bar-row-second {
  height: 16px;
  margin-top: 8px;
  display: inline-flex;
  padding-right: 28px;
  width: 100%;
}

.peers-row {
  font-size: xx-small;
  margin-bottom: -3px;
  margin-top: -5px;
  color: gray;
}

.dl-row {
  font-size: xx-small;
  margin-top: -3px;
  color: gray;
}
</style>
