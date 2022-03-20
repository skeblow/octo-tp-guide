import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
  },
  {
    path: '/items',
    name: 'items',
    component: () => import(/* webpackChunkName: "items" */ '../pages/Items.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
