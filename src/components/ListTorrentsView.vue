<template>
  <div>
    <div id="list-torrent" v-for="torrent in torrents" v-bind:key="torrent.id">
      <torrent-view v-bind:torrent="torrent"></torrent-view>
    </div>
    <b-sidebar id="details-torrent" right v-bind:visible="isPanelShow" sidebar-class="style-panel" class="force-index" v-on:hidden="closePanel">
      <details-torrent-view v-bind:showPanel="isPanelShow"></details-torrent-view>
    </b-sidebar>
    <menu-context></menu-context>
  </div>
</template>

<script>
import DetailsTorrentView from "@/components/DetailsTorrentView";
import TorrentView from "@/components/TorrentView";
import MenuContext from "@/components/MenuContext";
import events from "@/constantes/event.const";
import key from "@/constantes/key.store.const";
import bus from "@/config/bus.event";
import { mapGetters } from "vuex";

export default {
  name: 'ListTorrentsView',
  components: {
    DetailsTorrentView,
    MenuContext,
    TorrentView
  },
  computed: {
    ...mapGetters({
      torrents: key.GET_TORRENT
    })
  },
  data: function() {
    return {
      isPanelShow: false
    };
  },
  mounted() {
    bus.$on(events.SWITCH_INSPECTOR_PANEL, this.switchPanel);
    this.$root.$el.addEventListener('mouseup', this.deselectAll);
  },
  methods: {
    closePanel() {
      this.$store.commit(key.SET_DETAILS_PANEL, false);
    },
    deselectAll(event) {
      if (!event.path.map(element => element.id).includes('list-torrent') &&
          !event.path.map(element => element.id).includes('btn-panel-details') &&
          !event.path.map(element => element.id).includes('header-trash') &&
          !event.path.map(element => element.id).includes('header-start') &&
          !event.path.map(element => element.id).includes('header-pause') &&
          !event.path.map(element => element.id).includes('interval-select') &&
          !event.path.map(element => element.id).includes('details-panel')) {
        bus.$emit(events.UNSELECTED_ALL_TORRENT, event);
      }
    },
    switchPanel() {
      this.isPanelShow = !this.isPanelShow;
      this.$store.commit(key.SET_DETAILS_PANEL, this.isPanelShow);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.force-index {
  z-index: 1 !important;
}
div >>> .style-panel {
  width: 30%;
  bottom: 47px;
  top: 47px;
}
</style>
