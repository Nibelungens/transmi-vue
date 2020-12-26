<template>
  <div>
    <header>
      <b-navbar type="dark" variant="dark">
        <b-button-toolbar>
          <img src="@/assets/logo-31.png" alt="logo"/><h5 class="ml-2 mr-4 pb-0 mb-0 pt-1 font-weight-bold text-light">{{ $t('message.appName') }}</h5>
          <b-button-group size="sm" class="mr-1" >
            <b-button v-b-tooltip.hover :title="$t('message.header.open')" variant="light" v-on:click="openModal">
              <b-icon class="mr-1" icon="file-earmark-arrow-up-fill"></b-icon>{{ $t('message.header.open') }}
            </b-button>
            <b-button id="header-trash" v-b-tooltip.hover v-bind:disabled="!asSelected" v-on:click="removeModal" :title="$t('message.header.remove')" variant="danger">
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
    removeModal() {
      bus.$emit(events.REMOVE_MODAL_ADD_TORRENT, false);
    },
    openModal() {
      bus.$emit(events.OPEN_MODAL_ADD_TORRENT);
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
