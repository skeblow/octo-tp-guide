import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '../pages/HelloWorld.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HelloWorld,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import(/* webpackChunkName: "calculator" */ '../pages/Calculator.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router
