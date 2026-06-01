<script setup>
import { ref } from 'vue';
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
const showCleared = ref(false);
</script>

<template>
  <Suspense>
    <div class="window">
      <nav class="nav">
        <div class="nav-group">
          <span class="nav-label">美股</span>
          <div class="nav-links">
            <router-link
              v-for="s in holdingStocks"
              :key="s.name"
              :to="s.path"
              class="nav-link"
            >{{ s.name }}</router-link>
            <span
              class="cleared-toggle"
              @click="showCleared = !showCleared"
            >
              已清仓 {{ showCleared ? '▾' : '▸' }}
            </span>
            <template v-if="showCleared">
              <router-link
                v-for="s in clearedStocks"
                :key="s.name"
                :to="s.path"
                class="nav-link cleared"
              >{{ s.name }}</router-link>
            </template>
          </div>
        </div>

        <div class="nav-group">
          <span class="nav-label">Crypto</span>
          <div class="nav-links">
            <router-link
              to="/coin-history/sui"
              class="nav-link"
            >SUI-USDC</router-link>
            <router-link
              to="/coin-history/deep"
              class="nav-link"
            >DEEP-USDC</router-link>
            <router-link
              to="/deep-sui"
              class="nav-link"
            >DEEP-SUI</router-link>
            <router-link
              to="/coin-history/ns"
              class="nav-link"
            >NS-USDC</router-link>
            <router-link
              to="/coin-history/wal"
              class="nav-link"
            >WAL-USDC</router-link>
            <router-link
              to="/coin-history/jitosol"
              class="nav-link"
            >JitoSOL-USDC</router-link>
          </div>
        </div>

        <div class="nav-group">
          <span class="nav-label">其他</span>
          <div class="nav-links">
            <router-link
              to="/cashflow"
              class="nav-link"
            >crypto出入金</router-link>
            <router-link
              to="/future/btc"
              class="nav-link"
            >long btc</router-link>
            <router-link
              to="/asset"
              class="nav-link"
            >Asset</router-link>
            <router-link
              to="/deepbook"
              class="nav-link"
            >Deepbook</router-link>
            <router-link
              to="/deepbook/orderbook"
              class="nav-link"
            >OrderBook</router-link>
            <router-link
              to="/deepbook/whitelist"
              class="nav-link"
            >WhitelistTest</router-link>
            <router-link
              to="/deepbook/calculator"
              class="nav-link"
            >QuantityCalculator</router-link>
            <router-link
              to="/grid/visualizer"
              class="nav-link"
            >Grid Visualizer</router-link>
          </div>
        </div>
      </nav>

      <router-view :key="$route.fullPath" />
    </div>
  </Suspense>
</template>

<style scoped>
.window {
  min-height: 100vh;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.nav-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.4);
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  white-space: nowrap;
}

.nav-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.nav-link {
  font-size: 0.85rem;
  color: rgba(200, 200, 220, 0.8);
  text-decoration: none;
  padding: 5px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: #fff;
  background: rgba(99, 130, 255, 0.15);
}

.nav-link.router-link-active {
  color: #fff;
  background: rgba(99, 130, 255, 0.25);
  box-shadow: 0 0 8px rgba(99, 130, 255, 0.2);
}

.nav-link.cleared {
  color: rgba(160, 160, 180, 0.5);
  font-style: italic;
}

.nav-link.cleared:hover {
  color: rgba(200, 200, 220, 0.8);
  background: rgba(255, 255, 255, 0.06);
}

.cleared-toggle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  user-select: none;
  transition: all 0.2s ease;
}

.cleared-toggle:hover {
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.05);
}
</style>
