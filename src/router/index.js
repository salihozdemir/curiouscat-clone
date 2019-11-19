import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/Auth',
    name: 'Auth',
    component: () => import('../components/Auth/Auth.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
