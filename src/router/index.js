import { createRouter, createWebHistory } from "vue-router";
import History from "../components/StockHistory.vue";
import Trade from '../components/TradeHistory.vue'
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
    path: "/trade/:coin" ,
    name: "trade",
    component: Trade
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
