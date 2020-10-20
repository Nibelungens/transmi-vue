<template>
  <div class="overflow-man peers">
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
    <div v-else v-for="torrent in sortTorrents(torrents)" :key="torrent.id">
      <div class="d-flex bd-highlight" v-bind:class="{ 'pointer': peersEmpty(torrent) }" v-on:click="collapse(torrent)">
        <div class="pb-1 w-100 bd-highlight">{{ torrent.name }}</div>
        <div class="bd-highlight text-right d-flex">
          <div>
            <b-badge :variant="getStyleBadge(torrent)" class="px-1">{{ torrent.peers.length }}</b-badge>
          </div>
          <div class="chevron mr-2">
            <b-icon-chevron-up v-show="isVisible(torrent) && peersEmpty(torrent)"/>
            <b-icon-chevron-down v-show="!isVisible(torrent) && peersEmpty(torrent)"/>
          </div>
        </div>
      </div>
        <b-collapse :id="getId(torrent)" :visible="!collapse_all" v-on:hide="setVisible(torrent)" v-on:show="setVisible(torrent)">
        <table class="table table-striped table-sm border" v-if="peersEmpty(torrent)" :aria-describedby="$t('message.details.peers.tableDescriptor')">
          <thead>
          <tr>
            <th scope="col" class="fix-cad"></th>
            <th scope="col">{{ $t('message.details.peers.up')}}</th>
            <th scope="col">{{ $t('message.details.peers.down')}}</th>
            <th scope="col">{{ $t('message.details.peers.percent')}}</th>
            <th scope="col">{{ $t('message.details.peers.status')}}</th>
            <th scope="col">{{ $t('message.details.peers.address')}}</th>
            <th scope="col">{{ $t('message.details.peers.client')}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="peer in torrent.peers" :key="peer.address">
            <td><b-icon v-if="peer.isEncrypted" icon="lock-fill"></b-icon></td>
            <td>{{ returnSize(peer.rateToPeer) }}</td>
            <td>{{ returnSize(peer.rateToClient) }}</td>
            <td>{{ peer.progress * 100 | formatPercent }}%</td>
            <td>{{ peer.flagStr }}</td>
            <td>{{ peer.address }}</td>
            <td>{{ peer.clientName }}</td>
          </tr>
          </tbody>
        </table>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import api from "@/mixins/api.transmission.mixin";
import key from "@/constantes/key.store.const";
import interval from "@/mixins/interval.mixin";
import filterSize from "@/filters/size.filter";
import { mapGetters } from "vuex";
import common from "@/utils/common.utils";
import keyStore from "@/constantes/key.store.const";
import result from "@/mixins/result.mixin";

/**
 * @param {Object} torrents
 * @param {Object} torrents.peers
 * @param {Object} torrents.peer.rateToPeer
 * @param {Object} torrents.peer.rateToClient
 * @param {Object} torrents.peer.progress
 * @param {Object} torrents.peer.flagStr
 * @param {Object} torrents.peer.address
 * @param {Object} torrents.peer.clientName
 */
export default {
  name: "PeersDetailsTorrentView",
  mixins: [
    api,
    interval,
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
      collapse_all: false,
      torrents: null,
      id_close: []
    };
  },
  props: {
    showPanel: Boolean
  },
  created() {
    this.$store.watch(() => this.$store.getters[key.GET_SELECTED_TORRENTS], this.refreshPeers);
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
    peersEmpty(torrent) {
      return torrent.peers != null && torrent.peers.length > 0;
    },
    getStyleBadge(torrent) {
      return torrent.peers.length === 0? 'danger': 'primary';
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
      return 'collapse-peers-' + torrent.id;
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
        this.api_torrent.getPeersTorrent(this.selectedTorrent)
            .then(this.detailSuccess)
            .catch(this.error)
      }
    },
    refreshPeers() {
      if (this.showPanel) {
        this.torrents = null;
        this.api_torrent.getPeersTorrent(this.selectedTorrent)
            .then(this.detailSuccess)
            .catch(this.fail);
      }
    },
    detailSuccess(response) {
      if (response != null && response.data !== null) {
        this.torrents = response.data.arguments.torrents;
      }
    },
    sortTorrents(torrents) {
      return common.sortTorrents(torrents, this.getSelectSortReverse, this.getSortCol);
    }
  }
}
</script>

<style scoped>
.overflow-man {
  overflow-y: scroll;
}

.pointer {
  cursor: pointer;
}

.chevron {
  min-width: 15px;
}

.peers {
  font-size: x-small;
  max-height: 74vh;
  min-height: 74vh;
}
.border {
  border-top: hidden !important;
  border-right: hidden !important;
  border-left: hidden !important;
}
.fix-cad {
  width: 15px;
}

.info-spin{
  margin-left: 48%;
  margin-top: 30%;
}
</style>