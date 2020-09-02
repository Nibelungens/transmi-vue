<template>
  <div>
    <div v-for="torrent in torrents" v-bind:key="torrent.id">
      <torrent-view v-bind:torrent="torrent" v-on:selected="addSelection" v-on:double-click="showPanel(torrent.id)"></torrent-view>
    </div>
    <b-sidebar id="details-torrent" right v-bind:visible="isPanelShow" sidebar-class="style-panel" v-on:hidden="closePanel" >
      <div class="px-3 py-2">
        <p>{{ idPanelShow }}</p>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import TorrentView from "@/components/TorrentView";
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";

export default {
  name: 'ListTorrentsView',
  components: {
    TorrentView
  },
  mixins: [
    TransmissionApiMixin
  ],
  data: function() {
    return {
      isPanelShow: false,
      idPanelShow: null
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
      this.idPanelShow = null;
      this.isPanelShow = false;
    },
    showPanel(id) {
      if (this.idPanelShow === null || this.idPanelShow === id) {
        this.isPanelShow = !this.isPanelShow;
      }
      this.isPanelShow ? this.idPanelShow = id : this.idPanelShow = null;
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
