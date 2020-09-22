<template>
  <header>
    <b-navbar type="dark" variant="dark">
      <b-button-toolbar>
        <b-button-group size="sm" class="mr-1" >
          <b-button :title="$t('message.header.open')" variant="outline-light" disabled>

            <b-icon icon="file-earmark-arrow-up-fill"></b-icon>
          </b-button>
          <b-button :title="$t('message.header.remove')" variant="outline-light" disabled>
            <b-icon icon="slash-circle"></b-icon>
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
import bus from "@/config/event.bus";
import {mapGetters} from "vuex";

export default {
  name: 'header-transmission',
  mixins: [TransmissionApiMixin],
  computed: {
    ...mapGetters({
      allTorrent: 'Torrents/getTorrents',
      selectedTorrent: 'Torrents/getSelectedTorrent'
    }),
    asSelected() {
      return this.selectedTorrent !== undefined &&
          Array.isArray(this.selectedTorrent) &&
          this.selectedTorrent.length > 0;
    },
  },
  methods: {
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
      bus.$emit('notification-success', response.data.result);
      bus.$emit('action');
    },
    fail(error) {
      bus.$emit('notification-fail', error);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
