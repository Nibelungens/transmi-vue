<template>
  <div class="overflow-man files">
    <div class="d-flex flex-row-reverse" >
      <div class="chevron mr-1 mb-2 pointer" v-on:click="collapseAll">
        <b-icon-chevron-double-up v-show="!collapse_all"/>
        <b-icon-chevron-double-down v-show="collapse_all"/>
      </div>
    </div>
    <div v-if="paths === null" class="info-spin">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <div v-else-if="paths !== null && paths.length === 0" class="info-spin">
      {{ $t('message.filter.none') }}
    </div>
    <div v-else v-for="path in paths" :key="path.id">
      <path-details-torrent-view :collapse_all="collapse_all" :paths="path" :torrent_id="path.id" class="p-0 m-0"/>
    </div>
  </div>
</template>

<script>
import PathDetailsTorrentView from "@/components/details/path/PathDetailsTorrentView";
import keyStore from "@/constantes/key.store.const";
import api from "@/services/api.transmission.mixin";
import interval from "@/mixins/interval.mixin";
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
    result,
    interval
  ],
  computed: {
    ...mapGetters({
      selectedTorrent: keyStore.GET_SELECTED_TORRENTS,
      getSortCol: keyStore.GET_SELECT_SORT_COL,
      getSelectSortReverse: keyStore.GET_SELECT_SORT_REVERSE
    })
  },
  data: function() {
    return {
      collapse_all: false,
      allChecked: true,
      paths: null
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
            .then(this.detailSuccessFile)
            .catch(this.fail);
      }
    },

    detailSuccessFile(response) {
      if (response?.data) {
        const sortedTorrents = common.sortTorrents(response.data.arguments.torrents, this.getSelectSortReverse, this.getSortCol);
        const pathPromise = new Promise(function(resolve) {
          resolve(sortedTorrents.map(pathUtils.toTPath));
        });

        pathPromise
            .then(path => this.paths = path);
      }
    },

    getPath(torrent) {
      return pathUtils.toTPath(torrent);
    },

    refresh() {
      this.refreshFiles(false);
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