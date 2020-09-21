<template>
  <div class="pl-3 pr-3 pb-1 pt-1 torrent-row" @contextmenu.prevent="$refs.menu.open" v-bind:class="{ 'm-selected': isSelected }" v-on:click="select" v-on:dblclick="details">
    <div class="title-row">{{ torrent.name }}</div>
    <div class="peers-row">Downloading from {{ torrent.peersGettingFromUs }} of {{ torrent.peersConnected }} peer - <b-icon-arrow-down/> {{ torrent.rateDownload | formatSize }}/s <b-icon-arrow-up/> {{ torrent.rateUpload | formatSize }}/s</div>
    <div class="bar-row">
      <b-progress :max="1" :value="torrent.percentDone" :animated="getStatus().animated" :variant="getStatus().bar" class="w-100"/>
      <b-icon-play-fill v-on:click="stop()" v-bind:hidden="!isPlay" class="ml-2 mr-1"></b-icon-play-fill>
      <b-icon-pause-fill v-on:click="start()" v-bind:hidden="!isPause" class="ml-2 mr-1"></b-icon-pause-fill>
    </div >
    <div class="dl-row">{{ torrent.totalSize | formatSize }} of {{ torrent.sizeWhenDone | formatSize }} ({{ torrent.percentDone | formatPercent }}) - {{ torrent | formatRemaining }}</div>

    <vue-context ref="menu">
      <li class="m-row" v-on:click="stop()" v-bind:class="{ 'm-disabled': !isPlay }">Pause</li>
      <li class="m-row" v-on:click="start()" v-bind:class="{ 'm-disabled': !isPause }">Resume</li>
      <li class="m-row m-disabled">Resume Now</li>
      <li class="m-divider"></li>
      <li class="m-row m-disabled">Move to Top</li>
      <li class="m-row m-disabled">Move Up</li>
      <li class="m-row m-disabled">Move Down</li>
      <li class="m-row m-disabled">Move to Bottom</li>
      <li class="m-divider"></li>
      <li class="m-row m-disabled">Remove From List</li>
      <li class="m-row m-disabled">Trash Data and Remove From List</li>
      <li class="m-divider"></li>
      <li class="m-row m-disabled">Verify Local Data</li>
      <li class="m-row m-disabled">Set Location...</li>
      <li class="m-row m-disabled">Rename...</li>
      <li class="m-divider"></li>
      <li class="m-row m-disabled">Select All</li>
      <li class="m-row m-disabled">Deselect All</li>
    </vue-context>

  </div>
</template>

<script>
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import TorrentUtilsMixin from "@/mixins/torrent.utils.mixin";
import VueContext from 'vue-context';
import 'vue-context/dist/css/vue-context.css';
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
      this.$emit('selected', this.selected, this.torrent);
    },
    details() {
      this.$emit('double-click', this.selected, this.torrent);
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
      bus.$emit('notification-success', response.data.result);
      bus.$emit('action');
    },
    error(error) {
      bus.$emit('notification-fail', error);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-selected {
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
