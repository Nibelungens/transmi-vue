<template>
  <div>
    <div v-if="infos == null" class="info-spin">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <div v-if="infos != null">
      <div class="d-inline-block text-truncate info-title">{{ infos.name }}</div>

      <span class="info-subtitle">{{ $t('message.details.info.activity') }}</span>

      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.have') }}:</span>
        <span class="info-row-end">{{ infos | formatHave($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.avaibility') }}:</span>
        <span class="info-row-end">{{ infos | formatAvailability($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.upload') }}:</span>
        <span class="info-row-end">{{ infos | formatUpload($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.downloaded') }}:</span>
        <span class="info-row-end">{{ infos | formatDownload($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.state') }}:</span>
        <span class="info-row-end">{{ infos | formatState($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.running') }}:</span>
        <span class="info-row-end">{{ infos | formatRunningTime($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.remaining') }}:</span>
        <span class="info-row-end">{{ infos | formatRemainingTime($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.last') }}:</span>
        <span class="info-row-end">{{ infos | formatLastActivity($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.error') }}:</span>
        <span class="info-row-end">{{ (infos.errorString !== "") ? infos.errorString : $t('message.filter.none') }}</span>
      </div>

      <span class="info-subtitle">{{ $t('message.details.info.details') }}</span>

      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.size') }}:</span>
        <span class="info-row-end">{{ infos | formatSizeDetails($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.location') }}:</span>
        <span class="info-row-end">{{ infos.downloadDir }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.hash') }}:</span>
        <span class="info-row-end">{{ infos.hashString }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.privacy') }}:</span>
        <span class="info-row-end">{{ infos.isPrivate ? $t('message.details.info.privateTracker'): $t('message.details.info.publicTracker') }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.origin') }}:</span>
        <span class="info-row-end">{{ infos | formatCreator($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.comment') }}:</span>
        <span class="info-row-end">{{ (infos.comment !== "") ? infos.comment: $t('message.filter.none')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import keyStore from "@/constantes/key.store.const";
import events from "@/constantes/key.event.const"
import bus from "@/config/event.bus";
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
      selectedTorrent: keyStore.GET_SELECTED_TORRENT
    })
  },
  data: function() {
    return {
        infos: null
      };
},
  props: {
    showPanel: Boolean
  },
  mounted() {
    this.$store.watch(() => this.$store.getters[keyStore.GET_SELECTED_TORRENT], this.refresh)
  },
  methods: {
    refresh() {
      if (this.showPanel) {
        this.infos = null;
        this.getInfoTorrent(this.selectedTorrent)
            .then(this.detailSuccess)
            .catch(this.error);
      }
    },
    detailSuccess(response) {
      if (response !== null && response.data !== null) {
        this.infos = response.data.arguments.torrents[0];
      }
    },
    error(error) {
      bus.$emit(events.NOTIFICATION_FAIL, error);
    }
  }
}
</script>

<style scoped>
.info-title {
  font-size: larger;
  font-weight: bold;
  max-width: 520px;
  margin-left: 10px;
}

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