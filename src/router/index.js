import { createRouter, createWebHistory } from 'vue-router';
import SearchHome from '../views/SearchHome.vue';
import DestinationDetail from '../views/DestinationDetail.vue';

const routes = [
    {
        path: '/',
        name: 'SearchHome',
        component: SearchHome
    },
    {
        path: '/destination/:id',
        name: 'DestinationDetail',
        component: DestinationDetail,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;