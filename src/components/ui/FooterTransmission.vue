<template>
  <div>
    <footer>
      <b-navbar type="dark" variant="dark">
        <div class="input-group input-group-sm mr-1 w-50" >
          <div class="input-group-prepend">
            <button id="menuSettings" v-b-tooltip.hover :title="$t('message.footer.setting')" class="btn btn-outline-light" v-on:click="menuSettings">
                <b-icon icon="gear-fill"></b-icon>
            </button>
            <button v-b-tooltip.hover :title="$t('message.footer.prefs')" class="btn btn-outline-light" disabled>
              <b-icon icon="tools"></b-icon>
            </button>
            <button v-b-tooltip.hover :title="$t('message.footer.limits')" class="btn btn-outline-light" disabled>
              <b-icon icon="graph-down" ></b-icon>
            </button>
            <button v-b-tooltip.hover :title="$t('message.footer.compact')" class="btn btn-outline-light" disabled>
              <b-icon icon="arrows-collapse"></b-icon>
            </button>
            <span class="input-group-text">{{ lastNotification.timestamp | dateFormat('HH:mm:ss') }}</span>
          </div>
          <input type="text"
                 readonly
                 class="form-control notification-bar"
                 :value="lastNotification.message"
                 v-bind:class="{
                  'warn-notification': this.lastNotification.level === 'warn',
                  'info-notification': this.lastNotification.level === 'info',
                  'error-notification': this.lastNotification.level === 'error',
                  'success-notification': this.lastNotification.level === 'success' }"/>
          <div class="input-group-append">
            <button v-b-tooltip.hover :title="$t('message.footer.compact')" class="btn btn-light" disabled>
              <b-icon icon="chat-left-text"></b-icon>
            </button>
          </div>
        </div>
        <set-interval class="mr-1 ml-auto"></set-interval>
      </b-navbar>
    </footer>
    <menu-settings/>
  </div>
</template>

<script>
import MenuSettings from "@/components/MenuSettings";
import SetInterval from "@/components/SetInterval";
import key from "@/constantes/key.store.const";
import events from "@/constantes/event.const";
import bus from "@/config/bus.event";
import {mapGetters} from "vuex";

export default {
  name: 'footer-transmission',
  components: {
    MenuSettings,
    SetInterval
  },
  computed: {
    ...mapGetters({
      lastNotification: key.GET_LAST
    }),
  },
  methods: {
    menuSettings() {
      bus.$emit(events.SWITCH_MENU_SETTINGS);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notification-bar {
  background-color: #343a40 !important;
  border-right-color: #343a40;
}

.warn-notification {
  color: orangered;
}

.success-notification {
  color: #28a745;
}

.error-notification {
  color: #dc3545;
}

.info-notification {
  color: white;
}
</style>
