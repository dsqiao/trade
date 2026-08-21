import { reactive, ref, watch, onUnmounted } from 'vue';

// 加密货币实时价格（基于 Coinbase 公开行情接口，无需 API Key）
// - 用 REST /v2/prices/<COIN>-USD/spot 拉取现货价
// - 多币种并发请求，单币失败不影响其它币
// - 币种列表变化时自动重新拉取；组件卸载时停止轮询
//
// 为什么用 Coinbase：
//   CoinGecko 免费版限频很严（共享 IP，几次就 429）；Coinbase 现货价接口无需鉴权、
//   限频宽松（未鉴权约每小时上万次/IP），且直接用币种符号，无需维护 id 映射。
//
// 接口示例（无需鉴权）：
//   https://api.coinbase.com/v2/prices/ETH-USD/spot
//   返回：{ "data": { "amount": "2374.49", "base": "ETH", "currency": "USD" } }

const COINBASE_BASE = 'https://api.coinbase.com/v2/prices';
const DEFAULT_INTERVAL = 30000; // 轮询间隔（毫秒）

// 取单个币种的现货价（USD）。返回数字，失败返回 null。
async function fetchSpotPrice(coin) {
  const sym = String(coin).toUpperCase();
  const url = `${COINBASE_BASE}/${encodeURIComponent(sym)}-USD/spot`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const p = Number(json?.data?.amount);
  return Number.isFinite(p) && p > 0 ? p : null;
}

/**
 * 多币种实时价格
 * @param {import('vue').Ref<string[]> | (() => string[]) | string[]} coinsSource 币种数组（ref / 函数 / 静态数组）
 * @param {{ intervalMs?: number }} [options]
 * @returns {{ prices: Record<string, number>, error: import('vue').Ref<any>, loading: import('vue').Ref<boolean>, refresh: Function, close: Function }}
 */
export function useCryptoPrices(coinsSource, options = {}) {
  const intervalMs = options.intervalMs || DEFAULT_INTERVAL;
  const prices = reactive({}); // { COIN(大写): 最新价 }
  const error = ref(null);
  const loading = ref(false);

  let timer = null;
  let stopped = false;

  const getCoins = () => {
    const arr = typeof coinsSource === 'function'
      ? coinsSource()
      : (coinsSource && coinsSource.value !== undefined ? coinsSource.value : coinsSource);
    return [ ...new Set((arr || []).map(c => String(c).toUpperCase())) ].filter(Boolean);
  };

  async function fetchOnce() {
    const coins = getCoins();
    if (!coins.length) return;
    loading.value = true;
    try {
      // 各币种并发请求，单币失败不影响其它币（币种少，并发无压力）
      const results = await Promise.allSettled(coins.map(c => fetchSpotPrice(c)));
      let anyOk = false;
      let lastErr = null;
      results.forEach((r, i) => {
        const coin = coins[i];
        if (r.status === 'fulfilled') {
          if (r.value != null) { prices[coin] = r.value; anyOk = true; }
        } else {
          lastErr = r.reason;
        }
      });
      // 有任意成功就清空错误；全部失败才记录（保留上次价格 / 调用方兜底）
      error.value = anyOk ? null : lastErr;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  }

  function start() {
    stop();
    if (stopped) return;
    fetchOnce();
    timer = setInterval(fetchOnce, intervalMs);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function close() {
    stopped = true;
    stop();
  }

  // 币种列表变化时重启轮询
  watch(() => getCoins().join(','), () => start(), { immediate: true });

  onUnmounted(close);

  return { prices, error, loading, refresh: fetchOnce, close };
}
