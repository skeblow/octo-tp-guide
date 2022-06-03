import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/lists',
        name: 'lists',
        component: () => import(/* webpackChunkName: "about" */ '../pages/Lists.vue'),
    },
    {
        path: '/calculator',
        name: 'calculator',
        component: () => import(/* webpackChunkName: "calculator" */ '../pages/Calculator.vue'),
    },
    {
        path: '/items',
        name: 'items',
        component: () => import(/* webpackChunkName: "items" */ '../pages/Items.vue'),
    },
    {
        path: '/token',
        name: 'token',
        component: () => import(/* webpackChunkName: "token" */ '../pages/Token.vue'),
    },
    {
        path: '/shopping',
        name: 'shopping',
        component: () => import(/* webpackChunkName: "shopping" */ '../pages/Shopping.vue'),
    },
    {
        path: '/cancel-tp',
        name: 'cancel-tp',
        component: () => import(/* webpackChunkName: "cancel-tp" */ '../pages/CancelTp.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
