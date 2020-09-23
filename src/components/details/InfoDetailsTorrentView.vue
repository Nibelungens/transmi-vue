<template>
  <div>
    <div v-if="details == null" class="info-spin">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <div v-if="details != null">
      <span class="info-title">{{ details.name }}</span>

      <span class="info-subtitle">{{ $t('message.details.info.activity') }}</span>

      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.have') }}:</span>
        <span class="info-row-end">{{ details | formatHave($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.avaibility') }}:</span>
        <span class="info-row-end">{{ details | formatAvailability($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.upload') }}:</span>
        <span class="info-row-end">{{ details | formatUpload($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.downloaded') }}:</span>
        <span class="info-row-end">{{ details | formatDownload($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.state') }}:</span>
        <span class="info-row-end">{{ details | formatStatus($i18n) }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.running') }}:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.remaining') }}:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.last') }}:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.error') }}:</span>
        <span class="info-row-end">none</span>
      </div>

      <span class="info-subtitle">{{ $t('message.details.info.details') }}</span>

      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.size') }}:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.location') }}:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.hash') }}:</span>
        <span class="info-row-end">{{ details.hashString }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.privacy') }}:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.origin') }}:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.error') }}:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">{{ $t('message.details.info.comment') }}:</span>
        <span class="info-row-end">none</span>
      </div>
    </div>
  </div>
</template>

<script>
import TransmissionApiMixin from "../../mixins/transmission.api.mixin";
import bus from "@/config/event.bus";

export default {
  name: "InfoDetailsTorrentView",
  mixins: [
    TransmissionApiMixin
  ],
  props: {
    torrent: {
      id: String,
      name: String,
      hashString: String,
      sizeWhenDone: Number,
      leftUntilDone: Number,
      haveUnchecked: Number,
      haveValid: Number,
      desiredAvailable: Number,
      downloadedEver: Number,
      uploadedEver: Number,
      corruptEver: Number,
      isFinished: Boolean,
      status: Number
    }
  },
  data: function() {
    return {
      details: this.details
    };
  },
  watch: {
    torrent: function () {
      this.details = null;
      this.getInfoTorrent(this.torrent)
          .then(this.detailSuccess)
          .catch(this.error);
    }
  },
  methods: {
    detailSuccess(response) {
      if (response != null) {
        this.details = response.data.arguments.torrents[0];
      }
    },
    error(error) {
      bus.$emit('notification-fail', error);
    }
  }
}
</script>

<style scoped>
.info-title {
  font-size: larger;
  font-weight: bold;
  display: flex;
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

.info-spin{
  margin-left: 48%;
  margin-top: 30%;
}
</style>