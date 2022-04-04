import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '../pages/HelloWorld.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HelloWorld,
  },
  {
    path: '/lists',
    name: 'lists',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Lists.vue')
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
