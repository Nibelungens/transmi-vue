<script setup lang="ts">
import {Emitter} from "mitt";
import {useStore} from "vuex";
import {computed, inject, onMounted} from "vue";
import UiHeader from "./components/ui/UiHeader.vue";
import UiFooter from "./components/ui/UiFooter.vue";
import ListTorrentsView from "./components/ListTorrentsView.vue";
import {key as busKey, refreshTorrents} from "./config/event-bus.config";
import {
  ApiTransmissionTorrentService,
  key as apiTransmissionTorrentKey
} from "./services/api-transmission-torrent.service";
import Torrent from "./data/torrent.data";

const store = useStore();
const apiTransmissionTorrentService = inject<ApiTransmissionTorrentService>(apiTransmissionTorrentKey);
const emitter = inject<Emitter<any>>(busKey);
const configRefreshInterval = computed<number>(() => store.getters["config/getRefreshInterval"]);

onMounted(() => {
  emitter?.on(refreshTorrents, () => refreshAllTorrents());
  setInterval(() => emitter?.emit(refreshTorrents), configRefreshInterval.value);
})

function setListTorrent(torrents: Array<Torrent>) {
  store.commit('torrents/setListTorrent', torrents)
}

function refreshAllTorrents() {
  apiTransmissionTorrentService?.getAllTorrents()
      .then(response => setListTorrent(response.data.arguments.torrents.map(Torrent.createInstance)))
      .catch(error => console.error(error))
}
</script>

<template>
  <div id="app" ref="app" class="user-select-none">
    <ui-header id="header" ref="header"/>
    <main id="content" ref="content">
      <list-torrents-view/>
    </main>
    <ui-footer id="footer" ref="footer"/>
  </div>
</template>

<style>
#footer {
  z-index: 1;
}

#header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  text-align: center;
  z-index: 1;
}

#content {
  position: fixed;
  top: 47px;
  bottom: 47px;
  width: 100%;
  overflow-y: auto;
  z-index: 1;
}

#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>


