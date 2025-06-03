import { createRouter, createWebHistory } from 'vue-router';
import SearchHome from '../views/SearchHome.vue';

const routes = [
    {
        path: '/',
        name: 'SearchHome',
        component: SearchHome
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;