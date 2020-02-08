import Vue from 'vue';
import VueRouter from 'vue-router';

import common from '@/common';

Vue.use(VueRouter);

const routes = [
  {
    path: '/Auth',
    name: 'Auth',
    component: () => import('@/views/Auth.vue')
  },
  {
    path: '/Profile/:username',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/Inbox',
    name: 'Inbox',
    component: () => import('@/views/Inbox.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/Notification',
    name: 'Notification',
    component: () => import('@/views/Notification.vue'),
  },
  {
    path: '/Discover',
    name: 'Discover',
    component: () => import('@/views/Discover.vue'),
  },
  {
    path: '*',
    component: () => import('@/views/Home.vue')
  }
];

const router = new VueRouter({
  routes,
  duplicateNavigationPolicy: 'reload' // other options: 'ignore' and 'reject'
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.name !== 'Auth') {
    if (!common.cookie.get('access_token')) {
      this.$message.error('Authorization fail, Please Login again.');
      next('/Auth'); 
    }
    else next();
  }
  else if (to.name === 'Auth') {
    if (common.cookie.get('access_token')) next('/Profile');
    else next();
  }
});