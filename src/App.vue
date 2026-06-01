<script setup>
import { BUY } from './data/const.js';

const modules = import.meta.glob('./data/stock/*.js', { eager: true });

function getHolding(data) {
  let holding = 0;
  for (const month of data) {
    for (const tran of month.trans) {
      if (tran.direction === BUY) {
        holding += tran.number;
      } else {
        holding -= tran.number;
      }
    }
  }
  return holding;
}

const stocks = Object.entries(modules).map(([ path, mod ]) => {
  const fileName = path.split('/').pop().replace('.js', '');
  return {
    name: fileName.toUpperCase(),
    path: `/history/${fileName}`,
    data: mod.data,
  };
});

const holdingStocks = stocks.filter(s => getHolding(s.data) > 0);
const clearedStocks = stocks.filter(s => getHolding(s.data) <= 0);
</script>

<template>
  <Suspense>
    <div class="window">
      <div class="tab">
        <span>美股:</span>
        <div class="link"
             v-for="s in holdingStocks"
             :key="s.name"
        >
          <router-link :to="s.path">{{ s.name }}</router-link>
        </div>
        <span>（已清仓：</span>
        <div class="link"
             v-for="s in clearedStocks"
             :key="s.name"
        >
          <router-link :to="s.path">{{ s.name }}</router-link>
        </div>
        <span>）</span>
      </div>
      <div class="tab">
        crypto:
        <div class="link"><router-link to="/coin-history/sui">SUI-USDC</router-link></div>
        <div class="link"><router-link to="/coin-history/deep">DEEP-USDC</router-link></div>
        <div class="link"><router-link to="/deep-sui">DEEP-SUI</router-link></div>
        <div class="link"><router-link to="/coin-history/ns">NS-USDC</router-link></div>
        <div class="link"><router-link to="/coin-history/wal">WAL-USDC</router-link></div>
        <div class="link"><RouterLink to="/coin-history/jitosol">JitoSOL-USDC</RouterLink></div>
      </div>
      <div class="tab">
        其他：
        <div class="link"><router-link to="/cashflow">crypto出入金</router-link></div>
        <div class="link"><router-link to="/future/btc">long btc</router-link></div>
        <div class="link"><router-link to="/asset">Asset</router-link></div>
        <div class="link"><router-link to="/deepbook">Deepbook</router-link></div>
        <div class="link"><router-link to="/deepbook/orderbook">OrderBook</router-link></div>
        <div class="link"><router-link to="/deepbook/whitelist">WhitelistTest</router-link></div>
        <div class="link"><router-link to="/deepbook/calculator">QuantityCalculator</router-link></div>
        <div class="link"><router-link to="/grid/visualizer">Grid Visualizer</router-link></div>
      </div>
      <router-view :key="$route.fullPath" />
    </div>
  </Suspense>
</template>

<style scoped>
.tab {
  display: flex;
  flex-direction: row;
  height: 3rem;
}

.link {
  margin: 0 30px;
}

.link a,
.tab {
  font-size: 1.4rem;
  line-height: 1.4rem;
  color: rgb(166, 166, 166);
}

.window {
  min-height: 100vh;
}
</style>
