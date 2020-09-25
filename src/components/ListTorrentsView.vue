<template>
  <div>
    <div v-for="torrent in torrents" v-bind:key="torrent.id">
      <torrent-view v-bind:torrent="torrent" v-on:selected="addSelection" v-on:double-click="showPanel(torrent)"></torrent-view>
    </div>
    <b-sidebar id="details-torrent" right v-bind:visible="isPanelShow" sidebar-class="style-panel" v-on:hidden="closePanel" >
      <details-torrent-view v-bind:showPanel="isPanelShow"></details-torrent-view>
    </b-sidebar>
  </div>
</template>

<script>
import TorrentView from "@/components/TorrentView";
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import DetailsTorrentView from "@/components/DetailsTorrentView";
import keyStore from "@/constantes/key.store.const";
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
      selectedTorrent: keyStore.GET_SELECTED_TORRENT
    })
  },
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
      this.isPanelShow = false;
    },
    showPanel(torrent) {
      if (this.selectedTorrent === null || this.selectedTorrent.id === torrent.id) {
        this.isPanelShow = !this.isPanelShow;
      }
      this.isPanelShow ? this.$store.commit(keyStore.SELECT, torrent) : this.$store.commit(keyStore.UNSELECT);
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
