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
    path: '/Profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/Inbox',
    name: 'Inbox',
    component: () => import('@/views/Inbox.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;

// Tüm router işlemlerinde token kontrolü yapılıyor. Eğer kullanıcı Auth ekranından başka bir sayfaya istek gönderdiğinde ve token'a sahip değilse Auth ekranına gönder. Auth ekranına gitmek istediğinde ise token'ı var ise Profile sayfasına yönlendirir.

router.afterEach(to => {
  if (to.name !== 'Auth') {
    if (!common.cookie.get('access_token')) {
      router.push({ name: 'Auth' });
    }
  }
  if (to.name === 'Auth') {
    if (common.cookie.get('access_token')) {
      router.push({ name: 'Profile' });
    }
  }
});
