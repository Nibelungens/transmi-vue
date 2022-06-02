<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>

<template>
  <div>
    <header>
      <nav class="navbar-dark bg-dark fixed-top navbar-trv">
        <div class="container-fluid h-100">
          <div class="row mt-1">
            <div class="col-2 text-start">
              <div class="navbar-brand d-inline-flex">
                <img src="/logo.svg" class="img-trv pr-2" alt="logo">
                <h5 class="mx-2 my-auto font-weight-bold text-light">{{ t('title') }}</h5>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.navbar-trv {
  height: 50px;
  background: #343a40 !important;
  align-content: flex-start;
}

.img-trv {
  width: 20pt;
  filter: brightness(0) saturate(100%) invert(58%) sepia(32%) saturate(3195%) hue-rotate(322deg) brightness(108%) contrast(104%);
}
</style>

<i18n>
en:
  title: 'Transmi(vue)'
fr:
  title: 'Transmi(vue)'
</i18n>