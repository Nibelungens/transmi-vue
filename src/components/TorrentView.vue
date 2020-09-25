<template>
  <div class="pl-3 pr-3 pb-1 pt-1 torrent-row" @contextmenu.prevent="$refs.menu.open" v-bind:class="{ 'm-selected': isSelected }" v-on:click="select" v-on:dblclick="details">
    <div class="title-row">{{ torrent.name }}</div>
    <div class="peers-row">{{ $t('message.torrent.downloading', [torrent.peersGettingFromUs, torrent.peersConnected]) }} <b-icon-arrow-down/> {{ torrent.rateDownload | formatSize }}/s <b-icon-arrow-up/> {{ torrent.rateUpload | formatSize }}/s</div>
    <div class="bar-row">
      <b-progress :max="1" :value="torrent.percentDone" :animated="getStatus().animated" :variant="getStatus().bar" class="w-100"/>
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
import TorrentUtilsMixin from "@/mixins/torrent.utils.mixin";
import events from "@/constantes/key.event.const"
import 'vue-context/dist/css/vue-context.css';
import VueContext from 'vue-context';
import bus from "@/config/event.bus";

export default {
  name: 'TorrentView',
  components: {
    VueContext
  },
  mixins: [
    TransmissionApiMixin,
    TorrentUtilsMixin
  ],
  props: {
    torrent: {
      id: String,
      name: String,
      totalSize: Number,
      peersGettingFromUs: Number,
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
      seedRatioLimit: Number
    }
  },
  data: function() {
    return {
        selected: false
      };
  },
  computed: {
    isPlay() {
      return this.getStatus().order === 1 ||
          this.getStatus().order === 2 ||
          this.getStatus().order === 3;
    },
    isPause() {
      return this.getStatus().order === 4;
    },
    isSelected() {
      return this.selected;
    }
  },
  methods: {
    select() {
      this.selected = !this.selected;
      this.$emit(events.SELECTED, this.selected, this.torrent);
    },
    details() {
      this.$emit(events.DOUBLE_CLICK, this.selected, this.torrent);
    },
    getStatus() {
      return this.meta(this.torrent);
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
div >>> .m-selected {
  background-color: lightgrey;
}
.title-row {
  font-weight: bold;
  font-size: small;
}
.bar-row {
  display: inline-flex;
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
