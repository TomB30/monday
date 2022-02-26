<template>
  <section id="app">
    <app-header></app-header>
    <router-view></router-view>
  </section>
</template>

<script>
import appHeader from './cmps/app-header.vue'
export default {
  components:{
    appHeader
  }
};
</script>
