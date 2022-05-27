<template>
  <b-modal id="remove-torrent-modal" v-on:shown="autofocus" button-size="sm" dialog-class="model-remove user-select-none" title-class="text-truncate">
    <template v-slot:modal-title>
      <b-icon class="mr-3" icon="trash-fill"/>{{ $tc('message.header.removeModal.title', selectedTorrent.length, [selectedTorrent[0].name, selectedTorrent.length]) }}
    </template>
    <img src="@/assets/logo-96.png" alt="logo" class="d-inline-block align-bottom"/>
    <div class="d-inline-block w-75">
      <div class="text-center align-middle font-weight-bold mb-2">{{ (this.trash)? $t('message.header.removeModal.description.trash'): $t('message.header.removeModal.description.normal') }}</div>
      <div class="text-center align-middle mb-2">{{ $t('message.header.removeModal.description.main') }}</div>
      <div class="text-center align-middle">{{ $t('message.header.removeModal.description.sure') }}</div>
    </div>

    <template v-slot:modal-footer="{ cancel }">
      <b-button size="sm" variant="success" v-on:click="cancel()">{{ $t('message.header.removeModal.cancel') }}</b-button>
      <b-button ref="remove-submit" size="sm" variant="danger" v-on:click="removeSelected">{{ $t('message.header.removeModal.remove') }}</b-button>
    </template>
  </b-modal>
</template>

<script>

import {mapGetters} from "vuex";
import key from "@/constantes/key.store.const";
import bus from "@/config/bus.event";
import events from "@/constantes/event.const";
import api from "@/services/api.transmission.mixin";
import result from "@/mixins/result.mixin";

const REMOVE_TORRENT_MODAL = 'remove-torrent-modal';

export default {
  name: "RemoveTorrentModal",
  mixins: [
    api,
    result
  ],
  data() {
    return {
      trash: false
    }
  },
  computed: {
    ...mapGetters({
      selectedTorrent: key.GET_SELECTED_TORRENTS
    })
  },
  mounted() {
    bus.$on(events.REMOVE_MODAL_ADD_TORRENT, this.showModal);
  },
  methods: {
    autofocus() {
      this.$refs['remove-submit'].focus();
    },
    showModal(trash) {
      if (this.selectedTorrent && this.selectedTorrent.length > 0) {
        this.trash = trash;
        this.$bvModal.show(REMOVE_TORRENT_MODAL);
      }
    },
    removeSelected() {
      this.api_torrent.removeTorrent(this.selectedTorrent, this.trash)
          .then(response => {
            this.success(response)
            this.$store.commit(key.UNSELECTED);
          }).catch(this.fail);
      this.$bvModal.hide(REMOVE_TORRENT_MODAL);
    },
  }
}
</script>

<style scoped>

</style>