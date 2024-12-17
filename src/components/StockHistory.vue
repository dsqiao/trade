<script>
import { reactive, ref, watch } from 'vue';
import { BUY } from '../data/const.js';
import { useRoute } from 'vue-router';
import { getDayOfWeek } from '../utils/index.js';
const mData = reactive([]);
const mCurrentPrice = ref(0);   // 当前股价
const holdingNum = ref(0);      // 当前持股数量
const cost = ref(0);            // 均摊成本（不含手续费）
const costWithFee = ref(0);     // 均摊成本（含手续费）
const incomeAmount = ref(0);    // 入账金额（股票卖出金额，不含手续费）
const outcomeAmount = ref(0);   // 出账金额（股票买入金额，不含手续费）
const totalFee = ref(0);        // 手续费总开支
const monthlyReport = reactive([]);  // 月度总结

// 切换路由时，需要清空数据
const clearData = () => {
  mData.length = 0;
  mCurrentPrice.value = 0;
  holdingNum.value = 0;
  cost.value = 0;
  costWithFee.value = 0;
  incomeAmount.value = 0;
  outcomeAmount.value = 0;
  totalFee.value = 0;
  monthlyReport.length = 0;
};

// 动态加载数据
const loadData = async (stock) => {
  try {
    const { data, currentPrice } = await import(`../data/stock/${stock.value}.js`);
    mData.push(...data); // 使用 .push 方法来更新 reactive 数组
    mCurrentPrice.value = currentPrice;
  } catch (error) {
    console.error(`Error loading stock data for ${stock}:`, error);
  }
};

// 计算数据
const calculateData = () => {
  for (const month of mData) {
    for (const tran of month.trans) {
      totalFee.value += tran.fee;
      if (tran.direction === BUY) {
        // 买入
        holdingNum.value += tran.number;
        cost.value += tran.price * tran.number;
        outcomeAmount.value += tran.price * tran.number;
        costWithFee.value += (tran.price * tran.number + tran.fee);
      } else {
        // 卖出
        holdingNum.value -= tran.number;
        cost.value -= tran.price * tran.number;
        incomeAmount.value += tran.price * tran.number;
        costWithFee.value -= (tran.price * tran.number - tran.fee);
      }
      tran.currentHolding = holdingNum.value;
    }
    monthlyReport.push(`${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月结束时，持股：${holdingNum.value}, 成本线 $ ${(costWithFee.value / holdingNum.value).toFixed(3)}`);
  }
};
export default {
  setup() {
    const route = useRoute();
    const stock = ref(route.params.stock);
    watch(
      () => route.params.stock,
      async (newStock) => {
        stock.value = newStock;
        clearData();
        await loadData(stock);
        calculateData();
      },
      { immediate: true }
    );
    return {
      mData,
      mCurrentPrice,
      stock,
      holdingNum,
      incomeAmount,
      outcomeAmount,
      cost,
      costWithFee,
      totalFee,
      monthlyReport,
      getDayOfWeek,
    };
  }
};
</script>

<template>
<h1>{{ stock.toUpperCase() }} general</h1>
<div>{{ `当前股价 ${mCurrentPrice}` }}</div>
<div>{{ `当前持有 ${holdingNum} 股` }}</div>
<div>{{ `持仓市值 ${mCurrentPrice * holdingNum}` }}</div>
<div>{{ `累积入账金额(股票卖出): $ ${incomeAmount.toFixed(3)}` }}</div>
<div>{{ `累积出账金额(股票买入): $ ${outcomeAmount.toFixed(3)}` }}</div>
<div v-if="holdingNum > 0">
  <div>{{ `当前投入成本(不含手续费): $ ${cost.toFixed(3)}` }}</div>
  <div>{{ `当前投入成本(包括手续费): $ ${costWithFee.toFixed(3)}` }}</div>
  <div class="emphasis">{{ `当前成本线(不含手续费): $ ${(cost / holdingNum).toFixed(3)}` }}</div>
  <div class="emphasis">{{ `当前成本线(包括手续费): $ ${(costWithFee / holdingNum).toFixed(3)}` }}</div>
</div>
<div class="emphasis">
  {{ `fee total: $ ${totalFee.toFixed(3)}` }}
</div>
<div class="emphasis">
  {{ `总盈利: $ ${(mCurrentPrice * holdingNum - costWithFee).toFixed(3)}` }}
</div>

<!-- 每月月底持仓总结 -->
<div class="monthlyReport">
  <div v-for="(m, index) in monthlyReport" :key="index">
    {{ m }}
  </div>
</div>
<h2>交易明细</h2>
<div v-for="(month, index) in mData" :key="index">
  <!-- 月份文案 -->
  <div class="monthTitle">{{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月` }}</div>

  <div v-for="(tran, tranIndex) in month.trans" :key="tranIndex">
    <!-- 隐藏 t: 添加属性 v-if="!tran.t"-->
    <div class="transaction" :class="tran.direction === 0 ? 'in' : 'out'">
      <span class="date">
        {{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月 ${tran.day} 日` }}
      </span>
      <span class="date2">
        {{ `${getDayOfWeek(Number(month.month.slice(0, 4)), Number(month.month.slice(4)), tran.day)}` }}
      </span>
      <span class="direction">{{ tran.direction === 0 ? '买入' : '卖出' }}</span>
      <span class="price">{{ tran.price }}</span>
      <span class="sign">*</span>
      <span class="number">{{ tran.number }}</span>
      <span class="fee">{{ tran.fee }}</span>
      <span class="current">{{ tran.currentHolding }}</span>
      <span class="t">{{ tran.t || '\\' }}</span>
      <span class="desc" v-if="tran.desc">{{ tran.desc }}</span>
    </div>
  </div>
</div>
</template>

<style scoped>
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
  width: 9.8rem;
  border-right: 0 !important;
}

.date2 {
  width: 2.5rem;
  border-left: 0 !important;
}

.direction {
  width: 3.2rem;
}

.price {
  width: 4.2rem;
  border-right: 0 !important;
}

.number {
  width: 4rem;
  border-left: 0 !important;
  padding: 0 !important;
}

.sign {
  width: 1rem;
  border-left: 0 !important;
  border-right: 0 !important;
  padding: 0 !important;
}

.fee {
  width: 4rem;
}

.current {
  width: 4rem;
}

.t {
  width: 20rem;
}

.desc {
  /* width: 30rem; */
  background-color: transparent !important;
  border: none !important;

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
