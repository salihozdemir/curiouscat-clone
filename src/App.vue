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
    this.$store.commit('setRandomUsers', []);
    this.$message.config({top: '55px'});
  }
};
</script>

<style>
.ant-layout {
  background-color: #f0f2f5;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.ant-comment-content-detail p {
  white-space: normal;
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

.ant-form-explain {
  color: #f5222d;
  text-align: center;
}

.ant-modal-title {
  text-align: center;
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
  width: max-content;
}

.ant-comment-inner {
    padding: 7px 0px 0px 0px;
}

#notification-card .ant-comment-avatar {
  align-self: center;
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

  #whoToFollow {
    display: none;
  }
}
</style>
