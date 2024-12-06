import { createRouter, createWebHistory } from "vue-router";
import History from "../components/StockHistory.vue";

const routes = [
  {
    path: "/history/:stock",
    name: "History",
    component: History,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
