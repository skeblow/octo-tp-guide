import * as VueRouter from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import About from './components/About.vue';

const routes = [
    {
        path: '/',
        component: HelloWorld,
    },
    {
        path: '/about',
        component: About,
    }
];

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});
