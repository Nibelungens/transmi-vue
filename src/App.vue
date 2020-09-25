<template>
  <div id="app">
    <header-transmission id="header"></header-transmission>
    <main id="content">
      <list-torrents-view v-bind:torrents="torrents"/>
    </main>
    <footer-transmission id="footer"></footer-transmission>
  </div>
</template>

<script>
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
import HeaderTransmission from "@/components/ui/HeaderTransmission";
import FooterTransmission from "@/components/ui/FooterTransmission";
import ListTorrentsView from '@/components/ListTorrentsView';
import NotificationMixin from "@/mixins/notification.mixin";
import keyStore from "@/constantes/key.store.const";
import events from "@/constantes/key.event.const"
import bus from "@/config/event.bus";
import {mapGetters} from "vuex";
import IntervalMixin from "@/mixins/interval.mixin"

export default {
  name: 'App',
  mixins: [
    NotificationMixin,
    TransmissionApiMixin,
    IntervalMixin
  ],
  components: {
    FooterTransmission,
    HeaderTransmission,
    ListTorrentsView
  },
  computed: {
    ...mapGetters({
      torrents: keyStore.GET_TORRENT
    })
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
    refresh() {
      this.getTorrents()
          .then(response => this.$store.commit(keyStore.SET_LIST_TORRENT, response.data.arguments.torrents));
    }
  },
}
</script>

<style>
#header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  text-align: center;
}

#content {
  position: fixed;
  top: 47px;
  bottom: 47px;
  width: 100%;
  overflow-y: auto;
}

#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
