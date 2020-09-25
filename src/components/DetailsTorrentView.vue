<template>
  <div class="px-3 py-2">
    <b-tabs content-class="mt-3" fill>
      <b-tab id="info" active>
        <template v-slot:title>
          <b-icon icon="info-circle-fill"></b-icon>
        </template>
        <info-details-torrent-view v-bind:showPanel="showPanel"></info-details-torrent-view>
      </b-tab>
      <b-tab id="peers">
        <template v-slot:title>
          <b-icon icon="people-fill"></b-icon>
        </template>
       <peers-details-torrent-view v-bind:refresh="showPanel"></peers-details-torrent-view>
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

export default {
  name: "DetailsTorrentView",
  components: {
    PeersDetailsTorrentView,
    InfoDetailsTorrentView
  },
  props: {
    showPanel: Boolean,
    torrent: {
      id: String,
      name: String,
    }
  }
}
</script>

<style scoped>
div >>> .nav-link {
  color: lightslategrey;
  display: block;
  padding: 0.5rem 1rem;
}
</style>