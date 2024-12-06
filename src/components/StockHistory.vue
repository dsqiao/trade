<script setup>
import { reactive, ref } from 'vue';
import { BUY } from '../data/const.js';
import { useRoute } from 'vue-router';

// 这里引入各个股票的数据
import { maraData, maraCurrentPrice } from '../data/mara.js';
import { riotData, riotCurrentPrice } from '../data/riot.js';
import { tslaData, tslaCurrentPrice } from '../data/tsla.js';
import { sqData, sqCurrentPrice } from '../data/sq.js';

const route = useRoute();
const stock = route.params.stock;
let mData;
let currentPrice = 0;

// 这里读取路由，然后判断具体使用哪一个股票
if (stock === 'mara') {
  mData = reactive(maraData);
  currentPrice = maraCurrentPrice;
} else if (stock === 'riot') {
  mData = reactive(riotData);
  currentPrice = riotCurrentPrice;
} else if (stock === 'tsla') {
  mData = reactive(tslaData);
  currentPrice = tslaCurrentPrice;
} else if (stock === 'sq') {
  mData = reactive(sqData);
  currentPrice = sqCurrentPrice;
}

const holdingNum = ref(0);     // 当前持股数量

// 成本
const cost = ref(0);           // 均摊成本（不含手续费）
const costWithFee = ref(0);    // 均摊成本（含手续费）
const sellValue = ref(0);      // 入账金额（股票卖出金额，不含手续费）
const buyValue = ref(0);       // 出账金额（股票买入金额，不含手续费）
// 手续费
const totalFee = ref(0);       // 手续费总开支
const monthlyReport = ref([])
for (const month of mData) {
  for (const tran of month.trans) {
    totalFee.value += tran.fee
    if (tran.direction === BUY) {
      holdingNum.value += tran.number
      cost.value += tran.price * tran.number
      buyValue.value += tran.price * tran.number
      costWithFee.value += (tran.price * tran.number + tran.fee)
    } else { // 卖出，cost 降低
      holdingNum.value -= tran.number
      cost.value -= tran.price * tran.number
      sellValue.value += tran.price * tran.number
      costWithFee.value -= (tran.price * tran.number - tran.fee)
    }
  }
  monthlyReport.value.push(`${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月结束时，
    持股：${holdingNum.value}, 成本线 ${(costWithFee.value / holdingNum.value).toFixed(3)} 美元`)
}
</script>

<template>
  <h1>{{ stock.toUpperCase() }} general</h1>
  <div>{{ `当前股价 ${currentPrice}` }}</div>
  <div>{{ `当前持有 ${holdingNum} 股` }}</div>
  <div>{{ `持仓市值 ${currentPrice * holdingNum}` }}</div>
  <div>{{ `累积入账金额(股票卖出): $ ${sellValue.toFixed(3)}` }}</div>
  <div>{{ `累积出账金额(股票买入): $ ${buyValue.toFixed(3)}` }}</div>
  <div v-if="holdingNum > 0">
    <div>{{ `当前投入成本(不含手续费): $ ${cost.toFixed(3)}` }}</div>
    <div>{{ `当前投入成本(包括手续费): $ ${costWithFee.toFixed(3)}` }}</div>
    <div class="emphasis">{{ `当前成本线(不含手续费): $ ${(cost / holdingNum).toFixed(3)}` }}</div>
    <div class="emphasis">{{ `当前成本线(包括手续费): $ ${(costWithFee / holdingNum).toFixed(3)}` }}</div>
  </div>
  <div class="emphasis">{{ `fee total: $ ${totalFee.toFixed(3)}` }}</div>
  <div>{{ `总盈利: $ ${(currentPrice * holdingNum - costWithFee).toFixed(3)}` }}</div>

  <!-- 每月月底持仓总结 -->
  <div class="monthlyReport">
    <div v-for="(m, index) in monthlyReport" :key="index" >
      {{ m }}
    </div>
  </div>
  <h2>交易明细</h2>
  <div v-for="(month, index) in mData" :key="index">
    <!-- 月份文案 -->
    <div class="monthTitle">{{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月` }}</div>

    <div 
      v-for="(tran, tranIndex) in month.trans"
      :key="tranIndex"
    >
      <!-- 隐藏 t: 添加属性 v-if="!tran.t"-->
      <div 
        class="transaction"
        :class="tran.direction === 0 ? 'in' : 'out'"
      >
        <span class="date">{{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月 ${tran.day} 日 ` }}</span>
        <span class="direction">{{ tran.direction === 0 ? '买入' : '卖出' }}</span>
        <span class="price">{{ tran.price }}</span>
        *
        <span class="number">{{ tran.number }}</span>
        <span class="fee">{{ tran.fee }}</span>
        <span class="t">{{  tran.t || '\\' }}</span>
        <span class="desc" v-if="tran.desc">{{  tran.desc }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transaction > span {
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
.in {
  background-color: rgb(33, 83, 33);
}
.out {
  background-color: rgb(85, 23, 23);
}
.date {
  width: 10rem;
}
.direction {
  width: 5rem;
}
.price {
  width: 4rem;
}
.number {
  width: 4rem;
}
.fee {
  width: 4rem;
}
.t {
  width: 20rem;
}
.desc {
  width: 20rem;
}

.monthlyReport {
  margin-top: 20px;
}

.emphasis {
  font-size: 1.5rem;
  background-color: rgb(19, 15, 15);
  margin: 10px 0;
}
</style>
