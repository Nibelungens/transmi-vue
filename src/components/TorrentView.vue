<script setup lang="ts">
import ToTranslateBundle from "../data/to-translate-bundle.data";
import Torrent from "../data/torrent.data";
import {useI18n} from "vue-i18n";

const {torrent} = defineProps<{
  torrent: Torrent
}>()

const {t} = useI18n();

function tb(toTranslateBundle: ToTranslateBundle) {
  return toTranslateBundle.all(t);
}

</script>

<template>
  <div>
    <div class="container-fluid">
      <div class="d-flex justify-content-between">
        <div class="fs-6 fw-bold d-inline-flex">{{ torrent?.name }}</div>
        <div class="d-inline-flex">
          <div class="trv-fs-7 my-auto">{{ tb(torrent.remainingFilter()) }}</div>
          <i class="bi bi-play-fill d-inline mx-2" v-if="!torrent.isPlay()"/>
          <i class="bi bi-pause-fill d-inline mx-2" v-if="!torrent.isPause()"/>
        </div>
      </div>
      <div class="trv-fs-8 d-flex justify-content-between">
        <div class="d-inline-flex">{{ tb(torrent.remainingFilter()) }}</div>
        <div class="d-inline-flex">
          <div v-if="torrent.asError()">{{ t('message.torrent.error', [torrent.errorString]) }}</div>
          <div v-else>{{ tb(torrent.formatStatus()) }}{{ tb(torrent.postStatus()) }}</div>
          <i class="bi bi-arrow-down" v-if="torrent.showDownloadRate()"/>{{ torrent.formattedDownloadRate() }}/s
          <i class="bi bi-arrow-up" v-if="torrent.showUploadRate()"/>{{ torrent.formattedUploadRate() }}/s
        </div>
      </div>
      <div class="my-1 w-100">
        <div class="progress trv-progress">
          <div :style="`width: ${torrent.percentComplete()}%`" class="progress-bar" role="progressbar" :aria-valuenow="torrent.percentComplete()" aria-valuemin="0" aria-valuemax="100"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trv-progress {
  height: 7px;
}

.trv-fs-7 {
  font-size: x-small;
}

.trv-fs-8 {
  font-size: x-small;
  color: gray;
}

</style>

<i18n>
en:
  status:
    complete: "Seeding complete"
    paused: "Paused"
    queuedVerification: "Queued for verification"
    verifying: "Verifying local data ({0}% tested)"
    queuedDownload: "Queued for download"
    downloading: "Downloading"
    queuedSeeding: "Queued for seeding"
    seeding: "Seeding"
    unknown: "Unknown"
    error: "Error"
  torrent:
    to: " to {0} of {1} peer"
    from: " from {0} of {1} peer"
  remaining:
    timeUnknown: "remaining time unknown"
    magnetized:
      needs: "Magnetized transfer - needs metadata ({1}%)"
      retrieving: "Magnetized transfer - retrieving metadata ({1}%)"
    of: "{0} of {1} ({2}%)"
    upload: ", uploaded {0} (Ratio {1})"
    remaining: " remaining"
fr:
  status:
    complete: "Seeding complete"
    paused: "Paused"
    queuedVerification: "Queued for verification"
    verifying: "Verifying local data ({0}% tested)"
    queuedDownload: "Queued for download"
    downloading: "Downloading"
    queuedSeeding: "Queued for seeding"
    seeding: "Seeding"
    unknown: "Unknown"
    error: "Error"
  torrent:
    to: " to {0} of {1} peer"
    from: " from {0} of {1} peer"
  remaining:
    timeUnknown: "remaining time unknown"
    retrieving: "retrieving"
    needs: "needs"
    magnetized: "Magnetized transfer - {0} metadata ({1}%)"
    of: "{0} of {1} ({2}%)"
    upload: ", uploaded {0} (Ratio {1})"
    remaining: " remaining"
</i18n>
