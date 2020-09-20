<template>
  <div>
    <div v-if="details == null" class="info-spin">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <div v-if="details != null">
      <span class="info-title">{{ details.name }}</span>

      <span class="info-subtitle">Activity</span>

      <div class="info-row">
        <span class="info-row-start">Have:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Avaibility:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Upload:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Downloaded:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">State:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Running Time:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Remaining Time:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Last Activity:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Error:</span>
        <span class="info-row-end">none</span>
      </div>

      <span class="info-subtitle">Details</span>

      <div class="info-row">
        <span class="info-row-start">Size:</span>
        <span class="info-row-end">{{ details.hashString }}</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Location:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Hash:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Privacy:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Origin:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Error:</span>
        <span class="info-row-end">none</span>
      </div>
      <div class="info-row">
        <span class="info-row-start">Comment:</span>
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