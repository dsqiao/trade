import { createRouter, createWebHistory } from "vue-router";
import History from "../components/StockHistory.vue";
import SuiUsdc from '../components/TradeHistory.vue';
import CashFlow from "../components/CashFlow.vue";
import DeepUsdc from "../components/deep-usdc.vue";
import DeepSui from '../components/deep-sui.vue';
const routes = [
  {
    path: "/",
  },
  {
    path: "/history/:stock",
    name: "History",
    component: History,
  },
  {
    path: "/sui-usdc",
    name: "sui-usdc",
    component: SuiUsdc
  },
  {
    path: '/deep-usdc',
    name: "deep-usdc",
    component: DeepUsdc
  },
  {
    path: '/deep-sui',
    name: "deep-sui",
    component: DeepSui
  },
  {
    path: "/cashflow",
    name: "cashflow",
    component: CashFlow,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
