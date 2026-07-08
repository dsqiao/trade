<template>
  <div class="sub-page">
    <h1 class="page-title">子账号 · 货币兑换</h1>

    <!-- 汇总卡片 -->
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">港币 → 美元 累计换出</div>
        <div class="stat-value">HK$ {{ parseNumber(sum.hkd2usd.fromTotal) }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">港币 → 美元 累计换入</div>
        <div class="stat-value">$ {{ parseNumber(sum.hkd2usd.toTotal) }}</div>
      </div>
      <div class="stat-card highlight">
        <div class="stat-label">港币 → 美元 平均汇率</div>
        <div class="stat-value">{{ sum.hkd2usd.toTotal ? (sum.hkd2usd.fromTotal / sum.hkd2usd.toTotal).toFixed(4) : '-' }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">美元 → 港币 累计换出</div>
        <div class="stat-value">$ {{ parseNumber(sum.usd2hkd.fromTotal) }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">美元 → 港币 累计换入</div>
        <div class="stat-value">HK$ {{ parseNumber(sum.usd2hkd.toTotal) }}</div>
      </div>
      <div class="stat-card highlight">
        <div class="stat-label">美元 → 港币 平均汇率</div>
        <div class="stat-value">{{ sum.usd2hkd.fromTotal ? (sum.usd2hkd.toTotal / sum.usd2hkd.fromTotal).toFixed(4) : '-' }}</div>
      </div>
    </div>

    <!-- 明细 -->
    <div
      v-for="(month, mi) in exchange"
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
            <th>换出</th>
            <th>换入</th>
            <th>汇率</th>
            <th>手续费</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in month.record"
            :key="i"
            :class="item.fromCcy === CCY.HKD ? 'hkd2usd' : 'usd2hkd'"
          >
            <td>{{ `${month.month.slice(4)} 月 ${item.day} 日` }}</td>
            <td class="amount">{{ parseNumber(item.fromAmount) }} {{ item.fromCcy }}</td>
            <td class="amount">{{ parseNumber(item.toAmount) }} {{ item.toCcy }}</td>
            <td>{{ rateOf(item) }}</td>
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
import { exchange } from '../../data/sub/exchange.js';
import { CCY } from '../../data/sub/const.js';
import { parseNumber } from '../../utils/index.js';

// 展示为「1 美元 = ? 港币」，方向无关，统一按 港币/美元 呈现
const rateOf = (item) => {
  const hkd = item.fromCcy === CCY.HKD ? item.fromAmount : item.toAmount;
  const usd = item.fromCcy === CCY.USD ? item.fromAmount : item.toAmount;
  return usd ? (hkd / usd).toFixed(4) : '-';
};

const sum = computed(() => {
  const s = {
    hkd2usd: { fromTotal: 0, toTotal: 0 }, // 港币换美元
    usd2hkd: { fromTotal: 0, toTotal: 0 }, // 美元换港币
  };
  for (const month of exchange) {
    for (const item of month.record) {
      const bucket = item.fromCcy === CCY.HKD ? s.hkd2usd : s.usd2hkd;
      bucket.fromTotal += item.fromAmount;
      bucket.toTotal += item.toAmount;
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
.record-table .hkd2usd {
  background-color: rgba(33, 60, 83, 0.35);
}
.record-table .usd2hkd {
  background-color: rgba(83, 60, 33, 0.35);
}
.amount {
  font-weight: 600;
}
.desc {
  text-align: left;
  color: rgba(255, 255, 255, 0.55);
}
</style>
