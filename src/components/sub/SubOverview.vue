<template>
  <div class="sub-page">
    <h1 class="page-title">子账号 · 总览</h1>

    <!-- 出入金 & 兑换 汇总 -->
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

    <!-- 股票持仓汇总 -->
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
            <th>当前持仓</th>
            <th>成本线（含费）</th>
            <th>投入成本（含费）</th>
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
            <td>
              <router-link
                class="link"
                :to="`/sub/history/${s.file}`"
              >查看</router-link>
            </td>
          </tr>
          <tr v-if="!stockRows.length">
            <td
              colspan="5"
              class="empty"
            >暂无股票记录，请在 src/data/sub/stock/ 下添加</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { funding } from '../../data/sub/funding.js';
import { exchange } from '../../data/sub/exchange.js';
import { DEPOSIT, CCY } from '../../data/sub/const.js';
import { BUY } from '../../data/const.js';
import { parseNumber } from '../../utils/index.js';

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

// ---- 股票持仓汇总 ----
const modules = import.meta.glob('../../data/sub/stock/*.js', { eager: true });
const stockRows = Object.entries(modules).map(([ path, mod ]) => {
  const file = path.split('/').pop().replace('.js', '');
  let holding = 0;
  let costWithFee = 0;
  let income = 0;
  let outcome = 0;
  for (const month of mod.data) {
    for (const tran of month.trans) {
      if (tran.direction === BUY) {
        holding += tran.number;
        outcome += tran.price * tran.number;
        costWithFee += tran.price * tran.number + tran.fee;
      } else {
        holding -= tran.number;
        income += tran.price * tran.number;
        costWithFee -= tran.price * tran.number - tran.fee;
      }
    }
  }
  return { name: file.toUpperCase(), file, holding, costWithFee, income, outcome };
});

const stockSum = stockRows.reduce(
  (acc, s) => {
    acc.income += s.income;
    acc.outcome += s.outcome;
    acc.costWithFee += s.holding > 0 ? s.costWithFee : 0;
    return acc;
  },
  { income: 0, outcome: 0, costWithFee: 0 }
);
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
.section {
  margin-bottom: 32px;
}
.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e8e8ec;
  margin-bottom: 14px;
  padding-left: 10px;
  border-left: 3px solid #00e5ff;
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
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.stat-card.highlight {
  background: rgba(0, 229, 255, 0.08);
  border: 1px solid rgba(0, 229, 255, 0.2);
}
.stat-label {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 8px;
}
.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #e8e8ec;
  font-variant-numeric: tabular-nums;
}
.stat-card.highlight .stat-value {
  color: #00e5ff;
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
.name {
  font-weight: 600;
  color: #e8e8ec;
}
.link {
  color: #00e5ff;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
.empty {
  color: rgba(255, 255, 255, 0.4);
  padding: 20px;
}
</style>
