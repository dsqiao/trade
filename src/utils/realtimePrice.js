import { ref, watch, onUnmounted } from 'vue';

// Finnhub API Token，从环境变量读取（在项目根目录 .env 中配置 VITE_FINNHUB_TOKEN=你的key）
// 免费申请：https://finnhub.io/register
const FINNHUB_TOKEN = import.meta.env.VITE_FINNHUB_TOKEN;
const WS_URL = `wss://ws.finnhub.io?token=${FINNHUB_TOKEN}`;

/**
 * 实时美股价格（基于 Finnhub WebSocket 推送）
 * - 通过 WebSocket 订阅 trade 事件，成交时即时推送价格
 * - 切换股票时自动取消旧订阅、订阅新代码
 * - 连接断开时自动重连
 * - 额外用一次 REST /quote 拉取初始快照，使非交易时段也能显示最近价
 * @param {import('vue').Ref<string> | (() => string)} symbolSource 股票代码（ref 或返回字符串的函数）
 * @returns {{ price: import('vue').Ref<number>, isLive: import('vue').Ref<boolean>, error: import('vue').Ref<any>, close: Function }}
 */
export function useRealtimePrice(symbolSource) {
  const price = ref(0);       // 最新价（0 表示尚未取到）
  const isLive = ref(false);  // 是否已取到有效价格
  const error = ref(null);    // 最近一次错误

  let ws = null;
  let currentSymbol = '';
  let reconnectTimer = null;
  let manualClosed = false;

  const getSymbol = () => {
    const s = typeof symbolSource === 'function' ? symbolSource() : symbolSource?.value;
    return s ? String(s).toUpperCase() : '';
  };

  const send = (obj) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(obj));
    }
  };

  const subscribe = (symbol) => symbol && send({ type: 'subscribe', symbol });
  const unsubscribe = (symbol) => symbol && send({ type: 'unsubscribe', symbol });

  // 初始快照：WebSocket 仅在成交时推送，非交易时段无数据，故先用 REST 取一次最近价
  async function fetchSnapshot(symbol) {
    if (!FINNHUB_TOKEN) return;
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_TOKEN}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // 仅当仍是当前股票、且尚未收到 WS 推送时才采用快照值
      if (json && typeof json.c === 'number' && json.c > 0 && currentSymbol === symbol) {
        price.value = json.c;
        isLive.value = true;
      }
    } catch (e) {
      // 快照失败不影响 WS，忽略
    }
  }

  function connect() {
    if (!FINNHUB_TOKEN) {
      // 未配置 token，静默跳过（继续使用写死的兜底价格）
      return;
    }
    manualClosed = false;
    ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      error.value = null;
      if (currentSymbol) subscribe(currentSymbol);
    };

    ws.onmessage = (evt) => {
      let msg;
      try {
        msg = JSON.parse(evt.data);
      } catch {
        return;
      }
      if (msg.type === 'trade' && Array.isArray(msg.data)) {
        // 取本批中当前股票的最后一笔成交价
        const trades = msg.data.filter((t) => t.s === currentSymbol);
        if (trades.length) {
          price.value = trades[trades.length - 1].p;
          isLive.value = true;
        }
      }
    };

    ws.onerror = (e) => {
      error.value = e;
      console.error('Finnhub WebSocket 错误:', e);
    };

    ws.onclose = () => {
      ws = null;
      isLive.value = false;
      // 非主动关闭则自动重连
      if (!manualClosed) {
        reconnectTimer = setTimeout(connect, 3000);
      }
    };
  }

  function close() {
    manualClosed = true;
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (ws) {
      if (currentSymbol) unsubscribe(currentSymbol);
      ws.close();
      ws = null;
    }
  }

  // 股票代码变化时切换订阅
  watch(
    () => getSymbol(),
    (newSymbol, oldSymbol) => {
      if (oldSymbol) unsubscribe(oldSymbol);
      currentSymbol = newSymbol;
      isLive.value = false;
      price.value = 0;
      if (!newSymbol) return;
      fetchSnapshot(newSymbol);        // 立即给一个最近价
      if (!ws) connect();              // 未连接：建立连接（onopen 后自动订阅）
      else subscribe(newSymbol);       // 已连接：直接订阅新代码
    },
    { immediate: true }
  );

  onUnmounted(close);

  return { price, isLive, error, close };
}
