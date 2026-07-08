import { createRouter, createWebHistory } from "vue-router";
import History from "../components/StockHistory.vue";
import CashFlow from "../components/CashFlow.vue";
import DeepSui from '../components/pair/deep-sui.vue';
import CoinHistory from "@/components/CoinHistory.vue";
import Future from '../components/LongFuture.vue';
import Asset from "@/components/Asset.vue";
import SubOverview from "@/components/sub/SubOverview.vue";
import SubFunding from "@/components/sub/SubFunding.vue";
import SubExchange from "@/components/sub/SubExchange.vue";
import SubAsset from "@/components/sub/SubAsset.vue";

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
    path: "/sub",
    name: "sub-overview",
    component: SubOverview,
  }, {
    path: "/sub/funding",
    name: "sub-funding",
    component: SubFunding,
  }, {
    path: "/sub/exchange",
    name: "sub-exchange",
    component: SubExchange,
  }, {
    path: "/sub/asset",
    name: "sub-asset",
    component: SubAsset,
  }, {
    path: "/sub/history/:stock",
    name: "sub-history",
    component: History,
    meta: { account: 'sub' },
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
