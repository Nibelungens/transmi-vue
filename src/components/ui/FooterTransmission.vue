<template>
  <footer>
    <b-navbar type="dark" variant="dark">
      <b-button-toolbar>
        <b-button-group size="sm" class="mr-1" >
          <b-dropdown size="sm" dropup :title="$t('message.footer.setting')" variant="outline-light">
            <template v-slot:button-content>
              <b-icon icon="gear-fill"></b-icon>
            </template>
            <b-dropdown-item href="#" class="m-row" disabled>{{$t('message.footer.about')}}</b-dropdown-item>
            <b-dropdown-divider class="m-row"></b-dropdown-divider>
            <b-dropdown-item href="#" class="m-row" disabled>{{$t('message.footer.homepage')}}</b-dropdown-item>
            <b-dropdown-item href="#" class="m-row" disabled>{{$t('message.footer.jar')}}</b-dropdown-item>
            <b-dropdown-divider class="m-row"></b-dropdown-divider>
            <b-dropdown-item href="#" class="m-row" disabled>{{$t('message.footer.statistics')}}</b-dropdown-item>
            <b-dropdown-divider class="m-row"></b-dropdown-divider>
            <b-dropdown-item href="#" class="m-row" disabled>{{$t('message.footer.downloadRate')}}</b-dropdown-item>
            <b-dropdown-item href="#" class="m-row" disabled>{{$t('message.footer.uploadRate')}}</b-dropdown-item>
            <b-dropdown-divider class="m-row"></b-dropdown-divider>
            <b-dropdown-item href="#" class="m-row" disabled>{{$t('message.footer.sortTransferts')}}</b-dropdown-item>
          </b-dropdown>
          <b-button :title="$t('message.footer.prefs')" variant="outline-light" disabled>
            <b-icon icon="tools"></b-icon>
          </b-button>
          <b-button :title="$t('message.footer.limits')" variant="outline-light" disabled>
            <b-icon icon="graph-down" ></b-icon>
          </b-button>
          <b-button :title="$t('message.footer.compact')" variant="outline-light" disabled>
            <b-icon icon="arrows-collapse"></b-icon>
          </b-button>
        </b-button-group>
      </b-button-toolbar>
      <set-interval class="mr-1 ml-auto"></set-interval>
    </b-navbar>
  </footer>
</template>

<script>
import SetInterval from "@/components/SetInterval";

export default {
  name: 'footer-transmission',
  components: {SetInterval},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-row {
  margin: -5px -5px -5px -5px;
  font-size: smaller;
  border-bottom-style: hidden;
}
</style>
