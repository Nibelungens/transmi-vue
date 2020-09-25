<template>
  <div class="px-3 py-2">
    <div class="d-inline-block text-truncate info-title">{{ (selectedTorrent != null) ? selectedTorrent.name : $t('message.filter.none') }}</div>
    <b-tabs v-model="tabIndex" content-class="mt-3" fill>
      <b-tab id="info" active>
        <template v-slot:title>
          <b-icon icon="info-circle-fill"></b-icon>
        </template>
        <info-details-torrent-view v-bind:showPanel="showPanel && (tabIndex === 0)"></info-details-torrent-view>
      </b-tab>
      <b-tab id="peers">
        <template v-slot:title>
          <b-icon icon="people-fill"></b-icon>
        </template>
       <peers-details-torrent-view v-bind:showPanel="showPanel && (tabIndex === 1)"></peers-details-torrent-view>
      </b-tab>
      <b-tab id="trackers">
        <template v-slot:title>
          <b-icon icon="globe"></b-icon>
        </template>
      </b-tab>
      <b-tab id="file">
        <template v-slot:title>
          <b-icon icon="files"></b-icon>
        </template>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import InfoDetailsTorrentView from "@/components/details/InfoDetailsTorrentView";
import PeersDetailsTorrentView from "@/components/details/PeersDetailsTorrentView";
import {mapGetters} from "vuex";
import keyStore from "@/constantes/key.store.const";

export default {
  name: "DetailsTorrentView",
  components: {
    PeersDetailsTorrentView,
    InfoDetailsTorrentView
  },
  computed: {
    ...mapGetters({
      selectedTorrent: keyStore.GET_SELECTED_TORRENT
    }),

  },
  data() {
    return {
      tabIndex: 0
    }
  },
  props: {
    showPanel: Boolean
  }
}
</script>

<style scoped>
.info-title {
  font-size: larger;
  font-weight: bold;
  max-width: 520px;
  margin-left: 10px;
}

div >>> .nav-link {
  color: lightslategrey;
  display: block;
  padding: 0.5rem 1rem;
}
</style>