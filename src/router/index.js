import { createRouter, createWebHistory } from "vue-router";
import History from "../components/StockHistory.vue";
import Trade from '../components/TradeHistory.vue';
import CashFlow from "../components/CashFlow.vue";
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
    path: "/trade/:coin",
    name: "trade",
    component: Trade
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
