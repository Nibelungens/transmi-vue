<template>
  <div class="overflow-auto peers">
    <div v-if="torrents === null" class="info-spin">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <div v-else-if="torrents !== null && torrents.length === 0" class="info-spin">
      {{ $t('message.filter.none') }}
    </div>
    <div v-else v-for="torrent in torrents" :key="torrent.id">
      <div>{{torrent.name}}</div>
      <table class="table table-striped table-sm border" v-if="torrent.peers != null && torrent.peers.length > 0" :aria-describedby="$t('message.peers.tableDescriptor')">
        <thead>
        <tr>
          <th scope="col" class="fix-cad"></th>
          <th scope="col">{{ $t('message.peers.up')}}</th>
          <th scope="col">{{ $t('message.peers.down')}}</th>
          <th scope="col">{{ $t('message.peers.percent')}}</th>
          <th scope="col">{{ $t('message.peers.status')}}</th>
          <th scope="col">{{ $t('message.peers.address')}}</th>
          <th scope="col">{{ $t('message.peers.client')}}</th>
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
    </div>
  </div>
</template>

<script>
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import IntervalMixin from "@/mixins/interval.mixin";
import keyStore from "@/constantes/key.store.const"
import events from "@/constantes/key.event.const"
import filterSize from '@/filters/size.filter'
import bus from "@/config/bus.event";
import {mapGetters} from "vuex";

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
    TransmissionApiMixin,
    IntervalMixin
  ],
  computed: {
    ...mapGetters({
      selectedTorrent: keyStore.GET_SELECTED_TORRENTS
    })
  },
  data: function() {
    return {
        torrents: null
      };
  },
  props: {
    showPanel: Boolean
  },
  created() {
    this.$store.watch(() => this.$store.getters[keyStore.GET_SELECTED_TORRENTS], this.refreshPeers);
  },
  methods: {
    returnSize(rate) {
      if (rate === 0) {
        return this.$t('message.filter.none');
      } else {
        return filterSize(rate)+'/s';
      }
    },
    refresh() {
      if (this.showPanel) {
        this.getPeersTorrent(this.selectedTorrent)
            .then(this.detailSuccess)
            .catch(this.error)
      }
    },
    refreshPeers() {
      if (this.showPanel) {
        this.torrents = null;
        this.getPeersTorrent(this.selectedTorrent)
            .then(this.detailSuccess)
            .catch(this.error);
      }
    },
    detailSuccess(response) {
      if (response != null && response.data !== null) {
        this.torrents = response.data.arguments.torrents;
      }
    },
    error(error) {
      bus.$emit(events.NOTIFICATION_FAIL, error);
    }
  }
}
</script>

<style scoped>
.peers {
  font-size: xx-small;
  max-height: 74vh;
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