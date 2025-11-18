import { createRouter, createWebHistory } from "vue-router";
import History from "../components/StockHistory.vue";
import CashFlow from "../components/CashFlow.vue";
import DeepSui from '../components/pair/deep-sui.vue';
import CoinHistory from "@/components/CoinHistory.vue";
import Future from '../components/LongFuture.vue';
import Asset from "@/components/Asset.vue";
import Deepbook from "@/components/deepbook/Deepbook.vue";
import OrderBook from "@/components/deepbook/OrderBook.vue";
import WhitelistTest from "@/components/deepbook/WhitelistTest.vue";
import QuantityCalculator from "@/components/deepbook/QuantityCalculator.vue";
import GridVisualizer from "@/components/GridVisualizer.vue";
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
  },
  {
    path: "/future/:coin",
    name: "future",
    component: Future,
  }, {
    path: "/asset",
    name: "asset",
    component: Asset,
  }, {
    path: '/deepbook',
    name: 'deepbook',
    component: Deepbook,
  }, {
    path: '/deepbook/orderbook',
    name: 'orderbook',
    component: OrderBook,
  }, {
    path: '/deepbook/whitelist',
    name: 'whitelist-test',
    component: WhitelistTest,
  }, {
    path: '/deepbook/calculator',
    name: 'quantity-calculator',
    component: QuantityCalculator,
  }, {
    path: '/grid/visualizer',
    name: 'grid-visualizer',
    component: GridVisualizer,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
