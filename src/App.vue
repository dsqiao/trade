<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue';
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
const collapsed = ref(true); // 侧边导航折叠状态，默认折叠
const sidebarRef = ref(null);

// 点击导航外部区域时关闭导航
function handleClickOutside(e) {
  if (sidebarRef.value && !sidebarRef.value.contains(e.target)) {
    collapsed.value = true;
  }
}

// 导航展开时监听全局点击，收起时移除监听
watch(collapsed, (isCollapsed) => {
  if (!isCollapsed) {
    // 延后到下一帧再绑定，避免触发"打开"的本次点击立即把它关掉
    nextTick(() => document.addEventListener('mousedown', handleClickOutside));
  } else {
    document.removeEventListener('mousedown', handleClickOutside);
  }
});

onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside));
</script>

<template>
  <Suspense>
    <div
      class="window"
      :class="{ 'nav-collapsed': collapsed }"
    >
      <aside
        ref="sidebarRef"
        class="sidebar"
      >
        <button
          class="sidebar-toggle"
          :title="collapsed ? '展开导航' : '收起导航'"
          @click="collapsed = !collapsed"
        >
          <span class="toggle-icon">{{ collapsed ? '☰' : '✕' }}</span>
        </button>

        <nav
          v-show="!collapsed"
          class="nav"
        >
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
            </div>
          </div>
        </nav>
      </aside>

      <main class="content">
        <router-view :key="$route.fullPath" />
      </main>
    </div>
  </Suspense>
</template>

<style scoped>
.window {
  min-height: 100vh;
}

/* 左侧悬浮栏：始终浮于内容之上，不占用主内容区 */
.sidebar {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 220px;
  max-height: calc(100vh - 60px);
  padding: 14px;
  border-radius: 14px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
  overflow-y: auto;
  transition: width 0.25s ease, padding 0.25s ease;
}

.nav-collapsed .sidebar {
  width: 46px;
  padding: 10px 7px;
  gap: 0;
}

/* 折叠按钮 */
.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.sidebar-toggle:hover {
  background: rgba(99, 130, 255, 0.25);
  color: #fff;
}

.toggle-icon {
  font-size: 1rem;
  line-height: 1;
}

/* 主内容区：全宽，不被侧栏挤压 */
.content {
  width: 100%;
  min-width: 0;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.nav-group {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
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
  flex-direction: column;
  align-items: stretch;
  gap: 2px;
}

.nav-link {
  font-size: 0.85rem;
  color: rgba(200, 200, 220, 0.8);
  text-decoration: none;
  padding: 6px 12px;
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
  padding: 5px 12px;
  border-radius: 4px;
  user-select: none;
  transition: all 0.2s ease;
}

.cleared-toggle:hover {
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.05);
}
</style>
