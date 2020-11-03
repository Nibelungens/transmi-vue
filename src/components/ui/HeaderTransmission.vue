<template>
  <div>
    <b-modal id="remove-torrent-modal" button-size="sm" dialog-class="model-remove user-select-none" title-class="text-truncate">
      <template v-slot:modal-title>
        <b-icon class="mr-3" icon="trash-fill"/>{{ $tc('message.header.removeModal.title', selectedTorrent.length, [selectedTorrent[0].name, selectedTorrent.length]) }}
      </template>
      <img src="@/assets/logo-96.png" alt="logo" class="d-inline-flex"/>
      <div class="d-inline-flex w-75 text-center align-middle">{{ $t('message.header.removeModal.description') }}</div>
      <template v-slot:modal-footer="{ submit, cancel }">
        <b-button size="sm" variant="success" v-on:click="cancel()" v-text="$t('message.header.removeModal.cancel')"/>
        <b-button size="sm" variant="danger" v-on:click="removeSelected" v-text="$t('message.header.removeModal.remove')"/>
      </template>
    </b-modal>
    <header>
      <b-navbar type="dark" variant="dark">
        <b-button-toolbar>
          <img src="@/assets/logo-31.png" alt="logo"/><h5 class="ml-2 mr-4 pb-0 mb-0 pt-1 font-weight-bold text-light">{{ $t('message.appName') }}</h5>
          <b-button-group size="sm" class="mr-1" >
            <b-button v-b-tooltip.hover :title="$t('message.header.open')" variant="light" v-on:click="openModal">
              <b-icon class="mr-1" icon="file-earmark-arrow-up-fill"></b-icon>{{ $t('message.header.open') }}
            </b-button>
            <b-button id="header-trash" v-b-tooltip.hover v-bind:disabled="!asSelected" :title="$t('message.header.remove')" variant="danger" v-b-modal.remove-torrent-modal>
              <b-icon icon="trash-fill"></b-icon>
            </b-button>
            <b-button id="header-start" v-b-tooltip.hover v-bind:disabled="!asSelected" v-on:click="startSelected" :title="$t('message.header.start')"  variant="primary">
              <b-icon icon="arrow-clockwise"></b-icon>
            </b-button>
            <b-button id="header-pause" v-b-tooltip.hover v-bind:disabled="!asSelected" v-on:click="stopSelected" :title="$t('message.header.stop')"  variant="primary">
              <b-icon icon="pause-fill"></b-icon>
            </b-button>
            <b-button v-b-tooltip.hover v-on:click="startAll" :title="$t('message.header.startAll')"  variant="primary">
              <b-icon class="text-dark" icon="arrow-clockwise"></b-icon>
            </b-button>
            <b-button v-b-tooltip.hover v-on:click="stopAll" :title="$t('message.header.stopAll')"  variant="primary">
              <b-icon class="text-dark" icon="pause-fill"></b-icon>
            </b-button>
          </b-button-group>
        </b-button-toolbar>
          <b-button id="btn-panel-details" class="ml-auto" v-on:click="openDetails" size="sm" v-b-tooltip.hover :title="$t('message.header.openDetails')"  variant="outline-light">
            <b-icon class="mx-5" icon="arrow-bar-left" v-show="!detailPanel"></b-icon>
            <b-icon class="mx-5" icon="arrow-bar-right" v-show="detailPanel"></b-icon>
          </b-button>
      </b-navbar>
    </header>
  </div>
</template>

<script>
import api from "@/services/api.transmission.mixin";
import events from "@/constantes/event.const";
import key from "@/constantes/key.store.const";
import result from "@/mixins/result.mixin";
import bus from "@/config/bus.event";
import { mapGetters } from "vuex";

const REMOVE_TORRENT_MODAL = 'remove-torrent-modal';

export default {
  name: 'header-transmission',
  mixins: [
    api,
    result
  ],
  computed: {
    ...mapGetters({
      allTorrent: key.GET_TORRENT,
      selectedTorrent: key.GET_SELECTED_TORRENTS,
      detailPanel: key.GET_DETAILS_PANEL
    }),
    asSelected() {
      return this.selectedTorrent !== undefined &&
          Array.isArray(this.selectedTorrent) &&
          this.selectedTorrent.length > 0;
    },
  },
  methods: {
    openDetails() {
      bus.$emit(events.SWITCH_INSPECTOR_PANEL);
    },
    openModal() {
      bus.$emit(events.OPEN_MODAL_ADD_TORRENT);
    },
    removeSelected() {
      this.api_torrent.removeTorrent(this.selectedTorrent, false)
          .then(response => {
            this.success(response)
            this.$store.commit(key.UNSELECTED);
          }).catch(this.fail);
      this.$bvModal.hide(REMOVE_TORRENT_MODAL);
    },
    startSelected() {
      this.api_torrent.startTorrents(this.selectedTorrent)
          .then(this.success)
          .catch(this.fail);
    },
    stopSelected() {
      this.api_torrent.stopTorrents(this.selectedTorrent)
          .then(this.success)
          .catch(this.fail);
    },
    startAll() {
      this.api_torrent.startTorrents(this.allTorrent)
          .then(this.success)
          .catch(this.fail);
    },
    stopAll() {
      this.api_torrent.stopTorrents(this.allTorrent)
          .then(this.success)
          .catch(this.fail);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div >>> .model-remove {
  margin-top: 5%;
}
</style>
