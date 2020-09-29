<template>
  <header>
    <b-navbar type="dark" variant="dark">
      <b-button-toolbar>
        <b-button-group size="sm" class="mr-1" >
          <b-button v-b-tooltip.hover :title="$t('message.header.open')" variant="light" v-on:click="openModal">
            <b-icon class="mr-1" icon="file-earmark-arrow-up-fill"></b-icon>{{ $t('message.header.open') }}
          </b-button>
          <b-button v-b-tooltip.hover v-bind:disabled="!asSelected" v-on:click="removeSelected" :title="$t('message.header.remove')" variant="danger">
            <b-icon class="mr-1" icon="trash-fill"></b-icon>{{ $t('message.header.selected') }}
          </b-button>
          <b-button v-b-tooltip.hover v-bind:disabled="!asSelected" v-on:click="startSelected" :title="$t('message.header.start')"  variant="info">
            <b-icon class="mr-1" icon="arrow-clockwise"></b-icon>{{ $t('message.header.selected') }}
          </b-button>
          <b-button v-b-tooltip.hover v-bind:disabled="!asSelected" v-on:click="stopSelected" :title="$t('message.header.stop')"  variant="info">
            <b-icon class="mr-1" icon="pause-fill"></b-icon>{{ $t('message.header.selected') }}
          </b-button>
          <b-button v-b-tooltip.hover v-on:click="startAll" :title="$t('message.header.startAll')"  variant="primary">
            <b-icon class="mr-1" icon="arrow-clockwise"></b-icon>{{ $t('message.header.all') }}
          </b-button>
          <b-button v-b-tooltip.hover v-on:click="stopAll" :title="$t('message.header.stopAll')"  variant="primary">
            <b-icon class="mr-1" icon="pause-fill"></b-icon>{{ $t('message.header.all') }}
          </b-button>
        </b-button-group>
      </b-button-toolbar>
    </b-navbar>
  </header>
</template>

<script>
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import keyStore from "@/constantes/key.store.const";
import events from "@/constantes/key.event.const";
import bus from "@/config/event.bus";
import {mapGetters} from "vuex";

export default {
  name: 'header-transmission',
  mixins: [TransmissionApiMixin],
  computed: {
    ...mapGetters({
      allTorrent: keyStore.GET_TORRENT,
      selectedTorrent: keyStore.GET_SELECTED_TORRENTS
    }),
    asSelected() {
      return this.selectedTorrent !== undefined &&
          Array.isArray(this.selectedTorrent) &&
          this.selectedTorrent.length > 0;
    },
  },
  methods: {
    openModal() {
      bus.$emit(events.OPEN_ADD_MODEL);
    },
    removeSelected() {
      this.removeTorrent(this.selectedTorrent, false)
          .then(this.success)
          .catch(this.error);
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
.back {
  margin-left: -10px;
}
</style>
