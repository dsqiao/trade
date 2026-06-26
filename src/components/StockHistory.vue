<template>
  <div class="stock-page">
    <!-- 浮动开关：是否展示配对交易 -->
    <div class="floating-switch">
      <span class="switch-label">配对交易</span>
      <t-switch v-model="showT" />
    </div>

    <!-- 顶部标题 -->
    <header class="page-header">
      <h1 class="stock-name">{{ stock.toUpperCase() }}</h1>
      <div class="current-price">
        <span class="price-label">当前股价</span>
        <span class="price-value">${{ mCurrentPrice }}</span>
      </div>
    </header>

    <!-- 核心指标：总盈利 -->
    <div
      class="hero-card"
      :class="(mCurrentPrice * holdingNum - costWithFee) >= 0 ? 'positive' : 'negative'"
    >
      <div class="hero-label">总盈利</div>
      <div class="hero-value">
        {{ (mCurrentPrice * holdingNum - costWithFee) >= 0 ? '+' : '-' }}${{ Math.abs(mCurrentPrice * holdingNum - costWithFee).toFixed(3) }}
      </div>
    </div>

    <!-- 概览指标 -->
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">当前持有</div>
        <div class="stat-value">{{ holdingNum }} <span class="unit">股</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">持仓市值</div>
        <div class="stat-value">${{ (mCurrentPrice * holdingNum).toFixed(3) }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">累积入账（卖出）</div>
        <div class="stat-value">${{ incomeAmount.toFixed(3) }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">累积出账（买入）</div>
        <div class="stat-value">${{ outcomeAmount.toFixed(3) }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">手续费总计</div>
        <div class="stat-value">${{ totalFee.toFixed(3) }}</div>
      </div>
    </div>

    <!-- 成本分析（持仓时显示） -->
    <div
      v-if="holdingNum > 0"
      class="cost-panel"
    >
      <div class="panel-title">成本分析</div>
      <div class="cost-grid">
        <div class="cost-item">
          <span class="cost-label">投入成本（不含手续费）</span>
          <span class="cost-value">${{ cost.toFixed(3) }}</span>
        </div>
        <div class="cost-item">
          <span class="cost-label">投入成本（含手续费）</span>
          <span class="cost-value">${{ costWithFee.toFixed(3) }}</span>
        </div>
        <div class="cost-item highlight">
          <span class="cost-label">成本线（不含手续费）</span>
          <span class="cost-value">${{ (cost / holdingNum).toFixed(3) }}</span>
        </div>
        <div class="cost-item highlight">
          <span class="cost-label">成本线（含手续费）</span>
          <span class="cost-value">${{ (costWithFee / holdingNum).toFixed(3) }}</span>
        </div>
      </div>
    </div>

    <!-- 每月月底持仓总结 -->
    <div class="monthlyReport">
      <div
        class="monthlyReport-header"
        @click="showMonthlyReport = !showMonthlyReport"
      >
        <span class="arrow">{{ showMonthlyReport ? '▾' : '▸' }}</span>
        <span>每月月底持仓总结</span>
        <span class="count">（{{ monthlyReport.length }} 个月）</span>
      </div>
      <div
        v-show="showMonthlyReport"
        class="monthlyReport-body"
      >
        <div
          v-for="(m, index) in monthlyReport"
          :key="index"
        >
          {{ m }}
        </div>
      </div>
    </div>
  </div>

  <div class="transaction-section">
    <h2 class="section-title">交易明细</h2>
    <div
      v-for="(month, index) in mData"
      :key="index"
      class="month-block"
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
const showMonthlyReport = ref(false);  // 月度持仓总结展开状态，默认收起
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
      showMonthlyReport,
    };
  }
};
</script>
<style scoped>
.stock-page {
  max-width: 1200px;
}

/* 交易明细区域使用全宽，避免表格列被压缩换行 */
.transaction-section {
  max-width: 100%;
}
.transaction-section .month-block {
  overflow-x: auto;
}

/* 浮动开关 */
.floating-switch {
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 99;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(20, 24, 36, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}
.switch-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

/* 顶部标题 */
.page-header {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.stock-name {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, #00e5ff, #6382ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.current-price {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 14px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
}
.price-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
}
.price-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  font-variant-numeric: tabular-nums;
}

/* 核心指标卡：总盈利 */
.hero-card {
  padding: 22px 28px;
  border-radius: 16px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.hero-card.positive {
  background: linear-gradient(135deg, rgba(0, 200, 120, 0.18), rgba(0, 120, 80, 0.05));
}
.hero-card.negative {
  background: linear-gradient(135deg, rgba(230, 60, 60, 0.18), rgba(120, 30, 30, 0.05));
}
.hero-label {
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 6px;
}
.hero-value {
  font-size: 2.6rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
}
.hero-card.positive .hero-value { color: #2ee59d; }
.hero-card.negative .hero-value { color: #ff6b6b; }

/* 概览指标网格 */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
}
.stat-card {
  padding: 16px 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: transform 0.2s ease, background 0.2s ease;
}
.stat-card:hover {
  background: rgba(255, 255, 255, 0.07);
  transform: translateY(-2px);
}
.stat-label {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 8px;
}
.stat-value {
  font-size: 1.3rem;
  font-weight: 600;
  color: #e8e8ec;
  font-variant-numeric: tabular-nums;
}
.stat-value .unit {
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
}

/* 成本分析面板 */
.cost-panel {
  padding: 20px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 28px;
}
.panel-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 14px;
  padding-left: 10px;
  border-left: 3px solid #00e5ff;
}
.cost-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 10px;
}
.cost-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
}
.cost-item.highlight {
  background: rgba(0, 229, 255, 0.08);
  border: 1px solid rgba(0, 229, 255, 0.2);
}
.cost-label {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.5);
}
.cost-value {
  font-size: 1rem;
  font-weight: 600;
  color: #e8e8ec;
  font-variant-numeric: tabular-nums;
}
.cost-item.highlight .cost-value { color: #00e5ff; }

/* 区块标题 */
.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #e8e8ec;
  margin: 28px 0 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.section-title::before {
  content: '';
  width: 4px;
  height: 1.1em;
  border-radius: 2px;
  background: linear-gradient(180deg, #00e5ff, #6382ff);
}

.month-block {
  margin-bottom: 8px;
}
.monthTitle {
  margin-top: 1.5rem;
  margin-bottom: 0.6rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
}

.desc {
  background-color: transparent !important;
  border: none !important;
}

/* 月度持仓总结 */
.monthlyReport {
  margin-bottom: 8px;
}

.monthlyReport-header {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  padding: 8px 14px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  transition: background 0.2s ease;
}

.monthlyReport-header:hover {
  background: rgba(255, 255, 255, 0.1);
}

.monthlyReport-header .arrow {
  font-size: 0.85rem;
  width: 1em;
}

.monthlyReport-header .count {
  font-size: 0.85rem;
  color: rgb(150, 150, 150);
}

.monthlyReport-body {
  margin-top: 10px;
  padding-left: 14px;
  line-height: 1.9;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.6);
}

/* 定制化每一列的宽度 */
.date {
  width: 10%;
  min-width: 130px;
}
.date2 {
  width: 4%;
  min-width: 48px;
}
.direction {
  width: 4%;
  min-width: 48px;
}
.price {
  width: 7%;
  min-width: 64px;
}
.sign {
  width: 2%;
  min-width: 20px;
  text-align: center;
}
.number {
  width: 4%;
  min-width: 56px;
}
.fee {
  width: 8%;
  min-width: 64px;
}
.current {
  width: 8%;
  min-width: 72px;
}
.t {
  width: 7%;
  min-width: 40px;
}
.gain {
  width: 15%;
  min-width: 80px;
}
.desc {
  min-width: 120px;
}
</style>
