import Vue from 'vue';
import VueRouter from 'vue-router';

// import tools from '@/tools';

Vue.use(VueRouter);

const routes = [
  {
    path: '/Authv2',
    name: 'Auth',
    component: () => import('../components/Auth/Authv2.vue')
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('../components/Profile/Profile.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../components/Auth/Loginv2.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../components/Auth/Signupv2.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;

// Tüm router işlemlerinde token kontrolü yapılıyor. Eğer kullanıcı Auth ekranından başka bir sayfaya istek gönderdiğinde ve token'a sahip değilse Auth ekranına gönder. Auth ekranına gitmek istediğinde ise token'ı var ise Profile sayfasına yönlendirir.

// router.afterEach(to => {
//   if (to.name !== 'Auth') {
//     if (!tools.cookie.get('access_token')) {
//       router.push({ name: 'Auth' });
//     }
//   }
//   if (to.name === 'Auth') {
//     if (tools.cookie.get('access_token')) {
//       router.push({ name: 'Profile' });
//     }
//   }
// });
