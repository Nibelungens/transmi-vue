<template>
  <div class="pl-3 pr-3 pb-1 pt-1 torrent-row" @contextmenu.prevent="$refs.menu.open" v-bind:class="{ 'm-selected': selected, 'm-panelShow': isPanelShow() }" v-on:click="select" v-on:dblclick="details">
    <div class="title-row">
      {{ torrent.name }}
      <b-icon v-if="!isPanelShow()" class="ml-2 ico" v-on:click="details" icon="arrow-bar-left"></b-icon>
      <b-icon v-if="isPanelShow()" class="ml-2 ico" v-on:click="details" icon="arrow-bar-right"></b-icon>
    </div>
    <div class="peers-row">
      <div class="d-inline-flex text-danger" v-if="asError">{{ $t('message.torrent.error', [torrent.errorString]) }}</div>
      <div class="d-inline-flex" v-else>{{ torrent | formatStatus($i18n) }}{{ getPost() }}</div>
      <div class="d-inline-flex" v-if="showDown()"><b-icon-arrow-down/>{{ torrent.rateDownload | formatSize }}/s</div>
      <div class="d-inline-flex" v-if="showUp()"><b-icon-arrow-up/>{{ torrent.rateUpload | formatSize }}/s</div>
    </div>
    <div class="bar-row-ratio">
      <b-progress v-if="showRatio()" :max="1" :value="torrent.uploadRatio" variant="primary" class="w-100"/>
    </div >
    <div class="bar-row">
      <b-progress :max="1" :value="torrent.percentDone" :variant="getColor()" class="w-100"/>
      <b-icon-play-fill v-on:click="stop()" v-bind:hidden="!isPlay" class="ml-2 mr-1"></b-icon-play-fill>
      <b-icon-pause-fill v-on:click="start()" v-bind:hidden="!isPause" class="ml-2 mr-1"></b-icon-pause-fill>
    </div >
    <div class="dl-row">{{ torrent | formatRemaining($i18n) }}</div>

    <vue-context ref="menu">
      <li class="m-row" v-on:click="stop()" v-bind:class="{ 'm-disabled': !isPlay }">{{ $t('message.torrent.contextMenu.pause') }}</li>
      <li class="m-row" v-on:click="start()" v-bind:class="{ 'm-disabled': !isPause }">{{ $t('message.torrent.contextMenu.resume') }}</li>
      <li class="m-row m-disabled">{{ $t('message.torrent.contextMenu.resumeNow') }}</li>
      <li class="m-divider"></li>
      <li class="m-row m-disabled">{{ $t('message.torrent.contextMenu.moveTop') }}</li>
      <li class="m-row m-disabled">{{ $t('message.torrent.contextMenu.moveUp') }}</li>
      <li class="m-row m-disabled">{{ $t('message.torrent.contextMenu.moveDown') }}</li>
      <li class="m-row m-disabled">{{ $t('message.torrent.contextMenu.moveBottom') }}</li>
      <li class="m-divider"></li>
      <li class="m-row m-disabled">{{ $t('message.torrent.contextMenu.remove') }}</li>
      <li class="m-row m-disabled">{{ $t('message.torrent.contextMenu.trash') }}</li>
      <li class="m-divider"></li>
      <li class="m-row m-disabled">{{ $t('message.torrent.contextMenu.verify') }}</li>
      <li class="m-row m-disabled">{{ $t('message.torrent.contextMenu.location') }}</li>
      <li class="m-row m-disabled">{{ $t('message.torrent.contextMenu.rename') }}</li>
      <li class="m-divider"></li>
      <li class="m-row m-disabled">{{ $t('message.torrent.contextMenu.selectAll') }}</li>
      <li class="m-row m-disabled">{{ $t('message.torrent.contextMenu.deselectAll') }}</li>
    </vue-context>

  </div>
</template>

<script>
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import keyStore from "@/constantes/key.store.const";
import events from "@/constantes/key.event.const"
import Status from "@/constantes/status.const";
import 'vue-context/dist/css/vue-context.css';
import VueContext from 'vue-context';
import bus from "@/config/event.bus";
import {mapGetters} from "vuex";

export default {
  name: 'TorrentView',
  components: {
    VueContext
  },
  mixins: [
    TransmissionApiMixin
  ],
  props: {
    torrent: {
      id: String,
      name: String,
      totalSize: Number,
      peersSendingToUs: Number,
      isFinished: Boolean,
      peersConnected: Number,
      percentDone: String,
      sizeWhenDone: String,
      rateDownload: Number,
      rateUpload: Number,
      status: Number,
      eta: String,
      metadataPercentComplete: Number,
      leftUntilDone: Number,
      uploadedEver: String,
      uploadRatio: Number,
      seedRatioLimit: Number,
      errorString: String,
      error: String
    }
  },
  data: function() {
    return {
        selected: false
      };
  },
  computed: {
    ...mapGetters({
      selectedTorrent: keyStore.GET_SELECTED_TORRENT
    }),
    isPlay() {
      return this.torrent.status === Status.STATUS_DOWNLOAD ||
          this.torrent.status === Status.STATUS_SEED;
    },
    isPause() {
      return this.torrent.status === Status.STATUS_STOPPED;
    },
    asError() {
      return this.torrent.error > 0
    }
  },
  methods: {
    showUp() {
      return this.torrent.status === Status.STATUS_SEED || this.torrent.status === Status.STATUS_DOWNLOAD
    },
    showDown() {
      return this.torrent.status === Status.STATUS_DOWNLOAD && !this.asError;
    },
    getPost() {
      let str;

      switch (this.torrent.status){
        case Status.STATUS_SEED:
          str = this.$t('message.torrent.to', [this.torrent.peersSendingToUs, this.torrent.peersConnected]);
          break;
        case Status.STATUS_DOWNLOAD:
          str = this.$t('message.torrent.from', [this.torrent.peersSendingToUs, this.torrent.peersConnected]);
          break;
        default:
          str = '';
      }

      return (this.showDown() || this.showUp()) ? str + ' - ' : str;
    },
    getColor() {
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
    isPanelShow() {
      if (this.selectedTorrent !== null && this.selectedTorrent !== undefined && this.torrent !== null) {
        return this.selectedTorrent.id === this.torrent.id;
      } else {
        return false;
      }
    },
    select() {
      this.selected = !this.selected;
      this.$emit(events.SELECTED, this.selected, this.torrent);
    },
    details() {
      if(this.selectedTorrent !== null && this.selectedTorrent.id === this.torrent.id) {
        this.selected = false;
        this.$store.commit(keyStore.UNSELECT);
        this.$emit(events.CLOSE_PANEL);
      } else {
        this.selected = true;
        this.$store.commit(keyStore.UNSELECT);
        this.$emit(events.DOUBLE_CLICK, this.selected, this.torrent);
      }
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
    },
    success(response) {
      bus.$emit(events.NOTIFICATION_SUCCESS, response.data.result);
      bus.$emit(events.ACTION);
    },
    error(error) {
      bus.$emit(events.NOTIFICATION_FAIL, error);
    }
  }
}
</script>

<style scoped>
.ico {
  cursor: pointer;
}
.m-selected {
  border-left-color: cornflowerblue;
  border-left-width: 5px;
  border-left-style: solid;
  padding-left: 11px !important;
}
.m-panelShow {
  background-color: lightgrey;
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
.m-divider {
  width: 100%;
  height: 1px;
  background-color: lightgray;
  border: none;
  margin-top: 5px;
  margin-bottom: 5px;
}
.m-row {
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 5px;
}
.m-row:hover {
  background-color: lightgrey;
}
.m-disabled {
  color: gray;
  cursor: default;
}
.torrent-row {
  user-select: none;
}
</style>
