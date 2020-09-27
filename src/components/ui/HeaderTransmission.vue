<template>
  <header>
    <b-navbar type="dark" variant="dark">
      <b-button-toolbar>
        <b-button-group size="sm" class="mr-1" >
          <b-button :title="$t('message.header.open')" variant="outline-light" disabled>
            <b-icon icon="file-earmark-arrow-up-fill"></b-icon>
          </b-button>
          <b-button v-bind:disabled="!asSelected" v-on:click="removeSelected()" :title="$t('message.header.remove')" variant="outline-light">
            <b-icon icon="slash-circle" class="text-danger"></b-icon>
          </b-button>
          <b-button v-bind:disabled="!asSelected" v-on:click="startSelected()" :title="$t('message.header.start')"  variant="outline-light">
            <b-icon icon="arrow-clockwise" ></b-icon>
          </b-button>
          <b-button v-bind:disabled="!asSelected" v-on:click="stopSelected()" :title="$t('message.header.stop')"  variant="outline-light">
            <b-icon icon="pause-fill"></b-icon>
          </b-button>
          <b-button v-on:click="startAll()" :title="$t('message.header.startAll')"  variant="outline-light">
            <b-icon icon="arrow-clockwise"></b-icon>
          </b-button>
          <b-button v-on:click="stopAll()" :title="$t('message.header.stopAll')"  variant="outline-light">
            <b-icon icon="pause-fill"></b-icon>
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
    },
    success(response) {
      bus.$emit(events.NOTIFICATION_SUCCESS, response.data.result);
      bus.$emit(events.ACTION);
    },
    fail(error) {
      bus.$emit(events.NOTIFICATION_FAIL, error);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
