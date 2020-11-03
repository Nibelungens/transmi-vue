<template>
  <div class="overflow-man trackers">
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
      <div class="d-flex bd-highlight" v-bind:class="{ 'pointer': trackerEmpty(torrent) }" v-on:click="collapse(torrent)">
        <div class="pb-1 w-100 bd-highlight font-weight-bold">{{ torrent.name }}</div>
        <div class="bd-highlight text-right d-flex">
          <div class="chevron mr-2">
            <b-icon-chevron-up v-show="isVisible(torrent) && trackerEmpty(torrent)"/>
            <b-icon-chevron-down v-show="!isVisible(torrent) && trackerEmpty(torrent)"/>
          </div>
        </div>
      </div>
      <b-collapse :id="getId(torrent)" :visible="!collapse_all" v-on:hide="setVisible(torrent)" v-on:show="setVisible(torrent)">
        <ul class="px-0 mx-0">
          <li v-for="tracker in torrent.trackerStats" :key="tracker.id" class="d-flex flex-column py-1 px-2" v-bind:class="{'alt': tracker.id % 2 !== 0}">
            <b-badge class="w-25 py-1" variant="primary">Tier {{ tracker.id+1 }}</b-badge>
            <div class="host pb-1">{{ tracker.host }}</div>
            <div class="d-flex">
              <div class="mr-auto d-flex flex-column w-75">
                <div class="text-truncate" :title="tracker | trackersLastAnnounce($i18n)">{{ tracker | trackersLastAnnounce($i18n) }}</div>
                <div class="text-truncate" :title="tracker | trackersState($i18n)">{{ tracker | trackersState($i18n) }}</div>
                <div class="text-truncate" :title="tracker | trackersLastScraps($i18n)">{{ tracker | trackersLastScraps($i18n) }}</div>
              </div>
              <div class="ml-auto d-flex flex-column w-25 pl-2">
                <div class="ml-4">
                  <span class="font-weight-bold">{{ $t('message.details.tracker.seeders') }}:</span> {{ (tracker.seederCount !== -1)? tracker.seederCount: $t('message.details.tracker.none')}}
                </div>
                <div class="ml-4">
                  <span class="font-weight-bold">{{ $t('message.details.tracker.leechers') }}:</span> {{ (tracker.leecherCount !== -1)? tracker.leecherCount: $t('message.details.tracker.none') }}
                </div>
                <div class="ml-4">
                  <span class="font-weight-bold">{{ $t('message.details.tracker.downloads') }}:</span> {{ (tracker.downloadCount !== -1)? tracker.downloadCount: $t('message.details.tracker.none') }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import api from "@/services/api.transmission.mixin";
import key from "@/constantes/key.store.const";
import interval from "@/mixins/interval.mixin";
import filterSize from "@/filters/size.filter";
import { mapGetters } from "vuex";
import keyStore from "@/constantes/key.store.const";
import result from "@/mixins/result.mixin";

export default {
  name: "TrackersDetailsTorrentView",
  mixins: [
    api,
    interval,
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
      id_close: []
    };
  },
  props: {
    showPanel: Boolean
  },
  created() {
    this.$store.watch(() => this.$store.getters[key.GET_SELECTED_TORRENTS], this.refreshTrackers);
  },
  methods: {
    collapseAll() {
      this.collapse_all = !this.collapse_all;
      if (this.torrents != null ) {
        for (const torrent of this.torrents) {
          this.$root.$emit('bv::toggle::collapse', this.getId(torrent));
        }
      }
    },
    trackerEmpty(torrent) {
      return torrent.trackerStats != null && torrent.trackerStats.length > 0;
    },
    isVisible(torrent) {
      return !this.id_close.includes(torrent.id);
    },
    setVisible(torrent) {
      const index = this.id_close.findIndex((id) => id === torrent.id);

      if(index === -1) {
        this.id_close.push(torrent.id);
      } else {
        this.id_close.splice(index, 1);
      }
    },
    collapse(torrent) {
      this.$root.$emit('bv::toggle::collapse', this.getId(torrent));
    },
    getId(torrent) {
      return 'collapse-tracker-' + torrent.id;
    },
    returnSize(rate) {
      if (rate === 0) {
        return this.$t('message.filter.none');
      } else {
        return filterSize(rate)+'/s';
      }
    },
    refresh() {
      if (this.showPanel) {
        this.api_torrent.getTrackerTorrent(this.selectedTorrent)
            .then(this.detailSuccess)
            .catch(this.error)
      }
    },
    refreshTrackers() {
      if (this.showPanel) {
        this.torrents = null;
        this.api_torrent.getTrackerTorrent(this.selectedTorrent)
            .then(this.detailSuccess)
            .catch(this.fail);
      }
    },
    detailSuccess(response) {
      if (response != null && response.data !== null) {
        this.torrents = response.data.arguments.torrents;
      }
    }
  }
}
</script>

<style scoped>
.alt {
  background-color: lightgrey;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.host {
  font-weight: bold;
  font-size: small;
  color: black;
}

.overflow-man {
  overflow-y: scroll;
}

.pointer {
  cursor: pointer;
}

.chevron {
  min-width: 15px;
}

.trackers {
  font-size: x-small;
  max-height: 74vh;
  min-height: 74vh;
}

.info-spin{
  margin-left: 48%;
  margin-top: 30%;
}
</style>