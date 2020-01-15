<template>
  <div id="app">
    <layout v-if="isAuthenticated">
      <router-view />
    </layout>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import Layout from '@/components/Layout';
import { mapGetters } from 'vuex';
import common from '@/common/index.js';

export default {
  components: {
    Layout,
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
.ant-layout {
  background-color: #f0f2f5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%2357bad3' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23a8c7d3' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%2358bbd3' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%239fc6d4' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%2359bbd3' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%2395c5d4' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%235abcd3' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%238ac4d4' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%235bbcd3' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%237fc3d4' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%235cbdd3' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%2373c2d3' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

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

.ant-comment-avatar img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    padding: 2px;
    border: 2px solid rgba(0,0,0,.1);
}

.ant-list-item-meta-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 2px;
  border: 2px solid rgba(0,0,0,.1);
}
.ant-list-item-meta-description {
  font-size: 15px;
  color: #929292;
}

.ant-comment-inner {
    padding: 7px 0px 0px 0px;
}

#discover .ant-list-header{
  border-bottom: unset;
}

#discover .ant-list-empty-text{
  display: none;
}

#inbox-card .ant-comment-actions{
  display: flex;
  flex-flow: row-reverse;
  font-size: 15px;
}

#header .anticon {
  transform: scale(1.3);
}

a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 576px) {
  .nav-text {
    display: none;
  }
  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    margin-right: unset;
    font-size: 17px;
  }
  .ant-badge-count {
    right: -6px !important;
    margin-top: unset !important;
  }
}
</style>
