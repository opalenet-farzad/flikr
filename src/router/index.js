import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/flickr',
    name: 'flickr',
    component: () => import('../views/SearchImages.vue'),
  },
  {
    path: '*',
    name: 'err',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.replace({ path: '*', redirect: 'err' });

export default router;
