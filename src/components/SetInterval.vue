<template>
  <div id="interval-select">
    <div class="input-group input-group-sm">
      <div class="input-group-prepend" v-on:click="refresh">
        <button class="btn btn-secondary"><b-icon-arrow-repeat/></button >
      </div>
      <b-form-select id="refresh-select" v-model="selectedTimeRefresh" v-on:change="changeRefresh" :options="timeRefreshOptions" size="sm"></b-form-select>
    </div>
  </div>
</template>

<script>
import events from "@/constantes/event.const";
import key from "@/constantes/key.store.const";
import bus from "@/config/bus.event";
import { mapGetters } from "vuex";

export default {
  name: "SetInterval",
  computed: {
    ...mapGetters({timeRefresh: key.GET_TIME_REFRESH})
  },
  data: function() {
    return {
      selectedTimeRefresh: null,
      timeRefreshOptions: [
        { value: 1000, text: '1s' },
        { value: 5000, text: '5s' },
        { value: 10000, text: '10s' },
        { value: 20000, text: '20s' },
        { value: 30000, text: '30s' },
      ]
    };
  },
  mounted() {
    this.selectedTimeRefresh = this.timeRefresh;
  },
  methods: {
    refresh() {
      bus.$emit(events.REFRESH_LIST_TORRENT)
    },
    changeRefresh(value) {
      this.$store.commit(key.SET_TIME_REFRESH, value);
    },
  }
}
</script>

<style scoped>

</style>