<template>
  <a-layout id="components-layout-demo-responsive" style="min-height: 100vh">
    <a-layout-sider
      breakpoint="xs"
      collapsedWidth="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
      theme="light"
    >
      <div class="logo">Question</div>
      <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']">
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
          <router-link to="/Profile" tag="a">
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
            <a-icon type="notification" />
            <span class="nav-text">Notification</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <a-row type="flex" justify="center">
          <a-col :xs="24" :sm="20" :md="18" >
            <slot></slot>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    }
  }
};
</script>

<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

body {
  background-color: whitesmoke;
}
</style>
