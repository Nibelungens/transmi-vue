<script setup lang="ts">
import {key as busKey, refreshTorrents} from "../../config/event-bus.config";
import {computed, inject, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {Emitter} from "mitt";

const configRefreshInterval = computed<number>(() => useStore().getters["config/getRefreshInterval"]);
const configPossibleRefreshIntervals = computed<Array<number>>(() => useStore().getters["config/getPossibleRefreshIntervals"]);
const emitter = inject<Emitter<any>>(busKey);

let selectedRefreshInterval = ref<number | null>(null);
let refreshIntervalMsOptions = ref<Array<number>>([]);

onMounted(() => {
  selectedRefreshInterval.value = configRefreshInterval.value;
  refreshIntervalMsOptions.value = configPossibleRefreshIntervals.value;
})

function refresh() {
  emitter?.emit(refreshTorrents)
}

function isSelected(value: number) {
  return value === configRefreshInterval.value;
}
</script>

<template>
  <div>
    <div class="input-group input-group-sm refresh-group">
      <button class="btn btn-light" type="button" @click="refresh"><i class="bi bi-arrow-repeat"/></button>
      <select class="form-select" id="inputGroupSelect03" aria-label="Example select with button addon" v-model="selectedRefreshInterval">
        <option v-for="value in refreshIntervalMsOptions" :value="value" :selected="isSelected(value)">{{ value / 1000 }}s</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.refresh-group {
  max-width: 110px;
  min-width: 110px;
  margin-left: auto;
}
</style>
