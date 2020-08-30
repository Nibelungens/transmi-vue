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
import ListTorrentsView from './components/ListTorrentsView.vue';
import HeaderTransmission from "@/components/ui/HeaderTransmission";
import FooterTransmission from "@/components/ui/FooterTransmission";
import bus from "@/config/event.bus";
import NotificationMixin from "@/mixins/notification.mixin"
import TransmissionApiMixin from "@/mixins/transmission.api.mixin";
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
    ...mapGetters({torrents: 'Torrents/getTorrents'})
  },
  methods: {
    refresh() {
      this.getTorrents()
          .then(response => this.$store.commit('Torrents/SET_LIST_TORRENT', response.data.arguments.torrents));
    }
  },
  mounted () {
    this.refresh();
    window.setInterval(() => {
      this.refresh();
    }, 1000)
  },
  created() {
    bus.$on('notification-success', (msg) => {this.notificationSuccess(msg)});
    bus.$on('notification-fail', (msg) => {this.notificationFail(msg)});
    bus.$on('action', this.refresh);
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
