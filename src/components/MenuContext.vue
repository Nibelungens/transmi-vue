<template>
  <div>
    <b-modal id="location-torrent-modal" dialog-class="model-location user-select-none">
      <template v-slot:modal-title>
        <b-icon-box-arrow-in-down-right class="mr-3"/>{{ $t('message.header.locationModal.title') }}
      </template>

      <div class="d-flex flex-row">
        <img src="@/assets/logo-96.png" alt="logo" class="d-inline-flex"/>
        <b-form class="flex-column w-75 text-left align-middle" v-on:submit="submitLocation">
          <label class="ml-2 pt-2" for="location-input">{{ $t('message.header.locationModal.label') }}:</label>
          <b-form-input id="location-input" size="sm" class="ml-2" type="text" :placeholder="placeHolderLocation" v-model="inputDownloadDir"/>
        </b-form>
      </div>

      <template v-slot:modal-footer="{ submit, cancel }">
        <b-button size="sm" variant="danger" v-on:click="cancel()" v-text="$t('message.header.locationModal.cancel')"/>
        <b-button size="sm" variant="success" v-on:click="submitLocation" v-text="$t('message.header.locationModal.submit')"/>
      </template>
    </b-modal>
    <transition name="fade">
      <div id="context-menu" ref="contextMenu" v-show="showContext" class="context">
        <b-list-group>
          <b-list-group-item href="#" class="m-row" v-on:click="stop" v-bind:disabled="!isPlay">{{ $t('message.torrent.contextMenu.pause') }}</b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="start" v-bind:disabled="!isPause">{{ $t('message.torrent.contextMenu.resume') }}</b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="startNow" >{{ $t('message.torrent.contextMenu.resumeNow') }}</b-list-group-item>
          <b-list-group-item class="m-divider"></b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="toTop">{{ $t('message.torrent.contextMenu.moveTop') }}</b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="up">{{ $t('message.torrent.contextMenu.moveUp') }}</b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="down">{{ $t('message.torrent.contextMenu.moveDown') }}</b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="toBottom">{{ $t('message.torrent.contextMenu.moveBottom') }}</b-list-group-item>
          <b-list-group-item class="m-divider"></b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="remove(false)">{{ $t('message.torrent.contextMenu.remove') }}</b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="remove(true)">{{ $t('message.torrent.contextMenu.trash') }}</b-list-group-item>
          <b-list-group-item class="m-divider"></b-list-group-item>
          <b-list-group-item v-on:click="verify" href="#" class="m-row">{{ $t('message.torrent.contextMenu.verify') }}</b-list-group-item>
          <b-list-group-item v-b-modal.location-torrent-modal href="#" class="m-row">{{ $t('message.torrent.contextMenu.location') }}</b-list-group-item>
          <b-list-group-item disabled href="#" class="m-row">{{ $t('message.torrent.contextMenu.rename') }}</b-list-group-item>
          <b-list-group-item class="m-divider"></b-list-group-item>
          <b-list-group-item v-on:click="selectAll" href="#" class="m-row">{{ $t('message.torrent.contextMenu.selectAll') }}</b-list-group-item>
          <b-list-group-item v-on:click="deselectAll"  href="#" class="last">{{ $t('message.torrent.contextMenu.deselectAll') }}</b-list-group-item>
        </b-list-group>
      </div>
    </transition>
  </div>
</template>

<script>
import bus from "@/config/bus.event";
import events from "@/constantes/key.event.const";
import Status from "@/constantes/status.const";
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import {mapGetters} from "vuex";
import keyStore from "@/constantes/key.store.const";
import ResultMixin from "@/mixins/result.mixin";

const PX = 'px';
const LOCATION_MODAL = 'location-torrent-modal';

export default {
  name: "MenuContext",
  mixins: [
    TransmissionApiMixin,
    ResultMixin,
  ],
  data() {
    return {
      inputDownloadDir: '',
      showContext: false,
      torrent: null
    }
  },
  computed: {
    ...mapGetters({
      selectedTorrents: keyStore.GET_SELECTED_TORRENTS,
      downloadDir: keyStore.GET_DOWNLOAD_DIR
    }),
    isPlay() {
      return this.torrent === null || (this.torrent.status === Status.STATUS_DOWNLOAD || this.torrent.status === Status.STATUS_SEED);
    },
    isPause() {
      return this.torrent === null || (this.torrent.status === Status.STATUS_STOPPED);
    },
    placeHolderLocation() {
      return (this.selectedTorrents.length === 1)
          ? this.selectedTorrents[0].downloadDir
          : this.downloadDir;
    }
  },
  mounted() {
    bus.$on(events.OPEN_CONTEXT_MENU, this.openContextMenu);
    this.$root.$el.addEventListener('mouseup', this.close);
  },
  methods: {
    close() {
      this.showContext = false;
      this.inputDownloadDir = '';
    },
    submitLocation() {
      const down = (this.inputDownloadDir !== '' && this.inputDownloadDir !== null && this.inputDownloadDir !== undefined)
          ? this.inputDownloadDir
          : (this.selectedTorrents.length === 1) ? this.selectedTorrents[0].downloadDir :this.downloadDir;

     this.setLocation(this.selectedTorrents, down)
      .then(this.success)
      .catch(this.fail);
    },
    openContextMenu(event, torrent) {
      if (this.selectedTorrents.length < 2 || !this.selectedTorrents.map(torr => torr.id).includes(torrent.id)) {
        bus.$emit(events.SELECTED_UNIQUE, torrent);
        this.torrent = torrent;
      } else {
        this.torrent = null;
      }

      this.showContext = true;
      let y = event.clientY;
      let x = event.clientX;
      const maxY = (this.$root.$children[0].$refs.content.clientHeight - 370);
      const maxX = (this.$root.$children[0].$refs.content.clientWidth - 240);
      y = (y >= maxY) ? maxY: y;
      x = (x >= maxX) ? maxX: x;

      this.$refs.contextMenu.style.left = x
          .toString().concat(PX);
      this.$refs.contextMenu.style.top = y
          .toString().concat(PX);
    },
    start() {
      this.startTorrents(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    verify() {
      this.verifyTorrent(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    startNow() {
      this.startTorrentsNow(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    stop() {
      this.stopTorrents(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    remove(trash) {
      this.removeTorrent(this.selectedTorrents, trash)
          .then(this.success)
          .catch(this.error);
    },
    toTop() {
      this.moveToTop(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    toBottom() {
      this.moveToBottom(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    up() {
      this.moveUp(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    down() {
      this.moveDown(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    selectAll() {
      bus.$emit(events.SELECT_ALL_TORRENT);
    },
    deselectAll() {
      bus.$emit(events.UNSELECTED_ALL_TORRENT);
    }
  }
}
</script>

<style scoped>
div >>> .model-location {
  margin-top: 5%;
}

.m-divider {
  height: 1px;
  background-color: lightgray;
  border: none;
  margin: 0;
  padding: 0;
}

.m-row {
  padding: 5px 10px 5px 5px;
  font-size: smaller;
  border-bottom-style: hidden;
}

.last {
  padding: 5px 10px 5px 5px;
  font-size: smaller;
}

.m-row:hover {
  background-color: lightgrey;
}

.context {
  position: fixed;
  overflow: hidden;
  z-index: 2;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: height;
  transition-duration: .2s;
}

.fade-enter,
.fade-leave-to {
  height: 0;
}

.fade-enter-to,
.fade-leave {
  height: 412px;
}
</style>