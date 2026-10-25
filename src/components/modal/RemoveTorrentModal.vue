<template>
  <b-modal id="remove-torrent-modal" v-model="modalVisible" v-on:shown="autofocus" button-size="sm" dialog-class="model-remove user-select-none" title-class="text-truncate">
    <template v-slot:title>
      <b-icon class="mr-3" icon="trash-fill"/>
      <span v-if="selectedTorrent.length">{{ $tc('message.header.removeModal.title', selectedTorrent.length, [selectedTorrent[0].name, selectedTorrent.length]) }}</span>
    </template>
    <img src="@/assets/logo-96.png" alt="logo" class="d-inline-block align-bottom"/>
    <div class="d-inline-block w-75">
      <div class="text-center align-middle font-weight-bold mb-2">{{ trash ? $t('message.header.removeModal.description.trash') : $t('message.header.removeModal.description.normal') }}</div>
      <div class="text-center align-middle mb-2">{{ $t('message.header.removeModal.description.main') }}</div>
      <div class="text-center align-middle">{{ $t('message.header.removeModal.description.sure') }}</div>
    </div>

    <template v-slot:footer>
      <b-button size="sm" variant="success" v-on:click="modalVisible = false">{{ $t('message.header.removeModal.cancel') }}</b-button>
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

export default {
  name: "RemoveTorrentModal",
  mixins: [
    api,
    result
  ],
  data() {
    return {
      trash: false,
      modalVisible: false
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
  beforeUnmount() {
    bus.$off(events.REMOVE_MODAL_ADD_TORRENT, this.showModal);
  },
  methods: {
    autofocus() {
      const button = this.$refs['remove-submit']
      if (button?.focus) {
        button.focus()
      } else {
        button?.$el?.focus()
      }
    },
    showModal(trash) {
      if (this.selectedTorrent && this.selectedTorrent.length > 0) {
        this.trash = trash;
        this.modalVisible = true;
      }
    },
    removeSelected() {
      this.api_torrent.removeTorrent(this.selectedTorrent, this.trash)
          .then(response => {
            this.success(response)
            this.$store.commit(key.UNSELECTED);
          }).catch(this.fail);
      this.modalVisible = false;
    },
  }
}
</script>

<style scoped>

</style>