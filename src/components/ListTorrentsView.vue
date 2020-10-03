<template>
  <div>
    <div id="list-torrent" v-for="torrent in torrents" v-bind:key="torrent.id">
      <torrent-view v-bind:torrent="torrent"></torrent-view>
    </div>
    <b-sidebar id="details-torrent" right v-bind:visible="isPanelShow" sidebar-class="style-panel" class="test" v-on:hidden="closePanel">
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
      torrents: keyStore.GET_TORRENT
    })
  },
  data: function() {
    return {
      isPanelShow: false
    };
  },
  mounted() {
    bus.$on(events.SWITCH_PANEL, this.switchPanel);
    this.$root.$el.addEventListener('mouseup', this.deselectAll);
  },
  methods: {
    closePanel() {
      this.$store.commit(keyStore.SET_DETAILS_PANEL, false);
    },
    deselectAll(event) {
      if (!event.path.map(element => element.id).includes('list-torrent') &&
          !event.path.map(element => element.id).includes('btn-panel-details') &&
          !event.path.map(element => element.id).includes('details-panel')) {
        this.$store.commit(keyStore.UNSELECTED);
        bus.$emit(events.UNSELECTED);
      }
    },
    switchPanel() {
      this.isPanelShow = !this.isPanelShow;
      this.$store.commit(keyStore.SET_DETAILS_PANEL, this.isPanelShow);
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
