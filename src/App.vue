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

export default {
  name: 'App',
  mixins: [
    NotificationMixin,
    TransmissionApiMixin
  ],
  components: {
    FooterTransmission,
    HeaderTransmission,
    ListTorrentsView
  },
  computed: {
    ...mapGetters({torrents: keyStore.GET_TORRENT})
  },
  methods: {
    refresh() {
      this.getTorrents()
          .then(response => this.$store.commit(keyStore.SET_LIST_TORRENT, response.data.arguments.torrents));
    }
  },
  mounted () {
    this.refresh();
    window.setInterval(() => {
      this.refresh();
    }, 1000)
  },
  created() {
    bus.$on(events.NOTIFICATION_SUCCESS, (msg) => {this.notificationSuccess(msg)});
    bus.$on(events.NOTIFICATION_FAIL, (msg) => {this.notificationFail(msg)});
    bus.$on(events.ACTION, this.refresh);
  }
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
