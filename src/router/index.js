import { createRouter, createWebHistory } from "vue-router";
import History from "../components/StockHistory.vue";
import SuiUsdc from '../components/pair/sui-usdc.vue';
import CashFlow from "../components/CashFlow.vue";
import DeepUsdc from "../components/pair/deep-usdc.vue";
import DeepSui from '../components/pair/deep-sui.vue';
import NsSui from '../components/pair/ns-usdc.vue';
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
    path: '/ns-usdc',
    name: 'NsSui',
    component: NsSui
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
