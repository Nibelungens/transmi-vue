<template>
  <div>
    <div v-for="torrent in getSortedTorrents()" v-bind:key="torrent.id">
      <torrent-view v-bind:torrent="torrent" v-on:selected="addSelection" v-on:double_click="showPanel(torrent)" v-on:close_panel="closePanel()"></torrent-view>
    </div>
    <b-sidebar id="details-torrent" right v-bind:visible="isPanelShow" sidebar-class="style-panel" v-on:hidden="closePanel" >
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
  ...mapGetters({
      selectedTorrent: keyStore.GET_SELECTED_TORRENT,
      torrents: keyStore.GET_TORRENT
    })
  },
  data: function() {
    return {
      isPanelShow: false,
      torrentPanelShow: null
    };
  },
  methods: {
    compareName(a, b) {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;

      return 0;
    },
    getSortedTorrents() {
      return [...this.torrents].sort(this.compareName);
    },
    closePanel() {
      this.isPanelShow = false;
    },
    showPanel(torrent) {
      this.isPanelShow = true;
      this.$store.commit(keyStore.SELECT, torrent);
    },
    addSelection(selected, torrent) {
      if (selected) {
        this.$store.commit(keyStore.ADD_SELECTED, torrent);
      } else {
        this.$store.commit(keyStore.REMOVE_SELECTED, torrent);
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
