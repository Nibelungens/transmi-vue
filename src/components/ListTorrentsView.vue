<script setup lang="ts">
import {computed} from "vue";
import {useStore} from "vuex";
import Torrent from "../data/torrent.data";
import TorrentView from "./TorrentView.vue";

const torrents = computed<Array<Torrent>>(() => useStore().getters["torrents/getTorrents"]);

</script>

<template>
  <div>
    <div v-for="torrent in torrents" v-if="!!torrents">
      <torrent-view :torrent="torrent"/>
    </div>
  </div>
</template>

<style scoped>
</style>
