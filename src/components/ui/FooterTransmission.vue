<template>
  <div>
    <footer>
      <b-navbar type="dark" variant="dark">
        <b-button-toolbar>
          <b-button-group size="sm" class="mr-1" >
            <b-button size="sm" id="menuSettings" v-b-tooltip.hover :title="$t('message.footer.setting')" variant="light" v-on:click="menuSettings">
                <b-icon icon="gear-fill"></b-icon>
            </b-button>
            <b-button v-b-tooltip.hover :title="$t('message.footer.prefs')" variant="outline-light" disabled>
              <b-icon icon="tools"></b-icon>
            </b-button>
            <b-button v-b-tooltip.hover :title="$t('message.footer.limits')" variant="outline-light" disabled>
              <b-icon icon="graph-down" ></b-icon>
            </b-button>
            <b-button v-b-tooltip.hover :title="$t('message.footer.compact')" variant="outline-light" disabled>
              <b-icon icon="arrows-collapse"></b-icon>
            </b-button>
          </b-button-group>
        </b-button-toolbar>
        <set-interval class="mr-1 ml-auto"></set-interval>
      </b-navbar>
    </footer>
    <menu-settings/>
  </div>
</template>

<script>
import MenuSettings from "@/components/MenuSettings";
import SetInterval from "@/components/SetInterval";
import events from "@/constantes/key.event.const";
import bus from "@/config/bus.event";

export default {
  name: 'footer-transmission',
  components: {MenuSettings, SetInterval},
  methods: {
    menuSettings(event) {
      bus.$emit(events.SWITCH_MENU_SETTINGS, event.currentTarget.id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
