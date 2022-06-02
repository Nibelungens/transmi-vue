<script setup lang="ts">
import RefreshWidget from "../widgets/RefreshWidget.vue";
</script>

<template>
  <div>
    <footer>
      <nav class="navbar-dark bg-dark fixed-bottom navbar-trv">
        <div class="container-fluid h-100">
          <div class="row justify-content-end h-100">
            <div class="col-sm-1 my-auto">
              <refresh-widget/>
            </div>
          </div>
        </div>
      </nav>
    </footer>
  </div>
</template>

<style scoped>
.navbar-trv {
  height: 50px;
  background: #343a40 !important;
  align-content: flex-start;
}
</style>