<template>
  <div class="overflow-auto font">
    <div v-if="peers === null" class="info-spin">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <div v-else-if="peers !== null && peers.length === 0" class="info-spin">
      {{ $t('message.filter.none') }}
    </div>
    <div v-else>
      <table class="table table-striped table-sm border" v-if="peers != null && peers.length > 0">
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
        <tr v-for="peer in peers" :key="peer.address">
          <td><b-icon v-if="peer.isEncrypted" icon="lock-fill"></b-icon></td>
          <td >{{ returnSize(peer.rateToPeer) }}</td>
          <td >{{ returnSize(peer.rateToClient) }}</td>
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
import bus from "@/config/event.bus";
import {mapGetters} from "vuex";

export default {
  name: "PeersDetailsTorrentView",
  mixins: [
    TransmissionApiMixin,
    IntervalMixin
  ],
  computed: {
    ...mapGetters({
      selectedTorrent: keyStore.GET_SELECTED_TORRENT
    })
  },
  data: function() {
    return {
        peers: null
      };
  },
  props: {
    showPanel: Boolean
  },
  created() {
    this.$store.watch(() => this.$store.getters[keyStore.GET_SELECTED_TORRENT], this.refreshPeers);
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
      this.peers = null;
      this.getPeersTorrent(this.selectedTorrent)
          .then(this.detailSuccess)
          .catch(this.error);
    },
    detailSuccess(response) {
      if (response != null && response.data !== null) {
        this.peers = response.data.arguments.torrents[0].peers;
      }
    },
    error(error) {
      bus.$emit(events.NOTIFICATION_FAIL, error);
    }
  }
}
</script>

<style scoped>
.font {
  font-size: xx-small;
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