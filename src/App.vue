<template>
  <div id="app" ref="app" v-on:click="click">
    <header-transmission id="header" ref="header"></header-transmission>
    <main id="content" ref="content">
      <list-torrents-view/>
    </main>
    <footer-transmission id="footer" ref="footer"></footer-transmission>
  </div>
</template>

<script>
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import HeaderTransmission from "@/components/ui/HeaderTransmission";
import FooterTransmission from "@/components/ui/FooterTransmission";
import ListTorrentsView from '@/components/ListTorrentsView';
import events from "@/constantes/key.event.const"
import bus from "@/config/event.bus";
import IntervalMixin from "@/mixins/interval.mixin"
import ResultMixin from "@/mixins/result.mixin";

const s_success = {
  variant: 'success',
  toaster: 'b-toaster-bottom-left',
  solid: true,
  noCloseButton: true
};

const s_failed = {
  variant: 'error',
  toaster: 'b-toaster-bottom-left',
  solid: true,
  noCloseButton: true
};

export default {
  name: 'App',
  mixins: [
    TransmissionApiMixin,
    IntervalMixin,
    ResultMixin
  ],
  components: {
    FooterTransmission,
    HeaderTransmission,
    ListTorrentsView
  },
  mounted () {
    this.refresh();
  },
  created() {
    bus.$on(events.NOTIFICATION_SUCCESS, this.notificationSuccess);
    bus.$on(events.NOTIFICATION_FAIL, this.notificationFail);
    bus.$on(events.ACTION, this.refresh);
  },
  beforeDestroy() {
    bus.$off(events.NOTIFICATION_SUCCESS);
    bus.$off(events.NOTIFICATION_FAIL);
    bus.$off(events.ACTION);
  },
  methods: {
    notificationSuccess(msg) {
      this.$bvToast.toast(msg, s_success);
    },
    notificationFail(msg) {
      this.$bvToast.toast(msg, s_failed);
    },
    refresh() {
      this.getTorrents()
          .then(this.successTorrent)
          .catch(this.error);
    },
    click() {
      bus.$emit(events.CLOSE_ALL_CONTEXT);
    }
  },
}
</script>

<style>
#content {
  z-index: 2;
}
#header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  text-align: center;
  z-index: 1;
}

#content {
  position: fixed;
  top: 47px;
  bottom: 47px;
  width: 100%;
  overflow-y: auto;
  z-index: 1;
}

#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
