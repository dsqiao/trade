<template>
  <div
    v-if="stock"
    class="sub-page"
  >
    <h1 class="page-title">子账号 · {{ stock.name }} 交易记录</h1>
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">当前持仓</div>
        <div class="stat-value">{{ holding }} 股</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">累计买入</div>
        <div class="stat-value">$ {{ parseNumber(buyTotal) }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">累计卖出</div>
        <div class="stat-value">$ {{ parseNumber(sellTotal) }}</div>
      </div>
    </div>

    <div
      v-for="month in stock.data"
      :key="month.month"
      class="month-block"
    >
      <div class="month-title">
        {{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月` }}
      </div>
      <div class="table-scroll">
        <table class="record-table">
          <thead>
            <tr>
              <th>日期</th>
              <th>方向</th>
              <th>成交价</th>
              <th>数量</th>
              <th>成交金额</th>
              <th>手续费</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(tran, index) in month.trans"
              :key="index"
              :class="tran.direction === BUY ? 'buy' : 'sell'"
            >
              <td>{{ `${month.month.slice(4)} 月 ${tran.day} 日` }}</td>
              <td>{{ tran.direction === BUY ? '买入' : '卖出' }}</td>
              <td>{{ tran.price != null ? '$ ' + parseNumber(tran.price) : '-' }}</td>
              <td>{{ tran.number }}</td>
              <td>$ {{ parseNumber(tranAmount(tran)) }}</td>
              <td>$ {{ parseNumber(tran.fee || 0) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div
    v-else
    class="sub-page"
  >
    <h1 class="page-title">未找到股票记录</h1>
    <router-link
      class="link"
      to="/sub"
    >返回子账号总览</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { BUY } from '../../data/const.js';
import { parseNumber } from '../../utils/index.js';

const route = useRoute();
const modules = import.meta.glob('../../data/sub/stock/*.js', { eager: true });
const stock = computed(() => {
  const file = `../../data/sub/stock/${String(route.params.stock).toLowerCase()}.js`;
  const module = modules[file];
  if (!module) return null;
  return {
    name: String(route.params.stock).toUpperCase(),
    data: module.data,
  };
});

const tranAmount = (tran) => tran.amount != null ? tran.amount : tran.price * tran.number;
const holding = computed(() => stock.value?.data.reduce(
  (total, month) => total + month.trans.reduce(
    (monthTotal, tran) => monthTotal + (tran.direction === BUY ? tran.number : -tran.number),
    0
  ),
  0
) ?? 0);
const buyTotal = computed(() => stock.value?.data.reduce(
  (total, month) => total + month.trans.reduce(
    (monthTotal, tran) => monthTotal + (tran.direction === BUY ? tranAmount(tran) : 0),
    0
  ),
  0
) ?? 0);
const sellTotal = computed(() => stock.value?.data.reduce(
  (total, month) => total + month.trans.reduce(
    (monthTotal, tran) => monthTotal + (tran.direction !== BUY ? tranAmount(tran) : 0),
    0
  ),
  0
) ?? 0);
</script>

<style scoped>
.sub-page {
  max-width: 1100px;
}
.page-title {
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-weight: 700;
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
  border: 1px solid var(--card-border);
  border-radius: 12px;
  background: var(--card-bg);
}
.stat-label {
  margin-bottom: 8px;
  color: var(--text-faint);
  font-size: 0.78rem;
}
.stat-value {
  color: var(--text-strong);
  font-size: 1.25rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.month-block {
  margin-bottom: 22px;
  overflow-x: auto;
}
.month-title {
  margin-bottom: 8px;
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 600;
}
.record-table {
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
}
.record-table th,
.record-table td {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.record-table th {
  background-color: var(--table-head-bg);
  color: var(--text-muted);
  font-weight: 600;
}
.record-table .buy {
  background-color: rgba(33, 83, 33, 0.35);
}
.record-table .sell {
  background-color: rgba(85, 23, 23, 0.35);
}
.link {
  color: var(--accent);
}
</style>
