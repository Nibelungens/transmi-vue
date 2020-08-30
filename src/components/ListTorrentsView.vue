<template>
  <div>
    <div v-for="torrent in torrents" v-bind:key="torrent.id">
      <torrent-view v-bind:torrent="torrent" v-on:selected="addSelection"></torrent-view>
    </div>
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
  props: {
    torrents: {
      type: Array,
      required: true,
      default: () => []
    },
  },
  methods: {
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

</style>
