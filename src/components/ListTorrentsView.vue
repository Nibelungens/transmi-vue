<template>
  <div>
    <div v-for="torrent in getSortedTorrents()" v-bind:key="torrent.id">
      <torrent-view v-bind:torrent="torrent"></torrent-view>
    </div>
    <b-sidebar id="details-torrent" right v-bind:visible="isPanelShow" sidebar-class="style-panel" class="test">
      <details-torrent-view v-bind:showPanel="isPanelShow"></details-torrent-view>
    </b-sidebar>
  </div>
</template>

<script>
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import DetailsTorrentView from "@/components/DetailsTorrentView";
import keyStore from "@/constantes/key.store.const";
import TorrentView from "@/components/TorrentView";
import {mapGetters} from "vuex";
import events from "@/constantes/key.event.const";
import bus from "@/config/event.bus";

export default {
  name: 'ListTorrentsView',
  components: {
    DetailsTorrentView,
    TorrentView
  },
  mixins: [
    TransmissionApiMixin
  ],
  computed: {
  ...mapGetters({torrents: keyStore.GET_TORRENT})
  },
  data: function() {
    return {
      isPanelShow: false
    };
  },
  mounted() {
    bus.$on(events.SWITCH_PANEL, this.switchPanel);
  },
  methods: {
    switchPanel() {
      this.isPanelShow = !this.isPanelShow;
    },
    compareName(a, b) {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;

      return 0;
    },
    getSortedTorrents() {
      return [...this.torrents].sort(this.compareName);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test {
  z-index: 1 !important;
}
div >>> .style-panel {
  width: 30%;
  bottom: 47px;
  top: 47px;
}
</style>
