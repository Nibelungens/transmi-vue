<template>
  <div class="px-3 py-2" id="details-panel">
    <div class="d-inline-block text-truncate info-title" v-text="title()"/>
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
        <trackers-details-torrent-view v-bind:showPanel="showPanel && (tabIndex === 2)"></trackers-details-torrent-view>
      </b-tab>
      <b-tab id="file">
        <template v-slot:title>
          <b-icon icon="files"></b-icon>
        </template>
        <files-details-torrent-view v-bind:showPanel="showPanel && (tabIndex === 3)"></files-details-torrent-view>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import InfoDetailsTorrentView from "@/components/details/InfoDetailsTorrentView";
import PeersDetailsTorrentView from "@/components/details/PeersDetailsTorrentView";
import key from "@/constantes/key.store.const";
import { mapGetters } from "vuex";
import TrackersDetailsTorrentView from "@/components/details/TrackersDetailsTorrentView";
import FilesDetailsTorrentView from "@/components/details/FilesDetailsTorrentView";

export default {
  name: "DetailsTorrentView",
  components: {
    FilesDetailsTorrentView,
    TrackersDetailsTorrentView,
    PeersDetailsTorrentView,
    InfoDetailsTorrentView
  },
  computed: {
    ...mapGetters({
      selectedTorrents: key.GET_SELECTED_TORRENTS
    }),
  },
  data() {
    return {
      tabIndex: 0
    }
  },
  props: {
    showPanel: Boolean
  },
  methods: {
    title() {
      if (this.selectedTorrents.length === 1) {
        return this.selectedTorrents[0].name;
      } else if (this.selectedTorrents.length > 1) {
        return this.$t('message.details.titleMany', [this.selectedTorrents.length])
      } else {
        return this.$t('message.filter.none')
      }
    }
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