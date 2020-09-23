<template>
  <div>
    <div v-for="torrent in torrents" v-bind:key="torrent.id">
      <torrent-view v-bind:torrent="torrent" v-on:selected="addSelection" v-on:double-click="showPanel(torrent)"></torrent-view>
    </div>
    <b-sidebar id="details-torrent" right v-bind:visible="isPanelShow" sidebar-class="style-panel" v-on:hidden="closePanel" >
      <details-torrent-view v-bind:torrent="torrentPanelShow" v-bind:showPanel="isPanelShow"></details-torrent-view>
    </b-sidebar>
  </div>
</template>

<script>
import TorrentView from "@/components/TorrentView";
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import DetailsTorrentView from "./DetailsTorrentView";

export default {
  name: 'ListTorrentsView',
  components: {
    DetailsTorrentView,
    TorrentView
  },
  mixins: [
    TransmissionApiMixin
  ],
  data: function() {
    return {
      isPanelShow: false,
      torrentPanelShow: null
    };
  },
  props: {
    torrents: {
      type: Array,
      required: true,
      default: () => []
    },
  },
  methods: {
    closePanel() {
      this.torrentPanelShow = null;
      this.isPanelShow = false;
    },
    showPanel(torrent) {
      if (this.torrentPanelShow === null || this.torrentPanelShow === torrent.id) {
        this.isPanelShow = !this.isPanelShow;
      }
      this.isPanelShow ? this.torrentPanelShow = torrent : this.torrentPanelShow = null;
    },
    addSelection(selected, torrent) {
      if (selected) {
        this.$store.commit('Torrents/ADD_SELECTED', torrent);
      } else {
        this.$store.commit('Torrents/REMOVE_SELECTED', torrent);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div >>> .style-panel {
  width: 30%;
  bottom: 47px;
  top: 47px;
}
</style>
