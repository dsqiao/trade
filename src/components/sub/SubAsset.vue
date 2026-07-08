<template>
  <div class="sub-page">
    <h1 class="page-title">子账号 · 现有资产</h1>

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

    <!-- 现金余额明细 -->
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
          <td>{{ parseNumber(f.depositHKD) }}</td>
          <td>{{ parseNumber(f.depositUSD) }}</td>
        </tr>
        <tr>
          <td class="name">累计出金</td>
          <td>-{{ parseNumber(f.withdrawHKD) }}</td>
          <td>-{{ parseNumber(f.withdrawUSD) }}</td>
        </tr>
        <tr>
          <td class="name">兑换换出</td>
          <td>-{{ parseNumber(e.hkdOut) }}</td>
          <td>-{{ parseNumber(e.usdOut) }}</td>
        </tr>
        <tr>
          <td class="name">兑换换入</td>
          <td>+{{ parseNumber(e.hkdIn) }}</td>
          <td>+{{ parseNumber(e.usdIn) }}</td>
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

    <!-- 股票持仓明细 -->
    <div class="section-title">股票持仓明细</div>
    <table class="record-table">
      <thead>
        <tr>
          <th>股票</th>
          <th>持仓</th>
          <th>现价</th>
          <th>市值（USD）</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="s in stockRows"
          :key="s.name"
        >
          <td class="name">{{ s.name }}</td>
          <td>{{ s.holding }}</td>
          <td>{{ priceOf(s) ? '$ ' + priceOf(s).toFixed(3) : '-' }}</td>
          <td>$ {{ parseNumber(s.holding * priceOf(s)) }}</td>
        </tr>
        <tr
          v-if="!holdingRows.length"
        >
          <td
            colspan="4"
            class="empty"
          >当前无持仓</td>
        </tr>
      </tbody>
    </table>
    <p class="note">
      注：股票现价通过 Finnhub 实时行情接口获取（成交时即时更新）；若未配置行情 token 或接口暂无数据，则回退使用股票文件中的 currentPrice 兜底价。
    </p>
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
const f = (() => {
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
const e = (() => {
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

// ---- 股票持仓 & 现金流 ----
const modules = import.meta.glob('../../data/sub/stock/*.js', { eager: true });
const stockRows = Object.entries(modules).map(([ path, mod ]) => {
  const name = path.split('/').pop().replace('.js', '').toUpperCase();
  let holding = 0;
  let income = 0;   // 卖出所得
  let outcome = 0;  // 买入花费
  let fee = 0;      // 手续费合计（含分红等 OTHER）
  for (const month of mod.data) {
    for (const tran of month.trans) {
      fee += tran.fee;
      if (tran.direction === BUY) {
        holding += tran.number;
        outcome += tran.price * tran.number;
      } else {
        holding -= tran.number;
        income += tran.price * tran.number;
      }
    }
  }
  // fallbackPrice：API 未取到时的兜底价（股票文件里的 currentPrice）
  return { name, holding, income, outcome, fee, fallbackPrice: mod.currentPrice || 0 };
});
const holdingRows = stockRows.filter(s => s.holding > 0);

// 实时行情：订阅持仓股票代码，成交时即时更新价格
const { prices } = useRealtimePrices(holdingRows.map(s => s.name));
// 取某只股票的现价：优先实时价，其次兜底价
const priceOf = (s) => prices[s.name] || s.fallbackPrice || 0;

// 股票带来的美元现金净变动 = 卖出 − 买入 − 手续费（负手续费即分红收入）
const stockCashDelta = stockRows.reduce((sum, s) => sum + s.income - s.outcome - s.fee, 0);
// 股票持仓市值（随实时价响应式变化）
const stockValue = computed(() => stockRows.reduce((sum, s) => sum + s.holding * priceOf(s), 0));

// ---- 现金余额 ----
const hkdCash = f.depositHKD - f.withdrawHKD - e.hkdOut + e.hkdIn;
const usdCash = f.depositUSD - f.withdrawUSD + e.usdIn - e.usdOut + stockCashDelta;

// ---- 总资产（折算美元）----
const totalUSD = computed(() => usdCash + stockValue.value + hkdCash / HKD_PER_USD);
</script>

<style scoped>
.sub-page {
  max-width: 900px;
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
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(135deg, rgba(0, 200, 120, 0.18), rgba(0, 120, 80, 0.05));
}
.hero-label {
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.5);
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
  color: rgba(255, 255, 255, 0.55);
  font-variant-numeric: tabular-nums;
}
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 28px;
}
.stat-card {
  padding: 16px 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.stat-label {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 8px;
}
.stat-value {
  font-size: 1.35rem;
  font-weight: 600;
  color: #e8e8ec;
  font-variant-numeric: tabular-nums;
}
.stat-hint {
  margin-top: 6px;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.35);
}
.section-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #e8e8ec;
  margin: 24px 0 12px;
  padding-left: 10px;
  border-left: 3px solid #00e5ff;
}
.record-table {
  width: 100%;
  border-collapse: collapse;
}
.record-table th,
.record-table td {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.record-table th {
  background-color: #2a2a2a;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}
.record-table .name {
  text-align: left;
  color: rgba(255, 255, 255, 0.75);
}
.total-row {
  background-color: rgba(0, 229, 255, 0.08);
  font-weight: 700;
  color: #00e5ff;
}
.empty {
  color: rgba(255, 255, 255, 0.4);
  padding: 16px;
}
.note {
  margin-top: 12px;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.6;
}
</style>
