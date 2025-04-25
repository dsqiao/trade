<template>
  <div>出入金记录</div>
  <div>入金累积(CNY) {{ parseNumber(totalInflowInCNY) }}</div>
  <div>入金累积(USDC) {{ parseNumber(totalInflowInUSDC) }}</div>
  <div>入金均价 {{ (totalInflowInCNY / totalInflowInUSDC).toFixed(3) }}</div>
  <div>出金累积(CNY) {{ parseNumber(totalOutflowInCNY) }}</div>
  <div>出金累积(USDC) {{ parseNumber(totalOutflowInUSDC) }}</div>
  <div>出金均价 {{ (totalOutflowInCNY / totalOutflowInUSDC).toFixed(3) }}</div>

  <div class="divider"></div>

  <div>净入金(CNY)</div>
  <div>{{ parseNumber(totalInflowInCNY - totalOutflowInCNY) }}</div>
  <div>------------------------</div>
  <div>净入金(USDC)</div>
  <div>{{ parseNumber(totalInflowInUSDC - totalOutflowInUSDC) }}</div>
  <div>------------------------</div>
  <div>净入金均价 {{ ((totalInflowInCNY - totalOutflowInCNY) / (totalInflowInUSDC - totalOutflowInUSDC)).toFixed(3) }} </div>

  <div v-for="(month, monthIndex) in cashflow"
       :key="monthIndex"
  >
    <div class="monthTitle">
      {{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月 净入金：` }}
      {{ `${month.record.reduce((sum, item) => item.direction === BUY ? sum + item.num : sum - item.num, 0)} U` }}
    </div>
    <div v-for="(item, index) in month.record"
         :key="index"
    >
      <!-- 筛选 BN v-if="item.platform === 1" -->
      <div :class="item.direction === BUY ? 'in' : 'out'"
           class="transaction"
      >
        <span class="date">
          {{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月 ${item.day} 日 ` }}
        </span>
        <span class="unit">
          {{ item.unitPrice }}
        </span>
        <span class="num">
          {{ item.num }}
        </span>
        <span class="total">
          {{ (item.unitPrice * item.num).toFixed(2) }}
        </span>
        <span class="direction">
          {{ item.direction === BUY ? '入金' : '出金' }}
        </span>
        <span 
          class="platform"
          :class="item.platform === 0 ? 'okx' : (item.platform === 1 ? 'bn' : 'ac')"
        >
          {{ parsePlatform(item.platform) }}
        </span>
        <span class="desc">
          {{ item.desc || '/' }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { cashflow } from '../data/cashflow.js';
import { BUY } from "../data/const.js";
import { ref } from 'vue';
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
      totalInflowInCNY.value += item.num * item.unitPrice;
      totalInflowInUSDC.value += item.num;
    } else {
      // 卖出
      totalOutflowInCNY.value += item.num * item.unitPrice;
      totalOutflowInUSDC.value += item.num;
    }
  }
}
const parseNumber = (num) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
</script>
<style scoped>
.divider {
  height: 2rem;
}

.transaction>span {
  display: inline-block;
  border: 1px black solid;
  height: 2rem;
  line-height: 2rem;
  padding-left: 1rem;
}

.monthTitle {
  height: 4rem;
  line-height: 5rem;
}

.in>span {
  background-color: rgb(33, 83, 33);
}

.out>span {
  background-color: rgb(85, 23, 23);
}

.date {
  width: 10rem;
}

.unit {
  width: 3rem;
}

.num {
  width: 4rem;
}

.total {
  width: 5rem;
}

.direction {
  width: 6rem;
}

.platform {
  width: 6rem;
}

.okx {
  background-color: rgb(29, 29, 29) !important;
  color: white;
}

.bn {
  background-color: rgb(255, 180, 40) !important;
  color: white;
}

.ac {
  background-color: rgb(220, 220, 220) !important;
  color: rgb(45, 45, 45);
}

.desc {
  width: 30rem;
}
</style>