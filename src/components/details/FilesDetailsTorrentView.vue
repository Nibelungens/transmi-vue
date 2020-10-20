<template>
  <div class="overflow-man files">
    <div v-if="torrents === null" class="info-spin">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <div v-else-if="torrents !== null && torrents.length === 0" class="info-spin">
      {{ $t('message.filter.none') }}
    </div>
    <div v-else v-for="torrent in sortTorrents(torrents)" :key="torrent.id">
      <path-details-torrent-view :paths="getPath(torrent)" :torrent_id="torrent.id" class="p-0"/>
    </div>
  </div>
</template>

<script>
import PathDetailsTorrentView from "@/components/details/path/PathDetailsTorrentView";
import keyStore from "@/constantes/key.store.const";
import api from "@/mixins/api.transmission.mixin";
import key from "@/constantes/key.store.const";
import event from "@/constantes/event.const";
import result from "@/mixins/result.mixin";
import pathUtils from "@/utils/path.utils";
import common from "@/utils/common.utils";
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
      getSortCol: keyStore.GET_SELECT_SORT_COL,
      selectedTorrent: key.GET_SELECTED_TORRENTS,
      getSelectSortReverse: keyStore.GET_SELECT_SORT_REVERSE
    })
  },
  data: function() {
    return {
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
    refreshFiles(withSpin) {
      if (this.showPanel) {
        if (withSpin) this.torrents = null;
        this.api_torrent.getFileTorrent(this.selectedTorrent)
            .then(this.detailSuccess)
            .catch(this.fail);
      }
    },


    sortTorrents(torrents) {
      return common.sortTorrents(torrents, this.getSelectSortReverse, this.getSortCol);
    },

    getPath(torrent) {
      return pathUtils.toTPath(torrent);
    }
  }
}
</script>

<style scoped>
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