<template>
  <div class="grid-page">
    <header class="page-header">
      <h1 class="page-title">网格单 Dashboard</h1>
    </header>

    <!-- 顶部总览 -->
    <div class="stat-grid overview">
      <div class="stat-card">
        <div class="stat-label">运行中 / 总数</div>
        <div class="stat-value">{{ runningCount }} <span class="unit">/ {{ totalCount }}</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">涉及币种</div>
        <div class="stat-value">{{ coinGroups.length }} <span class="unit">种</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">总投入本金</div>
        <div class="stat-value">{{ totalPrincipal.toFixed(0) }} <span class="unit">U</span></div>
      </div>
    </div>

    <!-- 按币种分组：每个币种一条共享价格轴 -->
    <section
      v-for="group in coinGroups"
      :key="group.coin"
      class="coin-section"
    >
      <div class="coin-header">
        <div class="coin-title">
          <span class="coin-name">{{ group.coin }}</span>
          <span class="coin-price"
                v-if="group.price != null"
          >
            当前价 {{ formatNum(group.price) }}
          </span>
          <span class="coin-price no-price"
                v-else
          >未记录当前价</span>
        </div>
        <div class="coin-summary">
          <span>运行中 {{ group.runningCount }} / 共 {{ group.grids.length }} 单</span>
          <span>投入 {{ group.principal.toFixed(0) }} U</span>
        </div>
      </div>

      <!-- 共享价格轴：所有单子作为区间条叠加，当前价为贯穿竖线 -->
      <div class="axis-block"
           v-if="group.axis"
      >
        <PriceRangeAxis
          :min-price="group.axis.min"
          :max-price="group.axis.max"
          :positions="group.positions"
          :markers="group.markers"
          :tick-step="group.axis.tickStep"
          :decimals="group.axis.decimals"
        />
      </div>
      <div class="axis-missing"
           v-else
      >
        该币种暂无有效网格单，无法计算展示区间。
      </div>

      <!-- 轴下：紧凑指标表，每单一行 -->
      <div class="grid-table-wrap">
        <table class="grid-table">
          <thead>
            <tr>
              <th>单</th>
              <th>区间</th>
              <th>网格数</th>
              <th>每格价差</th>
              <th>每格金额</th>
              <th>运行天数</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="g in group.grids"
              :key="g.id"
              :class="{ stopped: g.status !== RUNNING }"
            >
              <td class="cell-id">
                <span class="color-chip"
                      :style="{ background: g.color || '#888' }"
                />
                {{ g.id }}
              </td>
              <td class="mono">{{ formatNum(g.lower) }} – {{ formatNum(g.upper) }}</td>
              <td>{{ g.gridCount }}</td>
              <td class="mono">{{ formatNum(gridStep(g)) }}</td>
              <td class="mono">{{ (g.principal / g.gridCount).toFixed(1) }} U</td>
              <td>{{ runDays(g) }} 天</td>
              <td>
                <span class="status-dot"
                      :class="g.status === RUNNING ? 'on' : 'off'"
                />
                {{ g.status === RUNNING ? '运行' : '停止' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div v-if="!coinGroups.length"
         class="empty"
    >
      暂无网格单，去 <code>src/data/grid/</code> 添加一个吧。
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RUNNING } from '@/data/const.js';
import { currentPrice } from '@/data/grid/price.js';
import { useCryptoPrices } from '@/utils/cryptoPrice.js';
import PriceRangeAxis from '@/components/PriceRangeAxis.vue';

// 加载所有网格单文件（price.js 除外）。每个文件 export { coin, grids }，
// grids 是该币种的所有网格单数组，这里展开成扁平列表并附上 coin。
const modules = import.meta.glob('@/data/grid/*.js', { eager: true });

// 自动配色调色板：单子没填 color 时按加载顺序取色，稳定且同页不撞色。
const COLOR_PALETTE = [
  '#5b8def', '#17a2b8', '#e8873a', '#8b5cf6', '#22c55e',
  '#ef4444', '#eab308', '#ec4899', '#14b8a6', '#f97316',
];

let autoColorIndex = 0;
const grids = Object.entries(modules)
  .filter(([ path ]) => !path.endsWith('/price.js'))
  .flatMap(([ , mod ]) => {
    const coin = mod.coin;
    // 未手动填 id 时按该币种内顺序自动生成：<coin小写>-<序号>（从 1 递增）
    let autoIdSeq = 0;
    return (mod.grids || []).map(g => {
      // 用 range: [下界, 上界] 表示区间；兼容旧的 lower/upper 写法
      const lower = Array.isArray(g.range) ? g.range[0] : g.lower;
      const upper = Array.isArray(g.range) ? g.range[1] : g.upper;
      return {
        ...g,
        coin,
        lower,
        upper,
        // 未手动填 id 时自动生成
        id: g.id || `${String(coin).toLowerCase()}-${++autoIdSeq}`,
        // 未手动填 color 时自动分配调色板颜色
        color: g.color || COLOR_PALETTE[autoColorIndex++ % COLOR_PALETTE.length],
      };
    });
  });

// 该页涉及的所有币种（去重），用于订阅实时价
const coins = [ ...new Set(grids.map(g => g.coin)) ];

// 实时价格：Coinbase 公开行情，定时轮询。取不到时回退 price.js 的 currentPrice 兜底。
const { prices: livePrices } = useCryptoPrices(coins);

// 某币种最终采用的价格：实时价优先，其次兜底价。
// 仅返回「有效价格」（> 0）；未拿到真实价（如初始为 0 或接口未返回）时返回 null，
// 此时不显示现价指针，等实时价回来再显示。
function resolvePrice(coin) {
  const live = livePrices[coin];
  if (live != null && live > 0) return live;
  const fb = currentPrice[coin];
  return fb != null && fb > 0 ? fb : null;
}

// 根据该币种所有网格单的最低/最高区间自动推导轴范围：
// 取 min(lower) / max(upper)，上下各延伸 10%，并把当前价也纳入，避免现价竖线跑出轴外。
// 刻度步长与小数位再按范围自动推导（币种范围差异大，避免手动配）。
const AXIS_PADDING = 0.1; // 上下延伸比例
function deriveAxis(list, price) {
  if (!list || !list.length) return null;
  let lo = Math.min(...list.map(g => g.lower));
  let hi = Math.max(...list.map(g => g.upper));
  if (!(hi > lo)) return null;
  const span0 = hi - lo;
  let min = lo - span0 * AXIS_PADDING;
  let max = hi + span0 * AXIS_PADDING;
  // 当前价若在延伸后仍越界，则再把它纳入
  if (price != null) {
    if (price < min) min = price;
    if (price > max) max = price;
  }
  const span = max - min;
  const rawStep = span / 6; // 目标约 6 个刻度
  // 取一个"漂亮"的步长
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const norm = rawStep / mag;
  let nice;
  if (norm < 1.5) nice = 1;
  else if (norm < 3) nice = 2;
  else if (norm < 7) nice = 5;
  else nice = 10;
  const tickStep = nice * mag;
  const decimals = span >= 100 ? 0 : (span >= 10 ? 1 : 2);
  return { min, max, tickStep, decimals };
}

// 按币种分组
const coinGroups = computed(() => {
  const map = new Map();
  for (const g of grids) {
    const coin = g.coin;
    if (!map.has(coin)) map.set(coin, []);
    map.get(coin).push(g);
  }
  const groups = [];
  for (const [ coin, list ] of map) {
    // 按开单时间升序（越早的排越前）；解析失败的排到最后
    list.sort((a, b) => {
      const ta = parseStartTime(a.startTime);
      const tb = parseStartTime(b.startTime);
      const va = Number.isNaN(ta) ? Infinity : ta;
      const vb = Number.isNaN(tb) ? Infinity : tb;
      return va - vb;
    });

    const price = resolvePrice(coin);
    const axis = deriveAxis(list, price);

    // 每个单子 -> 轴上一条区间条（detail 供悬浮浮窗展示完整属性）
    const positions = list.map(g => ({
      id: g.id,
      from: g.lower,
      to: g.upper,
      color: g.status === RUNNING ? (g.color || '#888') : '#9ca3af',
      label: `${g.id} · ${g.gridCount}格`,
      detail: [
        { label: '区间', value: `${formatNum(g.lower)} – ${formatNum(g.upper)}` },
        { label: '网格数', value: `${g.gridCount}` },
        { label: '每格价差', value: formatNum(gridStep(g)) },
        { label: '每格金额', value: `${(g.principal / g.gridCount).toFixed(1)} U` },
        { label: '本金', value: `${g.principal} U` },
        { label: '运行天数', value: `${runDays(g)} 天` },
        { label: '开单时间', value: String(g.startTime) },
        { label: '状态', value: g.status === RUNNING ? '运行' : '停止' },
      ],
    }));

    // 当前价 -> 贯穿竖线标记（实时价用红线，兜底价用灰线并标注）
    const isLive = livePrices[coin] != null && livePrices[coin] > 0;
    const markers = price != null
      ? [ {
        value: price,
        label: isLive ? `现价 ${formatNum(price)}` : `现价 ${formatNum(price)}(兜底)`,
        color: isLive ? '#ef4444' : '#9ca3af',
      } ]
      : [];

    groups.push({
      coin,
      price,
      axis,
      positions,
      markers,
      grids: list,
      runningCount: list.filter(g => g.status === RUNNING).length,
      principal: list.reduce((s, g) => s + g.principal, 0),
    });
  }
  // 币种间：有运行中的排前
  groups.sort((a, b) => b.runningCount - a.runningCount);
  return groups;
});

const totalCount = computed(() => grids.length);
const runningCount = computed(() => grids.filter(g => g.status === RUNNING).length);
const totalPrincipal = computed(() => grids.reduce((s, g) => s + g.principal, 0));

// ---- 工具函数 ----
function formatNum(v) {
  if (v == null) return '-';
  if (Math.abs(v) >= 100) return Number(v).toFixed(0);
  if (Math.abs(v) >= 1) return Number(v).toFixed(2);
  return Number(v).toFixed(4);
}

function gridStep(g) {
  return (g.upper - g.lower) / g.gridCount;
}

// 解析开单时间。支持 'MM/DD/YYYY, HH:mm:ss' 这种自然语言格式，返回毫秒时间戳。
function parseStartTime(v) {
  if (v == null) return NaN;
  if (typeof v === 'number') return v; // 兼容旧的毫秒时间戳
  const s = String(v).trim();
  // 匹配 MM/DD/YYYY, HH:mm:ss（时间部分可选）
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:,?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (m) {
    const [ , mm, dd, yyyy, hh = '0', mi = '0', ss = '0' ] = m;
    return new Date(+yyyy, +mm - 1, +dd, +hh, +mi, +ss).getTime();
  }
  // 兜底：交给 Date 解析
  const t = new Date(s).getTime();
  return t;
}

function runDays(g) {
  const startMs = parseStartTime(g.startTime);
  if (Number.isNaN(startMs)) return 0;
  return Math.max(0, Math.floor((Date.now() - startMs) / 86400000));
}
</script>

<style scoped>
.grid-page {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.page-header {
  margin-bottom: 1.2rem;
}
.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-strong);
  margin: 0;
}

/* 顶部总览 */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 1.8rem;
}
.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 14px 16px;
}
.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 6px;
}
.stat-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-strong);
}
.stat-value .unit {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--text-faint);
}

/* 币种分组 */
.coin-section {
  margin-bottom: 2.4rem;
}
.coin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 0;
  margin-bottom: 12px;
  border-bottom: 2px solid var(--card-border);
}
.coin-title {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.coin-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-strong);
}
.coin-price {
  font-size: 0.9rem;
  color: var(--accent);
  font-weight: 600;
}
.coin-price.no-price {
  color: var(--text-faint);
  font-weight: 400;
}
.coin-summary {
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* 共享轴块 */
.axis-block {
  margin-bottom: 14px;
}
.axis-missing {
  margin-bottom: 14px;
  padding: 12px;
  border: 1px dashed var(--card-border);
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--text-muted);
}
.axis-missing code {
  color: var(--accent);
}

/* 指标表 */
.grid-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--card-border);
  border-radius: 12px;
  background: var(--card-bg);
}
.grid-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
.grid-table th,
.grid-table td {
  padding: 9px 12px;
  text-align: left;
  white-space: nowrap;
}
.grid-table thead th {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-faint);
  border-bottom: 1px solid var(--card-border);
}
.grid-table tbody tr {
  border-bottom: 1px solid var(--card-border);
}
.grid-table tbody tr:last-child {
  border-bottom: none;
}
.grid-table tbody tr.stopped {
  opacity: 0.5;
}
.grid-table td {
  color: var(--text-strong);
}
.grid-table td.mono {
  font-variant-numeric: tabular-nums;
}
.cell-id {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}
.color-chip {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  flex-shrink: 0;
}
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
}
.status-dot.on { background: #22c55e; box-shadow: 0 0 6px #22c55e; }
.status-dot.off { background: #888; }

.empty {
  text-align: center;
  color: var(--text-muted);
  padding: 60px 0;
}
.empty code {
  color: var(--accent);
}
</style>
