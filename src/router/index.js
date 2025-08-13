import { createRouter, createWebHistory } from "vue-router";
import History from "../components/StockHistory.vue";
import CashFlow from "../components/CashFlow.vue";
import DeepSui from '../components/pair/deep-sui.vue';
import CoinHistory from "@/components/CoinHistory.vue";
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
    path: '/coin-history/:coin',
    name: "coin",
    component: CoinHistory
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
