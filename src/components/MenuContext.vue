<template>
  <div>
    <b-modal id="location-torrent-modal" dialog-class="model-location user-select-none">
      <template v-slot:modal-title>
        <b-icon-box-arrow-in-down-right class="mr-3"/>{{ $t('message.contextMenu.locationModal.title') }}
      </template>

      <div class="d-flex flex-row">
        <img src="@/assets/logo-96.png" alt="logo" class="d-inline-flex"/>
        <b-form class="flex-column w-75 text-left align-middle" v-on:submit="submitLocation">
          <label class="ml-2 pt-2" for="location-input">{{ $t('message.contextMenu.locationModal.label') }}:</label>
          <b-form-input id="location-input" size="sm" class="ml-2" type="text" :placeholder="placeHolderLocation" v-model="inputDownloadDir"/>
        </b-form>
      </div>

      <template v-slot:modal-footer="{ submit, cancel }">
        <b-button size="sm" variant="danger" v-on:click="cancel()" v-text="$t('message.contextMenu.locationModal.cancel')"/>
        <b-button size="sm" variant="success" v-on:click="submitLocation" v-text="$t('message.contextMenu.locationModal.submit')"/>
      </template>
    </b-modal>

    <b-modal id="rename-torrent-modal" dialog-class="model-rename user-select-none">
      <template v-slot:modal-title>
        <b-icon-fonts class="mr-3"/>{{ $t('message.contextMenu.renameModal.title') }}
      </template>

      <div class="d-flex flex-row">
        <img src="@/assets/logo-96.png" alt="logo" class="d-inline-flex"/>
        <b-form class="flex-column w-75 text-left align-middle" v-on:submit="submitRename">
          <label class="ml-2 pt-2" for="location-input">{{ $t('message.contextMenu.renameModal.label') }}:</label>
          <b-form-input id="location-input" size="sm" class="ml-2" type="text" v-model="newName"/>
        </b-form>
      </div>

      <template v-slot:modal-footer="{ submit, cancel }">
        <b-button size="sm" variant="danger" v-on:click="cancel()" v-text="$t('message.contextMenu.renameModal.cancel')"/>
        <b-button size="sm" variant="success" v-on:click="submitRename" v-text="$t('message.contextMenu.renameModal.submit')"/>
      </template>
    </b-modal>

    <transition name="fade">
      <div id="context-menu" ref="contextMenu" v-show="showContext" class="context">
        <b-list-group>
          <b-list-group-item href="#" class="m-row" v-on:click="stop" v-bind:disabled="!isPlay">{{ $t('message.contextMenu.pause') }}</b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="start" v-bind:disabled="!isPause">{{ $t('message.contextMenu.resume') }}</b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="startNow" >{{ $t('message.contextMenu.resumeNow') }}</b-list-group-item>
          <b-list-group-item class="m-divider"></b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="toTop">{{ $t('message.contextMenu.moveTop') }}</b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="up">{{ $t('message.contextMenu.moveUp') }}</b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="down">{{ $t('message.contextMenu.moveDown') }}</b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="toBottom">{{ $t('message.contextMenu.moveBottom') }}</b-list-group-item>
          <b-list-group-item class="m-divider"></b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="remove(false)">{{ $t('message.contextMenu.remove') }}</b-list-group-item>
          <b-list-group-item href="#" class="m-row" v-on:click="remove(true)">{{ $t('message.contextMenu.trash') }}</b-list-group-item>
          <b-list-group-item class="m-divider"></b-list-group-item>
          <b-list-group-item v-on:click="verify" href="#" class="m-row">{{ $t('message.contextMenu.verify') }}</b-list-group-item>
          <b-list-group-item v-b-modal.location-torrent-modal href="#" class="m-row">{{ $t('message.contextMenu.location') }}</b-list-group-item>
          <b-list-group-item v-b-modal.rename-torrent-modal v-bind:disabled="!isRename" href="#" class="m-row">{{ $t('message.contextMenu.rename') }}</b-list-group-item>
          <b-list-group-item class="m-divider"></b-list-group-item>
          <b-list-group-item v-on:click="selectAll" href="#" class="m-row">{{ $t('message.contextMenu.selectAll') }}</b-list-group-item>
          <b-list-group-item v-on:click="deselectAll"  href="#" class="last">{{ $t('message.contextMenu.deselectAll') }}</b-list-group-item>
        </b-list-group>
      </div>
    </transition>
  </div>
</template>

<script>
import api from "@/mixins/api.transmission.mixin";
import key from "@/constantes/key.store.const";
import events from "@/constantes/event.const";
import status from "@/constantes/status.const";
import result from "@/mixins/result.mixin";
import bus from "@/config/bus.event";
import { mapGetters } from "vuex";

const LOCATION_MODAL = 'location-torrent-modal';
const RENAME_MODAL = 'rename-torrent-modal';
const PX = 'px';

export default {
  name: "MenuContext",
  mixins: [
    api,
    result,
  ],
  data() {
    return {
      inputDownloadDir: '',
      newName: '',
      showContext: false,
      torrent: null
    }
  },
  computed: {
    ...mapGetters({
      selectedTorrents: key.GET_SELECTED_TORRENTS,
      downloadDir: key.GET_DOWNLOAD_DIR
    }),
    isPlay() {
      return this.torrent === null || (this.torrent.status === status.STATUS_DOWNLOAD || this.torrent.status === status.STATUS_SEED);
    },
    isPause() {
      return this.torrent === null || (this.torrent.status === status.STATUS_STOPPED);
    },
    isRename() {
      return this.selectedTorrents.length === 1;
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
    submitRename() {
      this.setRename(this.selectedTorrents[0], this.newName)
          .then((response) => {
            this.success(response);
            this.$bvModal.hide(RENAME_MODAL);
          })
          .catch(this.fail);
    },
    submitLocation() {
      const down = (this.inputDownloadDir !== '' && this.inputDownloadDir !== null && this.inputDownloadDir !== undefined)
          ? this.inputDownloadDir
          : (this.selectedTorrents.length === 1) ? this.selectedTorrents[0].downloadDir :this.downloadDir;

     this.api_config.setLocation(this.selectedTorrents, down)
      .then((response) => {
        this.success(response);
        this.$bvModal.hide(LOCATION_MODAL);
      })
      .catch(this.fail);
    },
    openContextMenu(event, torrent) {
      if (this.selectedTorrents.length < 2 || !this.selectedTorrents.map(torr => torr.id).includes(torrent.id)) {
        bus.$emit(events.SELECTED, [torrent]);
        this.torrent = torrent;
        this.newName = torrent.name;
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
      this.api_torrent.startTorrents(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    verify() {
      this.api_torrent.verifyTorrent(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    startNow() {
      this.api_torrent.startTorrentsNow(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    stop() {
      this.api_torrent.stopTorrents(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    remove(trash) {
      this.api_torrent.removeTorrent(this.selectedTorrents, trash)
          .then(this.success)
          .catch(this.error);
    },
    toTop() {
      this.api_queue.moveToTop(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    toBottom() {
      this.api_queue.moveToBottom(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    up() {
      this.api_queue.moveUp(this.selectedTorrents)
          .then(this.success)
          .catch(this.error);
    },
    down() {
      this.api_queue.moveDown(this.selectedTorrents)
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
div >>> .model-rename {
  margin-top: 5%;
}

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