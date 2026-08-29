<template>
  <div class="stock-page">
    <!-- 浮动开关 -->
    <div class="floating-switches">
      <div class="floating-switch">
        <span class="switch-label">配对交易</span>
        <t-switch v-model="showT" />
      </div>
      <div class="floating-switch">
        <span class="switch-label">股息</span>
        <t-switch v-model="showDividend" />
      </div>
      <div class="floating-switch">
        <span class="switch-label">期权</span>
        <t-switch v-model="showOption" />
      </div>
    </div>

    <!-- 顶部标题 -->
    <header class="page-header">
      <h1 class="stock-name">{{ stock.toUpperCase() }}</h1>
      <div class="current-price">
        <span class="price-label">当前股价</span>
        <span class="price-value">${{ mCurrentPrice }}</span>
        <span
          v-if="isLive"
          class="live-badge"
        >LIVE</span>
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
      <div
        v-if="optionIncome !== 0"
        class="stat-card"
      >
        <div class="stat-label">期权收益（权益金−费）</div>
        <div class="stat-value">${{ optionIncome.toFixed(3) }}</div>
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
        <thead v-if="month.trans.filter(tran => (!tran.t || showT) && (tran.direction !== 2 || showDividend) && (tran.direction !== 3 || showOption)).length">
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
            v-show="(!tran.t || showT) && (tran.direction !== 2 || showDividend) && (tran.direction !== 3 || showOption)"
            :class="[
              tran.direction === 0 ? 'buy' : (tran.direction === 1 ? 'sell' : (tran.direction === 3 ? 'option' : 'other')),
              tran.t ? 'mask' : ''
            ]"
          >
            <td class="date">
              {{ `${month.month.slice(0, 4)} 年 ${month.month.slice(4)} 月 ${tran.day} 日` }}
            </td>
            <td class="date2">
              {{ getDayOfWeek(Number(month.month.slice(0, 4)), Number(month.month.slice(4)), tran.day) }}
            </td>
            <td class="direction">{{ tran.direction === 0 ? '买入' : (tran.direction === 1 ? '卖出' : (tran.direction === 3 ? `${tran.optionSide === 0 ? '买' : '卖'}期权(${tran.optionType || '-'})` : '其他')) }}</td>
            <td class="price">{{ tran.direction === 3 ? `行权 ${tran.strike} / 权益金 ${tran.optionSide === 0 ? '-' : '+'}${tran.premium}` : tran.price }}</td>
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
import { BUY, SELL, OPTION } from '../data/const.js';
import { useRoute } from 'vue-router';
import { getDayOfWeek } from '../utils/index.js';
import { useRealtimePrice } from '../utils/realtimePrice.js';
const mData = reactive([]);
const mCurrentPrice = ref(0);   // 当前股价
const holdingNum = ref(0);      // 当前持股数量
const cost = ref(0);            // 均摊成本（不含手续费）
const costWithFee = ref(0);     // 均摊成本（含手续费）
const incomeAmount = ref(0);    // 入账金额（股票卖出金额，不含手续费）
const outcomeAmount = ref(0);   // 出账金额（股票买入金额，不含手续费）
const totalFee = ref(0);        // 手续费总开支
const optionIncome = ref(0);    // 期权净收益（权益金 − 手续费），计入总盈利并降低持仓成本
const monthlyReport = reactive([]);  // 月度总结
const showT = ref(true);       // 展示配对交易
const showDividend = ref(false);  // 展示股息（direction 为 OTHER 的交易），默认关闭
const showOption = ref(true);   // 展示期权交易（direction 为 OPTION），默认开启
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
  optionIncome.value = 0;
  monthlyReport.length = 0;
};

// 是否需要实时接口更新股价（当数据文件 currentPrice 为 0 时需要）
const needRealtime = ref(true);

// 动态加载数据（account 为 'sub' 时读取子账号股票数据，否则读取主账号）
const loadData = async (stock, account) => {
  try {
    const { data, currentPrice } = account === 'sub'
      ? await import(`../data/sub/stock/${stock.value}.js`)
      : await import(`../data/stock/${stock.value}.js`);
    mData.push(...data); // 使用 .push 方法来更新 reactive 数组
    mCurrentPrice.value = currentPrice;
    // currentPrice 不为 0 时直接使用，不再请求实时接口
    needRealtime.value = currentPrice === 0;
  } catch (error) {
    console.error(`Error loading stock data for ${stock.value}:`, error);
  }
};

// 计算数据
const calculateData = () => {

  const transMap = new Map();

  for (const month of mData) {
    for (const tran of month.trans) {
      totalFee.value += tran.fee;
      if (tran.direction === OPTION) {
        // 期权净收益 = 收到/付出的权益金 − 手续费。
        // optionSide: SELL(默认) = 卖出期权收权益金(premium 为收入)；BUY = 买入期权付权益金(premium 为支出)。
        // 兼容旧数据：未写 optionSide 视为 SELL。
        const signedPremium = tran.optionSide === BUY ? -(tran.premium || 0) : (tran.premium || 0);
        const net = signedPremium - tran.fee;
        optionIncome.value += net;
        costWithFee.value -= net;
        tran.currentHolding = holdingNum.value; // 期权不改变持股数量
        tran.gain = net.toFixed(3);             // 期权收益即已实现收益，展示在 gain 列
      } else if (tran.direction === BUY) {
        // 买入
        holdingNum.value += tran.number;
        cost.value += tran.price * tran.number;
        outcomeAmount.value += tran.price * tran.number;
        costWithFee.value += (tran.price * tran.number + tran.fee);
        tran.currentHolding = holdingNum.value;
      } else {
        // 卖出
        holdingNum.value -= tran.number;
        cost.value -= tran.price * tran.number;
        incomeAmount.value += tran.price * tran.number;
        costWithFee.value -= (tran.price * tran.number - tran.fee);
        tran.currentHolding = holdingNum.value;
      }
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
    const account = route.meta.account; // 'sub' 表示子账号，undefined 表示主账号
    watch(
      () => route.params.stock,
      async (newStock) => {
        stock.value = newStock;
        clearData();
        await loadData(stock, account);
        calculateData();
      },
      { immediate: true }
    );

    // 实时股价：通过 WebSocket 推送，成交时即时更新
    // 当数据文件中 currentPrice 不为 0 时直接使用，不再请求实时接口覆盖
    const { price: livePrice, isLive } = useRealtimePrice(stock);
    watch(livePrice, (p) => {
      if (p > 0 && needRealtime.value) mCurrentPrice.value = p;
    });

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
      optionIncome,
      monthlyReport,
      getDayOfWeek,
      showT,
      showDividend,
      showOption,
      showMonthlyReport,
      isLive,
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
.floating-switches {
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}
.floating-switch {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--panel-bg);
  backdrop-filter: blur(8px);
  border: 1px solid var(--card-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}
.switch-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* 顶部标题 */
.page-header {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--card-border);
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
  background: var(--card-bg);
}
.price-label {
  font-size: 0.8rem;
  color: var(--text-faint);
}
.price-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-strong);
  font-variant-numeric: tabular-nums;
}
.live-badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #2ee59d;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(46, 229, 157, 0.12);
  border: 1px solid rgba(46, 229, 157, 0.35);
  animation: live-pulse 1.6s ease-in-out infinite;
}
@keyframes live-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

/* 核心指标卡：总盈利 */
.hero-card {
  padding: 22px 28px;
  border-radius: 16px;
  margin-bottom: 24px;
  border: 1px solid var(--card-border);
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
  color: var(--text-muted);
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
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  transition: transform 0.2s ease, background 0.2s ease;
}
.stat-card:hover {
  background: var(--accent-soft);
  transform: translateY(-2px);
}
.stat-label {
  font-size: 0.78rem;
  color: var(--text-faint);
  margin-bottom: 8px;
}
.stat-value {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-strong);
  font-variant-numeric: tabular-nums;
}
.stat-value .unit {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--text-faint);
}

/* 成本分析面板 */
.cost-panel {
  padding: 20px;
  border-radius: 14px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  margin-bottom: 28px;
}
.panel-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 14px;
  padding-left: 10px;
  border-left: 3px solid var(--accent);
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
  background: var(--card-bg);
}
.cost-item.highlight {
  background: var(--accent-soft);
  border: 1px solid var(--accent-soft);
}
.cost-label {
  font-size: 0.82rem;
  color: var(--text-muted);
}
.cost-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-strong);
  font-variant-numeric: tabular-nums;
}
.cost-item.highlight .cost-value { color: var(--accent); }

/* 区块标题 */
.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-strong);
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
  color: var(--text-muted);
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
  background: var(--card-bg);
  transition: background 0.2s ease;
}

.monthlyReport-header:hover {
  background: var(--accent-soft);
}

.monthlyReport-header .arrow {
  font-size: 0.85rem;
  width: 1em;
}

.monthlyReport-header .count {
  font-size: 0.85rem;
  color: var(--text-faint);
}

.monthlyReport-body {
  margin-top: 10px;
  padding-left: 14px;
  line-height: 1.9;
  font-size: 0.88rem;
  color: var(--text-muted);
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
