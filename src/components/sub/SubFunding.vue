<template>
  <div class="sub-page">
    <h1 class="page-title">子账号 · 出入金</h1>

    <!-- 汇总卡片 -->
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">累计入金（HKD）</div>
        <div class="stat-value">HK$ {{ parseNumber(sum.depositHKD) }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">累计入金（USD）</div>
        <div class="stat-value">$ {{ parseNumber(sum.depositUSD) }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">累计出金（HKD）</div>
        <div class="stat-value">HK$ {{ parseNumber(sum.withdrawHKD) }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">累计出金（USD）</div>
        <div class="stat-value">$ {{ parseNumber(sum.withdrawUSD) }}</div>
      </div>
      <div class="stat-card highlight">
        <div class="stat-label">净入金（HKD）</div>
        <div class="stat-value">HK$ {{ parseNumber(sum.depositHKD - sum.withdrawHKD) }}</div>
      </div>
      <div class="stat-card highlight">
        <div class="stat-label">净入金（USD）</div>
        <div class="stat-value">$ {{ parseNumber(sum.depositUSD - sum.withdrawUSD) }}</div>
      </div>
    </div>

    <!-- 明细 -->
    <div
      v-for="(month, mi) in funding"
      :key="mi"
      class="month-block"
    >
      <div class="month-title">
        {{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月` }}
      </div>
      <table class="record-table">
        <thead>
          <tr>
            <th>日期</th>
            <th>方向</th>
            <th>金额</th>
            <th>币种</th>
            <th>手续费</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in month.record"
            :key="i"
            :class="item.direction === DEPOSIT ? 'in' : 'out'"
          >
            <td>{{ `${month.month.slice(4)} 月 ${item.day} 日` }}</td>
            <td>{{ item.direction === DEPOSIT ? '入金' : '出金' }}</td>
            <td class="amount">{{ parseNumber(item.amount) }}</td>
            <td>{{ item.ccy }}</td>
            <td>{{ item.fee || 0 }}</td>
            <td class="desc">{{ item.desc || '/' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { funding } from '../../data/sub/funding.js';
import { DEPOSIT, CCY } from '../../data/sub/const.js';
import { parseNumber } from '../../utils/index.js';

const sum = computed(() => {
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
});
</script>

<style scoped>
.sub-page {
  max-width: 1000px;
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
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 28px;
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
.month-block {
  margin-bottom: 22px;
}
.month-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 8px;
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
.record-table .in {
  background-color: rgba(33, 83, 33, 0.35);
}
.record-table .out {
  background-color: rgba(85, 23, 23, 0.35);
}
.amount {
  font-weight: 600;
}
.desc {
  text-align: left;
  color: rgba(255, 255, 255, 0.55);
}
</style>
