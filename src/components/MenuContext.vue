<template>
  <transition name="fade">
    <div ref="contextMenu" v-show="showContext" class="context user-select-none">
      <b-list-group>
        <b-list-group-item href="#" class="m-row" v-on:click="stop()" v-bind:disabled="!isPlay">{{ $t('message.torrent.contextMenu.pause') }}</b-list-group-item>
        <b-list-group-item href="#" class="m-row" v-on:click="start()" v-bind:disabled="!isPause">{{ $t('message.torrent.contextMenu.resume') }}</b-list-group-item>
        <b-list-group-item href="#" class="m-row">{{ $t('message.torrent.contextMenu.resumeNow') }}</b-list-group-item>
        <b-list-group-item class="m-divider"></b-list-group-item>
        <b-list-group-item disabled href="#" class="m-row">{{ $t('message.torrent.contextMenu.moveTop') }}</b-list-group-item>
        <b-list-group-item disabled href="#" class="m-row">{{ $t('message.torrent.contextMenu.moveUp') }}</b-list-group-item>
        <b-list-group-item disabled href="#" class="m-row">{{ $t('message.torrent.contextMenu.moveDown') }}</b-list-group-item>
        <b-list-group-item disabled href="#" class="m-row">{{ $t('message.torrent.contextMenu.moveBottom') }}</b-list-group-item>
        <b-list-group-item class="m-divider"></b-list-group-item>
        <b-list-group-item href="#" class="m-row" v-on:click="remove(false)">{{ $t('message.torrent.contextMenu.remove') }}</b-list-group-item>
        <b-list-group-item href="#" class="m-row" v-on:click="remove(true)">{{ $t('message.torrent.contextMenu.trash') }}</b-list-group-item>
        <b-list-group-item class="m-divider"></b-list-group-item>
        <b-list-group-item disabled href="#" class="m-row">{{ $t('message.torrent.contextMenu.verify') }}</b-list-group-item>
        <b-list-group-item disabled href="#" class="m-row">{{ $t('message.torrent.contextMenu.location') }}</b-list-group-item>
        <b-list-group-item disabled href="#" class="m-row">{{ $t('message.torrent.contextMenu.rename') }}</b-list-group-item>
        <b-list-group-item class="m-divider"></b-list-group-item>
        <b-list-group-item disabled href="#" class="m-row">{{ $t('message.torrent.contextMenu.selectAll') }}</b-list-group-item>
        <b-list-group-item disabled href="#" class="last">{{ $t('message.torrent.contextMenu.deselectAll') }}</b-list-group-item>
      </b-list-group>
    </div>
  </transition>
</template>

<script>
import bus from "@/config/event.bus";
import events from "@/constantes/key.event.const";
import Status from "@/constantes/status.const";
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import {mapGetters} from "vuex";
import keyStore from "@/constantes/key.store.const";
import ResultMixin from "@/mixins/result.mixin";

const PX = 'px';

export default {
  name: "MenuContext",
  mixins: [
    TransmissionApiMixin,
    ResultMixin,
  ],
  data() {
    return {
      showContext: false
    }
  },
  props: {
    torrent: {
      id: Number,
      status: Number
    }
  },
  computed: {
    ...mapGetters({
      selectedTorrents: keyStore.GET_SELECTED_TORRENTS
    }),
    isPlay() {
      return this.torrent.status === Status.STATUS_DOWNLOAD || this.torrent.status === Status.STATUS_SEED;
    },
    isPause() {
      return this.torrent.status === Status.STATUS_STOPPED;
    }
  },
  mounted() {
    bus.$on(events.CLOSE_ALL_CONTEXT, this.onCloseOtherContextMenu);
    bus.$on(events.OPEN_CONTEXT, this.openContextMenu);
  },
  methods: {
    onCloseOtherContextMenu(torrent) {
      if (torrent !== null && torrent !== undefined) {
        this.showContext = (this.torrent.id === torrent.id);
      } else {
        this.showContext = false;
      }
    },
    openContextMenu(event, torrent) {
      if (torrent.id === this.torrent.id) {
        this.showContext = true;
        let y = event.clientY;
        let x = event.clientX;
        const maxY = (this.$root.$children[0].$refs.content.clientHeight - 370);
        const maxX = (this.$root.$children[0].$refs.content.clientWidth - 240);
        y = (y >= maxY) ? maxY: y;
        x = (x >= maxX) ? maxX: x;

        console.log(y);
        console.log(this.$root.$refs.content)

        this.$refs.contextMenu.style.left = x
            .toString().concat(PX);
        this.$refs.contextMenu.style.top = y
            .toString().concat(PX);
        bus.$emit(events.CLOSE_ALL_CONTEXT, this.torrent);
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
    remove(trash) {
      this.removeTorrent(this.torrent, trash)
          .then(this.success)
          .catch(this.error);
    }
  }
}
</script>

<style scoped>
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