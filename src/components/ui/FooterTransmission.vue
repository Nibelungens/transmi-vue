<template>
  <footer>
    <b-navbar type="dark" variant="dark">
      <b-button-toolbar>
        <b-button-group size="sm" class="mr-1" >
          <b-button title="Setting Menu" variant="outline-light" disabled>
            <b-icon icon="gear-fill"></b-icon>
          </b-button>
          <b-button title="Edit Preference..." variant="outline-light" disabled>
            <b-icon icon="tools"></b-icon>
          </b-button>
          <b-button title="Click to Enable Temporary Speed Limits" variant="outline-light" disabled>
            <b-icon icon="graph-down" ></b-icon>
          </b-button>
          <b-button title="Compact View" variant="outline-light" disabled>
            <b-icon icon="arrows-collapse"></b-icon>
          </b-button>
        </b-button-group>
      </b-button-toolbar>
    </b-navbar>
  </footer>
</template>

<script>
export default {
  name: 'footer-transmission'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
