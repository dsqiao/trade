<template>
  <div class="sub-page">
    <h1 class="page-title">子账号 · 总览</h1>

    <!-- 总资产 -->
    <div class="hero-card">
      <div class="hero-label">现有资产总额（折算美元，参考汇率 {{ HKD_PER_USD }}）</div>
      <div class="hero-value">$ {{ parseNumber(totalUSD) }}</div>
      <div class="hero-sub">≈ HK$ {{ parseNumber(totalUSD * HKD_PER_USD) }}</div>
    </div>

    <!-- 三大组成 -->
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">港元现金余额</div>
        <div class="stat-value">HK$ {{ parseNumber(hkdCash) }}</div>
        <div class="stat-hint">入金 − 出金 − 换出 + 换入</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">美元现金余额</div>
        <div class="stat-value">$ {{ parseNumber(usdCash) }}</div>
        <div class="stat-hint">港元兑换所得 + 股票现金流 − 出金</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">股票持仓市值</div>
        <div class="stat-value">$ {{ parseNumber(stockValue) }}</div>
        <div class="stat-hint">Σ 持仓 × 现价</div>
      </div>
    </div>

    <!-- 资产配置饼图 -->
    <div class="section">
      <div class="section-title">资产配置</div>
      <div class="pie-wrapper">
        <svg
          class="pie-svg"
          viewBox="0 0 200 200"
          width="200"
          height="200"
        >
          <path
            v-for="(p, i) in piePaths"
            :key="i"
            :d="p.d"
            :fill="p.color"
          />
        </svg>
        <div class="pie-legend">
          <div
            v-for="item in pieData"
            :key="item.label"
            class="legend-item"
          >
            <span
              class="legend-dot"
              :style="{ background: item.color }"
            ></span>
            <span class="legend-label">{{ item.label }}</span>
            <span class="legend-pct">{{ item.pct }}%</span>
            <span class="legend-val">$ {{ parseNumber(item.value) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 股票持仓明细 -->
    <div class="section">
      <div class="section-title">股票持仓</div>
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-label">累计买入（USD）</div>
          <div class="stat-value">$ {{ parseNumber(stockSum.outcome) }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">累计卖出（USD）</div>
          <div class="stat-value">$ {{ parseNumber(stockSum.income) }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">持仓成本（含费）</div>
          <div class="stat-value">$ {{ parseNumber(stockSum.costWithFee) }}</div>
        </div>
      </div>

      <table class="record-table">
        <thead>
          <tr>
            <th>股票</th>
            <th>持仓</th>
            <th>成本线（含费）</th>
            <th>投入成本（含费）</th>
            <th>现价</th>
            <th>市值</th>
            <th>持仓收益</th>
            <th>历史收益</th>
            <th>详情</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="s in stockRows"
            :key="s.name"
          >
            <td class="name">{{ s.name }}</td>
            <td>{{ s.holding }}</td>
            <td>{{ s.holding > 0 ? '$ ' + (s.costWithFee / s.holding).toFixed(3) : '-' }}</td>
            <td>{{ s.holding > 0 ? '$ ' + s.costWithFee.toFixed(3) : '-' }}</td>
            <td>{{ priceOf(s) > 0 ? '$ ' + priceOf(s).toFixed(3) : '-' }}</td>
            <td>{{ s.holding > 0 && priceOf(s) > 0 ? '$ ' + (s.holding * priceOf(s)).toFixed(3) : '-' }}</td>
            <td
              v-if="s.holding > 0 && priceOf(s) > 0"
              :class="(priceOf(s) * s.holding - s.costWithFee) >= 0 ? 'positive' : 'negative'"
            >
              {{ (priceOf(s) * s.holding - s.costWithFee) >= 0 ? '+' : '' }}$ {{ (priceOf(s) * s.holding - s.costWithFee).toFixed(3) }}
            </td>
            <td v-else>-</td>
            <td
              v-if="priceOf(s) > 0 || s.holding === 0"
              :class="(s.realizedPnl + (priceOf(s) * s.holding - s.costWithFee)) >= 0 ? 'positive' : 'negative'"
            >
              {{ (s.realizedPnl + (priceOf(s) * s.holding - s.costWithFee)) >= 0 ? '+' : '' }}$ {{ (s.realizedPnl + (priceOf(s) * s.holding - s.costWithFee)).toFixed(3) }}
            </td>
            <td v-else>-</td>
            <td>
              <router-link
                class="link"
                :to="`/sub/history/${s.file}`"
              >查看</router-link>
            </td>
          </tr>
          <tr v-if="!stockRows.length">
            <td
              colspan="9"
              class="empty"
            >暂无股票记录，请在 src/data/sub/stock/ 下添加</td>
          </tr>
        </tbody>
      </table>
      <p class="note">
        注：股票现价通过 Finnhub 实时行情接口获取（成交时即时更新）；若未配置行情 token 或接口暂无数据，则回退使用股票文件中的 currentPrice 兜底价。
      </p>
    </div>

    <!-- 资金概览 -->
    <div class="section">
      <div class="section-title">资金概览</div>
      <div class="stat-grid">
        <div class="stat-card highlight">
          <div class="stat-label">净入金（HKD）</div>
          <div class="stat-value">HK$ {{ parseNumber(fundingSum.depositHKD - fundingSum.withdrawHKD) }}</div>
        </div>
        <div class="stat-card highlight">
          <div class="stat-label">净入金（USD）</div>
          <div class="stat-value">$ {{ parseNumber(fundingSum.depositUSD - fundingSum.withdrawUSD) }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">港币→美元 累计换入</div>
          <div class="stat-value">$ {{ parseNumber(exchangeSum.hkd2usdIn) }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">美元→港币 累计换入</div>
          <div class="stat-value">HK$ {{ parseNumber(exchangeSum.usd2hkdIn) }}</div>
        </div>
      </div>
    </div>

    <!-- 现金余额明细 -->
    <div class="section">
      <div class="section-title">现金余额构成</div>
      <table class="record-table">
        <thead>
          <tr>
            <th>项目</th>
            <th>港元（HKD）</th>
            <th>美元（USD）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="name">累计入金</td>
            <td>{{ parseNumber(fundingSum.depositHKD) }}</td>
            <td>{{ parseNumber(fundingSum.depositUSD) }}</td>
          </tr>
          <tr>
            <td class="name">累计出金</td>
            <td>-{{ parseNumber(fundingSum.withdrawHKD) }}</td>
            <td>-{{ parseNumber(fundingSum.withdrawUSD) }}</td>
          </tr>
          <tr>
            <td class="name">兑换换出</td>
            <td>-{{ parseNumber(exchangeDetail.hkdOut) }}</td>
            <td>-{{ parseNumber(exchangeDetail.usdOut) }}</td>
          </tr>
          <tr>
            <td class="name">兑换换入</td>
            <td>+{{ parseNumber(exchangeDetail.hkdIn) }}</td>
            <td>+{{ parseNumber(exchangeDetail.usdIn) }}</td>
          </tr>
          <tr>
            <td class="name">股票现金流（卖出−买入−手续费）</td>
            <td>-</td>
            <td>{{ (stockCashDelta >= 0 ? '+' : '') + parseNumber(stockCashDelta) }}</td>
          </tr>
          <tr class="total-row">
            <td class="name">现金余额</td>
            <td>{{ parseNumber(hkdCash) }}</td>
            <td>{{ parseNumber(usdCash) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { funding } from '../../data/sub/funding.js';
import { exchange } from '../../data/sub/exchange.js';
import { DEPOSIT, CCY, HKD_PER_USD } from '../../data/sub/const.js';
import { BUY } from '../../data/const.js';
import { parseNumber } from '../../utils/index.js';
import { useRealtimePrices } from '../../utils/realtimePrice.js';

// ---- 出入金汇总 ----
const fundingSum = (() => {
  const s = { depositHKD: 0, depositUSD: 0, withdrawHKD: 0, withdrawUSD: 0 };
  for (const month of funding) {
    for (const item of month.record) {
      const isDeposit = item.direction === DEPOSIT;
      const isHKD = item.ccy === CCY.HKD;
      if (isDeposit && isHKD) s.depositHKD += item.amount;
      else if (isDeposit && !isHKD) s.depositUSD += item.amount;
      else if (!isDeposit && isHKD) s.withdrawHKD += item.amount;
      else s.withdrawUSD += item.amount;
    }
  }
  return s;
})();

// ---- 货币兑换汇总 ----
const exchangeSum = (() => {
  const s = { hkd2usdIn: 0, usd2hkdIn: 0 };
  for (const month of exchange) {
    for (const item of month.record) {
      if (item.fromCcy === CCY.HKD) s.hkd2usdIn += item.toAmount;
      else s.usd2hkdIn += item.toAmount;
    }
  }
  return s;
})();

// 兑换明细（用于现金构成表）
const exchangeDetail = (() => {
  const s = { hkdOut: 0, usdIn: 0, usdOut: 0, hkdIn: 0 };
  for (const month of exchange) {
    for (const item of month.record) {
      if (item.fromCcy === CCY.HKD) {
        s.hkdOut += item.fromAmount;
        s.usdIn += item.toAmount;
      } else {
        s.usdOut += item.fromAmount;
        s.hkdIn += item.toAmount;
      }
    }
  }
  return s;
})();

// ---- 股票持仓汇总 ----
const modules = import.meta.glob('../../data/sub/stock/*.js', { eager: true });
const stockRows = Object.entries(modules).map(([ path, mod ]) => {
  const file = path.split('/').pop().replace('.js', '');
  let holding = 0;
  let costWithFee = 0; // 当前仓位成本（持仓降为0时重置）
  let income = 0; // 累计卖出（全部历史）
  let outcome = 0; // 累计买入（全部历史）
  let totalFee = 0;
  let realizedPnl = 0; // 已实现盈亏（每次清仓时结算）
  for (const month of mod.data) {
    for (const tran of month.trans) {
      totalFee += tran.fee;
      if (tran.direction === BUY) {
        holding += tran.number;
        outcome += tran.price * tran.number;
        costWithFee += tran.price * tran.number + tran.fee;
      } else {
        holding -= tran.number;
        income += tran.price * tran.number;
        costWithFee -= tran.price * tran.number - tran.fee;
      }
      // 持仓降为 0 视为全部平仓，将当前仓位盈亏结转到已实现收益
      if (holding === 0) {
        realizedPnl += -costWithFee; // costWithFee 此时为负值代表盈利
        costWithFee = 0;
      }
    }
  }
  return {
    name: file.toUpperCase(),
    file,
    holding,
    costWithFee,
    income,
    outcome,
    totalFee,
    realizedPnl,
    fallbackPrice: mod.currentPrice || 0,
  };
});

// 实时行情：订阅有持仓的股票代码
const holdingRows = stockRows.filter(s => s.holding > 0);
const { prices } = useRealtimePrices(holdingRows.map(s => s.name));
// 取某只股票的现价：优先实时价，其次数据文件中的兜底价
const priceOf = (s) => prices[s.name] || s.fallbackPrice || 0;

// 股票带来的美元现金净变动 = 卖出 − 买入 − 手续费
const stockCashDelta = stockRows.reduce((sum, s) => sum + s.income - s.outcome - s.totalFee, 0);
// 股票持仓市值（随实时价响应式变化）
const stockValue = computed(() => stockRows.reduce((sum, s) => sum + s.holding * priceOf(s), 0));

const stockSum = stockRows.reduce(
  (acc, s) => {
    acc.income += s.income;
    acc.outcome += s.outcome;
    acc.costWithFee += s.holding > 0 ? s.costWithFee : 0;
    return acc;
  },
  { income: 0, outcome: 0, costWithFee: 0 }
);

// ---- 现金余额 ----
const hkdCash = fundingSum.depositHKD - fundingSum.withdrawHKD - exchangeDetail.hkdOut + exchangeDetail.hkdIn;
const usdCash = fundingSum.depositUSD - fundingSum.withdrawUSD + exchangeDetail.usdIn - exchangeDetail.usdOut + stockCashDelta;

// ---- 总资产（折算美元）----
const totalUSD = computed(() => usdCash + stockValue.value + hkdCash / HKD_PER_USD);

// ---- 饼图：资产配置比例 ----
const cashUSD = computed(() => usdCash + hkdCash / HKD_PER_USD);
const pieData = computed(() => {
  const total = totalUSD.value;
  if (total <= 0) return [];
  const cash = cashUSD.value;
  const stock = stockValue.value;
  return [
    { label: '现金', value: cash, pct: (cash / total * 100).toFixed(1), color: '#ffab40' },
    { label: '股票持仓', value: stock, pct: (stock / total * 100).toFixed(1), color: '#536dfe' },
  ];
});
// SVG 饼图参数
const pieRadius = 80;
const pieCenter = 100;
const piePaths = computed(() => {
  const total = totalUSD.value;
  if (total <= 0) return [];
  const data = pieData.value;
  const paths = [];
  let startAngle = -Math.PI / 2;
  for (const item of data) {
    const ratio = item.value / total;
    const endAngle = startAngle + ratio * 2 * Math.PI;
    const largeArc = ratio > 0.5 ? 1 : 0;
    const x1 = pieCenter + pieRadius * Math.cos(startAngle);
    const y1 = pieCenter + pieRadius * Math.sin(startAngle);
    const x2 = pieCenter + pieRadius * Math.cos(endAngle);
    const y2 = pieCenter + pieRadius * Math.sin(endAngle);
    if (ratio >= 1) {
      // 全圆特殊处理
      const top = `${pieCenter},${pieCenter - pieRadius}`;
      const bot = `${pieCenter},${pieCenter + pieRadius}`;
      const arc = `${pieRadius},${pieRadius}`;
      const d = `M ${top} A ${arc} 0 1,1 ${bot} A ${arc} 0 1,1 ${top}`;
      paths.push({ d, color: item.color });
    } else if (ratio > 0) {
      const d = `M ${pieCenter},${pieCenter} L ${x1},${y1}`
        + ` A ${pieRadius},${pieRadius} 0 ${largeArc},1 ${x2},${y2} Z`;
      paths.push({ d, color: item.color });
    }
    startAngle = endAngle;
  }
  return paths;
});
</script>

<style scoped>
.sub-page {
  max-width: 1100px;
}
.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #00e5ff, #6382ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-card {
  padding: 22px 28px;
  border-radius: 16px;
  margin-bottom: 24px;
  border: 1px solid var(--card-border);
  background: linear-gradient(135deg, rgba(0, 200, 120, 0.18), rgba(0, 120, 80, 0.05));
}
.hero-label {
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  margin-bottom: 6px;
}
.hero-value {
  font-size: 2.4rem;
  font-weight: 700;
  color: #2ee59d;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
}
.hero-sub {
  margin-top: 6px;
  font-size: 0.95rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}
.section {
  margin-bottom: 32px;
}
.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-strong);
  margin-bottom: 14px;
  padding-left: 10px;
  border-left: 3px solid var(--accent);
}
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}
.stat-card {
  padding: 16px 18px;
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
}
.stat-card.highlight {
  background: var(--accent-soft);
  border: 1px solid var(--accent-soft);
}
.stat-label {
  font-size: 0.78rem;
  color: var(--text-faint);
  margin-bottom: 8px;
}
.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-strong);
  font-variant-numeric: tabular-nums;
}
.stat-card.highlight .stat-value {
  color: var(--accent);
}
.stat-hint {
  margin-top: 6px;
  font-size: 0.72rem;
  color: var(--text-faint);
}
.record-table {
  width: 100%;
  border-collapse: collapse;
}
.record-table th,
.record-table td {
  border: 1px solid var(--border-color);
  padding: 8px 12px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.record-table th {
  background-color: var(--table-head-bg);
  color: var(--text-muted);
  font-weight: 600;
}
.record-table .name {
  text-align: left;
}
.name {
  font-weight: 600;
  color: var(--text-strong);
}
.total-row {
  background-color: var(--accent-soft);
  font-weight: 700;
  color: var(--accent);
}
.link {
  color: var(--accent);
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
.empty {
  color: var(--text-faint);
  padding: 20px;
}
.positive {
  color: #4caf50;
  font-weight: 600;
}
.negative {
  color: #ff5252;
  font-weight: 600;
}
.note {
  margin-top: 12px;
  font-size: 0.78rem;
  color: var(--text-faint);
  line-height: 1.6;
}
.pie-wrapper {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}
.pie-svg {
  flex-shrink: 0;
}
.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
}
.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  flex-shrink: 0;
}
.legend-label {
  color: var(--text-muted);
  min-width: 60px;
}
.legend-pct {
  font-weight: 600;
  color: var(--text-strong);
  min-width: 48px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.legend-val {
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}
</style>
