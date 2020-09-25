<template>
  <div class="overflow-auto font">
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
        <tr v-for="peer in peers" v-bind:key="peer.address">
          <td><b-icon v-if="peer.isEncrypted" icon="lock-fill"></b-icon></td>
          <td>-</td>
          <td>-</td>
          <td>{{ peer.progress * 100 | formatPercent }}%</td>
          <td>{{ peer.flagStr }}</td>
          <td>{{ peer.address }}</td>
          <td>{{ peer.clientName }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import keyStore from "@/constantes/key.store.const"
import events from "@/constantes/key.event.const"
import bus from "@/config/event.bus";
import {mapGetters} from "vuex";

export default {
  name: "PeersDetailsTorrentView",
  mixins: [
    TransmissionApiMixin
  ],
  computed: {
    ...mapGetters({
      selectedTorrent: keyStore.GET_SELECTED_TORRENT
    })
  },
  props: {
    showPanel: Boolean,
    peers: [
      {
        flagStr: String,
        address: String,
        progress: Number,
        clientName: String,
        isEncrypted: Boolean
      }
    ]
  },
  mounted() {
    this.$store.watch(() => this.$store.getters[keyStore.GET_SELECTED_TORRENT], this.refreshPeers)

    window.setInterval(() => {
      if(this.showPanel) {
        this.refreshPeers();
      }
    }, 10000)
  },
  methods: {
    refreshPeers() {
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
</style>