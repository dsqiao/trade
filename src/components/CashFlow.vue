<template>
  <div>出入金记录</div>
  <div>入金累积(CNY) {{ parseNumber(totalInflowInCNY) }}</div>
  <div>入金累积(USDC) {{ parseNumber(totalInflowInUSDC) }}</div>
  <div>入金均价 {{ (totalInflowInCNY / totalInflowInUSDC).toFixed(3) }}</div>
  <div>出金累积(CNY) {{ parseNumber(totalOutflowInCNY) }}</div>
  <div>出金累积(USDC) {{ parseNumber(totalOutflowInUSDC) }}</div>
  <div>出金均价 {{ (totalOutflowInCNY / totalOutflowInUSDC).toFixed(3) }}</div>

  <div class="divider"></div>

  <div class="title-line">
    <span class="title-span">净入金(CNY)</span>
    <span class="content-span">¥ {{ parseNumber(totalInflowInCNY - totalOutflowInCNY) }}</span>
  </div>
  <div class="title-line">
    <span class="title-span">净入金(USDC)</span>
    <span class="content-span">$ {{ parseNumber(totalInflowInUSDC - totalOutflowInUSDC) }}</span>
  </div>
  <div class="title-line">
    <span class="title-span">净入金均价</span>
    <span class="content-span">{{ ((totalInflowInCNY - totalOutflowInCNY) / (totalInflowInUSDC - totalOutflowInUSDC)).toFixed(3) }}</span>
  </div>

  <div class="transaction-section">
    <div
      v-for="(month, monthIndex) in cashflow"
      :key="monthIndex"
      class="month-block"
    >
      <div class="monthTitle">
        {{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月 净入金：` }}
        {{ `${month.record.reduce((sum, item) => item.direction === BUY ? sum + item.num : sum - item.num, 0)} U` }}
      </div>
      <table class="transaction-table">
        <thead>
          <tr>
            <th>日期</th>
            <th>均价</th>
            <th>数量(U)</th>
            <th>金额(CNY)</th>
            <th>方向</th>
            <th>平台</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in month.record"
            :key="index"
            :class="item.direction === BUY ? 'buy' : 'sell'"
          >
            <td class="date">
              {{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月 ${item.day} 日` }}
            </td>
            <td class="unit">{{ (item.cny / item.num).toFixed(4) }}</td>
            <td class="num">{{ item.num }}</td>
            <td class="total">{{ (item.cny || 0).toFixed(3) }}</td>
            <td class="direction">{{ item.direction === BUY ? '入金' : '出金' }}</td>
            <td class="platform">
              <span
                class="platform-badge"
                :class="item.platform === 0 ? 'okx' : (item.platform === 1 ? 'bn' : 'ac')"
              >
                {{ parsePlatform(item.platform) }}
              </span>
            </td>
            <td class="desc">{{ item.desc || '/' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { cashflow } from '../data/cashflow.js';
import { BUY } from "../data/const.js";
import { ref } from 'vue';
import { parseNumber } from '../utils/index.js';
const parsePlatform = (platform) => {
  if (platform === 0) return 'OKX';
  if (platform === 1) return 'BN';
  return '熟人';
};
const totalInflowInCNY = ref(0);   // 入金（人民币单位）
const totalInflowInUSDC = ref(0);  // 入金（USDC 单位）
const totalOutflowInCNY = ref(0);  // 出金（人民币单位）
const totalOutflowInUSDC = ref(0); // 出金（USDC 单位）
for (let month of cashflow) {
  for (let item of month.record) {
    if (item.direction === BUY) {
      // 买入
      totalInflowInCNY.value += item.cny;
      totalInflowInUSDC.value += item.num;
    } else {
      // 卖出
      totalOutflowInCNY.value += item.cny;
      totalOutflowInUSDC.value += item.num;
    }
  }
}

</script>
<style scoped>
.divider {
  height: 2rem;
}
.title-line {
  margin: .3rem 0;
  font-size: large;
}
.title-line > span {
  display: inline-block;
}
.content-span {
  width: 10rem;
}
.title-span {
  width: 10rem;
}

/* 交易明细区域使用全宽，避免表格列被压缩换行 */
.transaction-section {
  max-width: 100%;
}
.month-block {
  margin-bottom: 8px;
  overflow-x: auto;
}
.monthTitle {
  margin-top: 1.5rem;
  margin-bottom: 0.6rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
}

/* 定制化每一列的宽度（与 StockHistory 风格一致） */
.date {
  width: 14%;
  min-width: 140px;
}
.unit {
  width: 10%;
  min-width: 80px;
}
.num {
  width: 8%;
  min-width: 64px;
}
.total {
  width: 10%;
  min-width: 80px;
}
.direction {
  width: 8%;
  min-width: 56px;
}
.platform {
  width: 8%;
  min-width: 64px;
}
.desc {
  min-width: 160px;
}

/* 平台徽章：保留品牌色，做成小圆角徽章 */
.platform-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.5;
}
.platform-badge.okx {
  background-color: rgb(29, 29, 29);
  color: #fff;
}
.platform-badge.bn {
  background-color: rgb(255, 180, 40);
  color: #fff;
}
.platform-badge.ac {
  background-color: rgb(220, 220, 220);
  color: rgb(45, 45, 45);
}
</style>