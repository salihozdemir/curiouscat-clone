<template>
  <div id="app">
    <app-header v-if="isAuthenticated"></app-header>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header/Header';
import { mapGetters } from 'vuex';
import tools from './tools/index.js';

export default {
  components: {
    appHeader: Header
  },
  computed: {
    ...mapGetters(['getToken']),
    isAuthenticated() {
      return this.getToken === '' ? false : true;
    }
  },
  created() {
    this.$store.commit('setToken', tools.cookie.get('access_token'));
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
