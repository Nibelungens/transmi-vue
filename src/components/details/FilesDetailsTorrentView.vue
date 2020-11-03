<template>
  <div class="overflow-man files">
    <div class="d-flex flex-row-reverse" >
      <div class="chevron mr-1 mb-2 pointer" v-on:click="collapseAll">
        <b-icon-chevron-double-up v-show="!collapse_all"/>
        <b-icon-chevron-double-down v-show="collapse_all"/>
      </div>
    </div>
    <div v-if="torrents === null" class="info-spin">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <div v-else-if="torrents !== null && torrents.length === 0" class="info-spin">
      {{ $t('message.filter.none') }}
    </div>
    <div v-else v-for="torrent in torrents" :key="torrent.id">
      <path-details-torrent-view :collapse_all="collapse_all" :paths="getPath(torrent)" :torrent_id="torrent.id" class="p-0 m-0"/>
    </div>
  </div>
</template>

<script>
import PathDetailsTorrentView from "@/components/details/path/PathDetailsTorrentView";
import keyStore from "@/constantes/key.store.const";
import api from "@/services/api.transmission.mixin";
import key from "@/constantes/key.store.const";
import event from "@/constantes/event.const";
import result from "@/mixins/result.mixin";
import pathUtils from "@/utils/path.utils";
import { mapGetters } from "vuex";

export default {
  name: "FilesDetailsTorrentView",
  components: {PathDetailsTorrentView},
  mixins: [
    api,
    result
  ],
  computed: {
    ...mapGetters({
      selectedTorrent: keyStore.GET_SELECTED_TORRENTS
    })
  },
  data: function() {
    return {
      collapse_all: false,
      torrents: null,
      allChecked: true
    };
  },
  props: {
    showPanel: Boolean
  },
  watch: {
    showPanel: function () {
      this.refreshFiles();
    }
  },
  created() {
    this.$store.watch(() => this.$store.getters[key.GET_SELECTED_TORRENTS], () => this.refreshFiles(true));
    this.$root.$on(event.REFRESH_FILES, () => this.refreshFiles(false));
  },
  methods: {
    collapseAll() {
      this.collapse_all = !this.collapse_all;
    },

    refreshFiles(withSpin) {
      if (this.showPanel) {
        if (withSpin) this.torrents = null;
        this.api_torrent.getFileTorrent(this.selectedTorrent)
            .then(this.detailSuccess)
            .catch(this.fail);
      }
    },

    getPath(torrent) {
      return pathUtils.toTPath(torrent);
    }
  }
}
</script>

<style scoped>
.chevron {
  font-size: x-small;
  min-width: 15px;
}

.pointer {
  cursor: pointer;
}

.overflow-man {
  overflow-y: scroll;
}

.files {
  font-size: small;
  max-height: 74vh;
  min-height: 74vh;
}

.info-spin{
  margin-left: 48%;
  margin-top: 30%;
}
</style>