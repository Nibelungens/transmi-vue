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
import bus from "@/config/bus.event";

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
    torrents: keyStore.GET_TORRENT,
    getSortCol: keyStore.GET_SELECT_SORT_COL,
    getSelectSortReverse: keyStore.GET_SELECT_SORT_REVERSE
  })
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
    compare(a, b, col) {
      if (a[col] > b[col]) return 1;
      if (b[col] > a[col]) return -1;

      return 0;
    },
    getSortedTorrents() {
      let array = [...this.torrents].sort((a, b) => this.compare(a, b, this.getSortCol));

      if (this.getSelectSortReverse) {
        array = array.reverse();
      }

      return array;
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
