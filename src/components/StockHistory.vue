<template>
  <div style="position: fixed; right: 30px; bottom: 30px; z-index: 99;">
    <t-switch v-model="showT" />
  </div>
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
    <div 
      v-for="(m, index) in monthlyReport"
      :key="index"
    >
      {{ m }}
    </div>
  </div>
  <h2>交易明细</h2>
  <div 
    v-for="(month, index) in mData"
    :key="index"
  >
    <!-- 月份文案 -->
    <div class="monthTitle">{{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月, 月度收益 ${month.monthlyProfit || '未计算'}` }}</div>
    <table class="transaction-table">
      <thead v-if="month.trans.filter(tran => !tran.t || showT).length">
        <tr>
          <th>日期</th>
          <th>星期</th>
          <th>方向</th>
          <th>价格</th>
          <th>*</th>
          <th>数量</th>
          <th>手续费</th>
          <th>当前持仓</th>
          <th>t</th>
          <th>gain</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tran, tranIndex) in month.trans"
          :key="tranIndex"
          v-show="!tran.t || showT"
          :class="[
            tran.direction === 0 ? 'buy' : (tran.direction === 1 ? 'sell' : 'other'),
            tran.t ? 'mask' : ''
          ]"
        >
          <td class="date">
            {{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月 ${tran.day} 日` }}
          </td>
          <td class="date2">
            {{ getDayOfWeek(Number(month.month.slice(0, 4)), Number(month.month.slice(4)), tran.day) }}
          </td>
          <td class="direction">{{ tran.direction === 0 ? '买入' : (tran.direction === 1 ? '卖出' : '其他') }}</td>
          <td class="price">{{ tran.price }}</td>
          <td class="sign">*</td>
          <td class="number">{{ tran.number }}</td>
          <td class="fee">{{ tran.fee }}</td>
          <td class="current">{{ tran.currentHolding }}</td>
          <td class="t">{{ tran.t || '\\' }}</td>
          <td class="gain">{{ tran.gain || '\\' }}</td>
          <td class="desc"
              v-if="tran.desc"
          >{{ tran.desc }}</td>
          <td class="desc"
              v-else
          >\</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue';
import { BUY, SELL } from '../data/const.js';
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
const showT = ref(true);       // 展示配对交易
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

  const transMap = new Map();

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
      // 我们把含有 t 值的交易称为「已结算交易」，对于已结算交易对，我们放到一个 Map 中
      if (tran.t) {
        if (!transMap.has(tran.t))  {
          transMap.set(tran.t, [ tran ]);
        } else {
          transMap.get(tran.t).push(tran);
        }
      }
    }
    monthlyReport.push(`${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月结束时，持股：${holdingNum.value}, 成本线 $ ${(costWithFee.value / holdingNum.value).toFixed(3)}`);
  }

  // 反向遍历，计算所有已结算交易对的收益
  for (let i = mData.length - 1; i >= 0; i--) {
    const month = mData[i];
    for (let j = month.trans.length - 1; j >= 0; j--) {
      const transItem = month.trans[j];
      if (transItem.t && transMap.has(transItem.t)) {
        const transList = transMap.get(transItem.t);
        let gain = 0;
        for (let singleTran of transList) {
          if (singleTran.direction === SELL) { // 卖 stock
            gain += singleTran.price * singleTran.number;
          } else if (singleTran.direction === BUY) { // 买 stock
            gain -= singleTran.price * singleTran.number;
          }
          gain -= singleTran.fee; // 扣除手续费
        }
        transItem.gain = gain.toFixed(3);
        transMap.delete(transItem.t);
      }
    }
  }

  for (const month of mData) {
    let profit = 0;
    for (const tran of month.trans) {
      if (tran.gain) {
        profit += Number(tran.gain);
      }
    }
    month.monthlyProfit = profit.toFixed(3);
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
      showT,
    };
  }
};
</script>
<style scoped>
.monthTitle {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.desc {
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

/* 定制化每一列的宽度 */
.date {
  width: 10%;
}

.date2 {
  width: 4%;
}
.direction {
  width: 4%;
}
.price {
  width: 7%;
}
.sign {
  width: 2%;
}
.number {
  width: 4%;
}
.fee {
  width: 8%;
}
.current {
  width: 8%;
}
.t {
  width: 7%;
}
.gain {
  width: 15%;
}
</style>
