<template>
  <div id="app" ref="app" class="user-select-none">
    <header-transmission id="header" ref="header"></header-transmission>
    <main id="content" ref="content">
      <list-torrents-view/>
    </main>
    <footer-transmission id="footer" ref="footer"></footer-transmission>
    <add-torrent-modal/>
  </div>
</template>

<script>
import TransmissionApiMixin from '@/mixins/transmission.api.mixin';
import HeaderTransmission from '@/components/ui/HeaderTransmission';
import FooterTransmission from '@/components/ui/FooterTransmission';
import ListTorrentsView from '@/components/ListTorrentsView';
import AddTorrentModal from '@/components/AddTorrentModal';
import keyStore from '@/constantes/key.store.const';
import IntervalMixin from '@/mixins/interval.mixin';
import events from '@/constantes/key.event.const';
import ResultMixin from '@/mixins/result.mixin';
import bus from '@/config/bus.event';
import { mapGetters } from 'vuex';

const s_success = {
  variant: 'success',
  toaster: 'b-toaster-bottom-left',
  solid: true,
  noCloseButton: true
};

const s_warning = {
  variant: 'warning',
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
    AddTorrentModal,
    FooterTransmission,
    HeaderTransmission,
    ListTorrentsView
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
    this.getSession()
        .then((response) => this.$store.commit(keyStore.SET_CONFIG, response.data.arguments))
        .catch(this.error);

    window.addEventListener('keydown', this.selectAll);
  },
  beforeDestroy() {
    bus.$off(events.NOTIFICATION_SUCCESS);
    bus.$off(events.NOTIFICATION_FAIL);
    bus.$off(events.REFRESH_LIST_TORRENT);
  },
  computed: {
    ...mapGetters({
      getSortCol: keyStore.GET_SELECT_SORT_COL,
      getSelectSortReverse: keyStore.GET_SELECT_SORT_REVERSE
    })
  },
  methods: {
    selectAll(event) {
      if (event.ctrlKey && event.key === 'a') bus.$emit(events.SELECT_ALL_TORRENT);
    },
    notificationSuccess(msg) {
      this.$bvToast.toast(msg, s_success);
    },
    notificationWarn(msg) {
      this.$bvToast.toast(msg, s_warning);
    },
    notificationFail(msg) {
      this.$bvToast.toast(msg, s_failed);
    },
    refresh() {
      this.getTorrents()
          .then(this.successTorrent)
          .catch(this.error);
    },
    sortTorrents(torrents) {
      let torrentsClone = [...torrents];
      torrentsClone.sort((a, b) => this.compare(a, b, this.getSortCol));

      if (this.getSelectSortReverse) torrentsClone.reverse();

      return torrentsClone;
    },
    successTorrent(response) {
      this.$store.commit(keyStore.SET_LIST_TORRENT, this.sortTorrents(response.data.arguments.torrents));
    },
    compare(a, b, col) {
      if (a[col] > b[col]) return 1;
      if (b[col] > a[col]) return -1;

      return 0;
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
