<template>
  <div>
    <div v-if="infos == null" class="info-spin">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <div v-if="infos != null">
      <span class="info-subtitle">{{ $t('message.details.info.activity') }}</span>

      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.have') }}:</span>
        <span class="info-row-end">{{ infos | infosHave($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.availability') }}:</span>
        <span class="info-row-end">{{ infos | infosAvailability($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.upload') }}:</span>
        <span class="info-row-end">{{ infos | infosUpload($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.downloaded') }}:</span>
        <span class="info-row-end">{{ infos | infosDownload($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.state') }}:</span>
        <span class="info-row-end">{{ infos | infosState($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.running') }}:</span>
        <span class="info-row-end">{{ infos | infosRunningTime($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.remaining') }}:</span>
        <span class="info-row-end">{{ infos | infosRemainingTime($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.last') }}:</span>
        <span class="info-row-end">{{ infos | infosLastActivity($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.error') }}:</span>
        <span class="info-row-end">{{ infos | infosError($i18n) }}</span>
      </div>

      <span class="info-subtitle">{{ $t('message.details.info.details') }}</span>

      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.size') }}:</span>
        <span class="info-row-end">{{ infos | infosSizeDetails($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.location') }}:</span>
        <span class="info-row-end">{{ infos | infosBasic('downloadDir', $i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.hash') }}:</span>
        <span class="info-row-end">{{ infos | infosBasic('hashString', $i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.privacy') }}:</span>
        <span class="info-row-end">{{ infos | infosPrivacy($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.origin') }}:</span>
        <span class="info-row-end">{{ infos | formatCreator($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.comment') }}:</span>
        <span class="info-row-end">{{ infos | infosBasic('comment', $i18n) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import keyStore from "@/constantes/key.store.const";
import events from "@/constantes/key.event.const"
import bus from "@/config/bus.event";
import {mapGetters} from "vuex";
import IntervalMixin from "@/mixins/interval.mixin";

export default {
  name: "InfoDetailsTorrentView",
  mixins: [
    TransmissionApiMixin,
    IntervalMixin
  ],
  computed: {
    ...mapGetters({
      selectedTorrents: keyStore.GET_SELECTED_TORRENTS
    })
  },
  data: function() {
    return {
        infos: []
      };
  },
  props: {
    showPanel: Boolean
  },
  mounted() {
    this.$store.watch(() => this.$store.getters[keyStore.GET_SELECTED_TORRENTS], this.refreshMan)
  },
  methods: {
    refreshMan() {
      if (this.showPanel) {
        this.infos = null;
        this.getInfoTorrent(this.selectedTorrents)
            .then(this.detailSuccess)
            .catch(this.error);
      } else {
        this.infos = null;
      }
    },
    refresh() {
      if (this.showPanel) {
        this.getInfoTorrent(this.selectedTorrents)
            .then(this.detailSuccess)
            .catch(this.error);
      } else {
        this.infos = null;
      }
    },
    detailSuccess(response) {
      if (response !== null && response.data !== null) {
        this.infos = response.data.arguments.torrents;
      }
    },
    error(error) {
      bus.$emit(events.NOTIFICATION_FAIL, error);
    }
  }
}
</script>

<style scoped>
.info-subtitle {
  font-weight: bold;
  font-size: medium;
  display: flex;
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 10px;
}

.info-row {
  font-size: small;
  display: flex;
  margin-left: 30px;
}

.info-row-start{
  width: 150px;
}

.info-row-end{
  width: 350px;
  font-style: oblique;
}

.info-spin{
  margin-left: 48%;
  margin-top: 30%;
}
</style>