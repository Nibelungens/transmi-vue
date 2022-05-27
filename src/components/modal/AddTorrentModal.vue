<template>
  <b-modal id="add-torrent-modal" button-size="sm" dialog-class="model-add user-select-none">
    <template v-slot:modal-title>
      <b-icon class="mr-3" icon="file-earmark-arrow-up-fill"></b-icon>{{ $t('message.addModal.title') }}
    </template>
    <b-form v-on:submit="onSubmit">
      <b-form-group id="file" :label="$t('message.addModal.title')" label-for="select-file">
        <b-form-file :file-name-formatter="formatNames" accept=".torrent" size="sm" id="select-file" v-model="filesTorrent" :placeholder="$t('message.addModal.noSelect')" drop-placeholder="Drop file here..." multiple/>
      </b-form-group>
      <b-form-group id="url" :label="$t('message.addModal.url')" label-for="select-url">
        <b-form-input size="sm" id="select-url" v-model="url" placeholder=""/>
      </b-form-group>
      <b-form-group id="destination" :label="$t('message.addModal.destination', [this.getSize()])" label-for="select-destination">
        <b-form-input size="sm" id="select-destination" v-model="destination" :placeholder="this.downloadDir"/>
      </b-form-group>
      <b-form-checkbox id="checkbox-start" v-model="start" name="checkbox-start">{{$t('message.addModal.start')}}</b-form-checkbox>
    </b-form>
    <template v-slot:modal-footer="{ cancel }">
      <b-button size="sm" variant="danger" v-on:click="cancel()">{{ $t('message.addModal.cancel') }}</b-button>
      <b-button size="sm" variant="success" v-on:click="onSubmit">{{ $t('message.addModal.submit') }}</b-button>
    </template>
  </b-modal>
</template>

<script>
import api from "@/services/api.transmission.mixin";
import keyStore from "@/constantes/key.store.const";
import events from "@/constantes/event.const";
import sizeFilter from "@/filters/size.filter";
import result from "@/mixins/result.mixin";
import bus from "@/config/bus.event";
import { mapGetters } from "vuex";

const ADD_TORRENT_MODAL = 'add-torrent-modal'

export default {
  name: "AddTorrentModal",
  mixins: [
      api,
      result
  ],
  mounted() {
    bus.$on(events.OPEN_MODAL_ADD_TORRENT, this.showModal);
  },
  data: function() {
    return {
      filesTorrent: [],
      url: null,
      destination: null,
      start: true
    };
  },
  computed: {
    ...mapGetters({
      downloadDirFreeSpace: keyStore.GET_DOWNLOAD_DIR_FREE_SPACE,
      downloadDir: keyStore.GET_DOWNLOAD_DIR
    }),

  },
  methods: {
    formatNames(files) {
      if (files.length === 1) {
        return (files[0].name.length < 60) ? files[0].name: files[0].name.substring(0, 57) + "...";
      } else {
        return this.$t('message.addModal.selects', [files.length])
      }
    },
    getFolder() {
      return (this.destination == null) ? this.downloadDir : this.destination;
    },
    toTransmission(reader) {
      const key = 'base64,';
      const hash = reader.currentTarget.result;
      return hash.substring(hash.indexOf(key) + key.length);
    },
    getSize() {
      return sizeFilter(this.downloadDirFreeSpace);
    },
    showModal() {
      this.reset();
      this.api_config.getFreeSpace(this.downloadDir)
          .then((response) => this.$store.commit(keyStore.SET_DOWNLOAD_DIR_FREE_SPACE, response.data.arguments['size-bytes']))
          .catch(this.error)
      this.$bvModal.show(ADD_TORRENT_MODAL);
    },
    toBase64(file){
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (reader) => this.add(this.toTransmission(reader), null, file.name);
      fileReader.onerror = this.fail;
    },
    addSuccess(response, name) {
      this.reset();
      if (response.data.result === 'success') {
        if (response.data.arguments['torrent-duplicate'] != null && response.data.arguments['torrent-duplicate'].id > 0) {
          this.$bvModal.hide(ADD_TORRENT_MODAL);
          if (name !== null) {
            bus.$emit(events.NOTIFICATION_WARN, this.$t('message.addModal.already', [name]));
          } else {
            bus.$emit(events.NOTIFICATION_WARN, this.$t('message.addModal.alreadyNoParams'));
          }
        } else {
          this.$bvModal.hide(ADD_TORRENT_MODAL);
          bus.$emit(events.REFRESH_LIST_TORRENT);
          if (name !== null) {
            bus.$emit(events.NOTIFICATION_SUCCESS, this.$t('message.addModal.addOne', [name]));
          } else {
            bus.$emit(events.NOTIFICATION_SUCCESS, this.$t('message.addModal.addOneNoParams'));
          }
        }
      } else {
        bus.$emit(events.NOTIFICATION_FAIL, response.data.result);
      }
    },
    reset() {
      this.filesTorrent = [];
      this.url = null;
      this.destination = null;
      this.start = true;
    },
    add(path, url, name) {
      this.api_torrent.addTorrent(this.getFolder(), path, url, this.start)
          .then((response) => this.addSuccess(response, name))
          .catch(this.fail);
    },
    onSubmit() {
      if (this.url === null || this.url === "") {
        for (const fileTorrent of this.filesTorrent) {
          this.toBase64(fileTorrent);
        }
      } else {
        this.add(null, this.url, null);
      }

    }
  }
}
</script>

<style scoped>
div >>> .model-add {
  margin-top: 5%;
}
</style>