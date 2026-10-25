<template>
  <div>
    <div id="list-torrent" v-for="torrent in torrents" v-bind:key="torrent.id">
      <torrent-view v-bind:torrent="torrent"></torrent-view>
    </div>
    <b-offcanvas id="details-torrent" v-model="isPanelShow" placement="end" no-header aria-label="Torrent details" class="style-panel force-index" v-on:hidden="closePanel">
      <details-torrent-view v-bind:showPanel="isPanelShow"></details-torrent-view>
    </b-offcanvas>
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
import { eventPathContainsId } from "@/utils/event.utils";
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
    document.addEventListener('mouseup', this.deselectAll);
  },
  beforeUnmount() {
    bus.$off(events.SWITCH_INSPECTOR_PANEL, this.switchPanel);
    document.removeEventListener('mouseup', this.deselectAll);
  },
  methods: {
    closePanel() {
      this.$store.commit(key.SET_DETAILS_PANEL, false);
    },
    deselectAll(event) {
      if (!['list-torrent', 'btn-panel-details', 'header-trash', 'header-start', 'header-pause', 'interval-select', 'details-panel']
          .some(id => eventPathContainsId(event, id))) {
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
:deep(.style-panel) {
  width: 30%;
  bottom: 47px;
  top: 47px;
}
</style>
