<template>
  <div id="app">
    <app-layout v-if="isAuthenticated">
      <router-view />
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
    ...mapGetters(['token']),
    isAuthenticated() {
      return !!this.token;
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

.ant-comment-actions > li {
  float: right;
}

.border-bottom-0 {
  border-bottom: none !important;
}

@media screen and (max-width: 560px) {
  .nav-text {
    display: none;
  }
  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    margin-right: unset;
    font-size: 17px;
  }
}
</style>
