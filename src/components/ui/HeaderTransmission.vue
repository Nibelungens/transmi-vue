<template>
  <div>
    <b-modal id="remove-torrent-modal" size="lg" button-size="sm" dialog-class="model-remove">
      <template v-slot:modal-title>
        <b-icon class="mr-3" icon="trash-fill"></b-icon>{{ getTitleRemoveModel() }}
      </template>
      <img src="@/assets/logo.png" alt="logo" width="98" height="98" class="d-inline-block"/>
      <div class="ml-5 d-inline-block w-75 text-center">{{ $t('message.header.removeModal.description') }}</div>
      <template v-slot:modal-footer="{ submit, cancel }">
        <b-button size="sm" variant="success" v-on:click="cancel()" v-text="$t('message.header.removeModal.cancel')"/>
        <b-button size="sm" variant="danger" v-on:click="removeSelected" v-text="$t('message.header.removeModal.remove')"/>
      </template>
    </b-modal>
    <header>
      <b-navbar type="dark" variant="dark">
        <b-button-toolbar>
          <b-button-group size="sm" class="mr-1" >
            <b-button v-b-tooltip.hover :title="$t('message.header.open')" variant="light" v-on:click="openModal">
              <b-icon class="mr-1" icon="file-earmark-arrow-up-fill"></b-icon>{{ $t('message.header.open') }}
            </b-button>
            <b-button v-b-tooltip.hover v-bind:disabled="!asSelected" :title="$t('message.header.remove')" variant="danger" v-b-modal.remove-torrent-modal>
              <b-icon icon="trash-fill"></b-icon>
            </b-button>
            <b-button v-b-tooltip.hover v-bind:disabled="!asSelected" v-on:click="startSelected" :title="$t('message.header.start')"  variant="info">
              <b-icon class="text-dark" icon="arrow-clockwise"></b-icon>
            </b-button>
            <b-button v-b-tooltip.hover v-bind:disabled="!asSelected" v-on:click="stopSelected" :title="$t('message.header.stop')"  variant="info">
              <b-icon class="text-dark" icon="pause-fill"></b-icon>
            </b-button>
            <b-button v-b-tooltip.hover v-on:click="startAll" :title="$t('message.header.startAll')"  variant="primary">
              <b-icon icon="arrow-clockwise"></b-icon>
            </b-button>
            <b-button v-b-tooltip.hover v-on:click="stopAll" :title="$t('message.header.stopAll')"  variant="primary">
              <b-icon icon="pause-fill"></b-icon>
            </b-button>
          </b-button-group>
        </b-button-toolbar>
          <b-button id="btn-panel-details" class="ml-auto" v-on:click="openDetails" size="sm" v-b-tooltip.hover :title="$t('message.header.openDetails')"  variant="light">
            <b-icon icon="arrow-bar-left" v-show="!detailPanel"></b-icon>
            <b-icon icon="arrow-bar-right" v-show="detailPanel"></b-icon>
          </b-button>
      </b-navbar>
    </header>
  </div>
</template>

<script>
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import keyStore from "@/constantes/key.store.const";
import events from "@/constantes/key.event.const";
import bus from "@/config/bus.event";
import {mapGetters} from "vuex";
import ResultMixin from "@/mixins/result.mixin";

const REMOVE_TORRENT_MODAL = 'remove-torrent-modal';

export default {
  name: 'header-transmission',
  mixins: [
    TransmissionApiMixin,
    ResultMixin
  ],
  computed: {
    ...mapGetters({
      allTorrent: keyStore.GET_TORRENT,
      selectedTorrent: keyStore.GET_SELECTED_TORRENTS,
      detailPanel: keyStore.GET_DETAILS_PANEL
    }),
    asSelected() {
      return this.selectedTorrent !== undefined &&
          Array.isArray(this.selectedTorrent) &&
          this.selectedTorrent.length > 0;
    },
  },
  methods: {
    openDetails() {
      bus.$emit(events.SWITCH_PANEL);
    },
    getTitleRemoveModel() {
      let title = '';

      this.selectedTorrent.length === 1
        ? title = this.$t('message.header.removeModal.titleOne', [this.selectedTorrent[0].name])
        : title = this.$t('message.header.removeModal.titleMany', [this.selectedTorrent.length]);

      return title.length > 60
        ? title.substring(0, 57).concat("...")
        : title;
    },
    openModal() {
      bus.$emit(events.OPEN_ADD_MODEL);
    },
    removeSelected() {
      this.removeTorrent(this.selectedTorrent, false)
          .then(this.success)
          .catch(this.fail);
      this.$bvModal.hide(REMOVE_TORRENT_MODAL);
    },
    startSelected() {
      this.startTorrents(this.selectedTorrent)
          .then(this.success)
          .catch(this.fail);
    },
    stopSelected() {
      this.stopTorrents(this.selectedTorrent)
          .then(this.success)
          .catch(this.fail);
    },
    startAll() {
      this.startTorrents(this.allTorrent)
          .then(this.success)
          .catch(this.fail);
    },
    stopAll() {
      this.stopTorrents(this.allTorrent)
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
