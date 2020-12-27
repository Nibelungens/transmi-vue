<template>
  <div id="app" ref="app" class="user-select-none">
    <header-transmission id="header" ref="header"></header-transmission>
    <main id="content" ref="content">
      <list-torrents-view/>
    </main>
    <footer-transmission id="footer" ref="footer"></footer-transmission>
    <add-torrent-modal/>
    <remove-torrent-modal/>
  </div>
</template>

<script>
import RemoveTorrentModal from "@/components/modal/RemoveTorrentModal";
import HeaderTransmission from '@/components/ui/HeaderTransmission';
import FooterTransmission from '@/components/ui/FooterTransmission';
import Notification from "@/store/module/class/notification.class";
import AddTorrentModal from '@/components/modal/AddTorrentModal';
import ListTorrentsView from '@/components/ListTorrentsView';
import keyStore from '@/constantes/key.store.const';
import api from "@/services/api.transmission.mixin";
import interval from '@/mixins/interval.mixin';
import key from "@/constantes/key.store.const";
import events from '@/constantes/event.const';
import result from '@/mixins/result.mixin';
import bus from '@/config/bus.event';

export default {
  name: 'App',
  mixins: [
      interval,
      result,
      api
  ],
  components: {
    RemoveTorrentModal,
    FooterTransmission,
    HeaderTransmission,
    ListTorrentsView,
    AddTorrentModal
  },
  mounted () {
    document.title = this.$t('message.appName').toString();

    bus.$on(events.NOTIFICATION_SUCCESS, this.notificationSuccess);
    bus.$on(events.NOTIFICATION_WARN, this.notificationWarn);
    bus.$on(events.NOTIFICATION_FAIL, this.notificationFail);
    bus.$on(events.REFRESH_LIST_TORRENT, this.refresh);

    this.$store.watch(() => this.$store.getters[keyStore.GET_SELECT_SORT_COL], this.refresh)
    this.$store.watch(() => this.$store.getters[keyStore.GET_SELECT_SORT_REVERSE], this.refresh)

    this.refresh();
    this.api_config.getSession()
        .then((response) => this.$store.commit(keyStore.SET_CONFIG, response.data.arguments))
        .catch(this.error);

    window.addEventListener('keydown', this.selectAll);
    window.addEventListener('keydown', this.deleteSelected);
  },
  beforeDestroy() {
    bus.$off(events.NOTIFICATION_SUCCESS);
    bus.$off(events.NOTIFICATION_FAIL);
    bus.$off(events.REFRESH_LIST_TORRENT);
  },
  methods: {
    deleteSelected(event) {
      if (event.key === 'Delete') bus.$emit(events.REMOVE_MODAL_ADD_TORRENT, false);
    },
    selectAll(event) {
      if (event.ctrlKey && event.key === 'a') bus.$emit(events.SELECT_ALL_TORRENT);
    },
    notificationSuccess(msg) {
      this.$store.commit(key.ADD_NOTIFICATION, Notification.success(msg));
    },
    notificationWarn(msg) {
      this.$store.commit(key.ADD_NOTIFICATION, Notification.warning(msg));
    },
    notificationFail(msg) {
      this.$store.commit(key.ADD_NOTIFICATION, Notification.error(msg));
    },
    refresh() {
      this.api_torrent.getTorrents()
          .then(this.detailSuccessStore)
          .catch(this.error);
    }
  }
}
</script>

<style>

#footer {
  z-index: 1;
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
