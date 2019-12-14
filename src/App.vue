<template>
  <div id="app">
    <app-layout v-if="isAuthenticated">
      <router-view/>
    </app-layout>
    <router-view v-else></router-view>   
  </div>
</template>

<script>
import Layout from '@/components/Layout';
import { mapGetters } from 'vuex';
import common from '@/common/index.js';

export default {
  components: {
    appLayout: Layout
  },
  computed: {
    ...mapGetters(['getToken']),
    isAuthenticated() {
      return this.getToken === '' ? false : true;
    }
  },
  created() {
    this.$store.commit('setToken', common.cookie.get('access_token'));
  }
};
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
