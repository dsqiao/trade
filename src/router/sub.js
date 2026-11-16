import { createRouter, createWebHashHistory } from 'vue-router';
import SubOverview from '../components/sub/SubOverview.vue';
import SubFunding from '../components/sub/SubFunding.vue';
import SubExchange from '../components/sub/SubExchange.vue';
import SubStockHistory from '../components/sub/SubStockHistory.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/sub' },
    { path: '/sub', component: SubOverview },
    { path: '/sub/funding', component: SubFunding },
    { path: '/sub/exchange', component: SubExchange },
    { path: '/sub/history/:stock', component: SubStockHistory },
    { path: '/:pathMatch(.*)*', redirect: '/sub' },
  ],
});

export default router;
