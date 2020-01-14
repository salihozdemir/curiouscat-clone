<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header id="header" class="custom-header">
      <a-menu theme="light" mode="horizontal">
        <a-menu-item key="1">
          <router-link to="/" tag="a">
            <a-icon type="home" />
            <span class="nav-text">Home</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/Discover" tag="a">
            <a-icon type="search" />
            <span class="nav-text">Discover</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link :to="'/Profile/' + this.loginUserName" tag="a">
            <a-icon type="profile" />
            <span class="nav-text">Profile</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/Inbox" tag="a">
            <a-icon type="inbox" />
            <span class="nav-text">Inbox</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link to="/Notification" tag="a">
          <!-- TODO: ekran küçülünce olacak olan offset :offset="[6,-1]" -->
            <a-badge :count="9" :offset="[-5,-5]">
              <a-icon type="notification" />
            </a-badge>
            <span class="nav-text">Notification</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-content class="layout-content">
        <a-row type="flex" justify="center">
          <a-col :xs="24" :sm="20" :md="18">
            <slot></slot>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['loginUserName'])
  },
};
</script>

<style scope>

.layout-content {
  padding: 0px 50px; 
  margin-top: 50px;
}

.custom-header {
  position: fixed;
  z-index: 1;
  width: 100%;
  background: none;
  padding: unset;
  text-align: center;
  height: unset;
  box-shadow: 0 0px 4px 0 rgba(0,0,0,0.2);
}
</style>
