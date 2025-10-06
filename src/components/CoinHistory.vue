<template>
  <!-- 币种标题 -->
  <div class="title">{{ `${coin.toUpperCase()}-USDC` }}</div>

  <!-- 展示/隐藏已配对交易对的开关 -->
  <div style="position: fixed; right: 30px; bottom: 30px; z-index: 99;">
    <t-switch v-model="showT" />
  </div>

  <!-- 当前交易对收益概述 -->
  <div class="desc">
    <div class="para">{{ `${coin} accumulation: ${coinAccumulation.toFixed(9)}` }}</div>
    <div class="para">{{ `usdc accumulation: ${uAccumulation.toFixed(9)}` }}</div>
    <div class="para"
         v-if="uAccumulation * coinAccumulation < 0"
    >
      {{ `average price: ${(-uAccumulation/coinAccumulation).toFixed(6)}` }}
    </div>
    <div class="para">{{ `total fee: ${totalFee.toFixed(9)}` }}</div>
  </div>

  <!----------- START 表格 -------------->
  <table class="transaction-table">
    <thead>
      <tr>
        <th>digest</th>
        <th>日期</th>
        <th>方向</th>
        <th>详情</th>
        <th>价格</th>
        <th>fee</th>
        <th>t</th>
        <th>gain</th>
        <th>des</th>
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="(tran, index) of mData"
        :key="index"
        v-show="!tran.t || showT && !(tran.t < threshold)"
        :class="[
          tran.direction === SELL ? 'sell' : 'buy',
          tran.t ? 'mask' : '',
        ]"
      >
        <td 
          @click="jumpOverview(tran.digest)"
          class="digest"
        >
          digest
        </td>
        <td class="date">{{ toLocalTime(tran.timestamp) }}</td>
        <td class="direction">{{ tran.direction === 0 ? '买入' : '卖出' }}</td>
        <td class="detail">
          {{ 
            tran.direction === BUY
              ? `${tran.u.toFixed(6)} u => ${tran.coin.toFixed(9)} ${coin} `
              : `${tran.coin.toFixed(9)} ${coin} => ${tran.u.toFixed(6)} u`
          }}
        </td>
        <td class="price">{{ `price: ${(tran.u / tran.coin).toFixed(6)}` }}</td>
        <td class="fee">{{ `fee: ${tran.fee}` }}</td>
        <td class="t">{{ tran.t || 'null' }}</td>
        <td class="gain">{{ `+ ${tran.gain || ''}` }}</td>
        <td class="des">{{ tran.des || '\\' }}</td>
      </tr>
    </tbody>
  </table>
  <!----------- END 表格 -------------->
</template>
<script setup>
/**
 * 兼容 sui 和 solana 的 USDC 本位的交易记录
 */
import { BUY, SELL } from '@/data/const';
import { reactive, ref, watch } from 'vue';
import { getTransactionTime, toLocalTime, jumpOverview } from '../utils/index.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const coin = ref(route.params.coin);
const mData = reactive([]);
const coinAccumulation = ref(0);
const uAccumulation = ref(0);
const totalFee = ref(0);
const showT = ref(true);
const threshold = ref(0);
const clearData = () => {
  mData.length = 0;
  coinAccumulation.value = 0;
  uAccumulation.value = 0;
};

/**
 * 计算所有交易累积的 coin 增量和 usdc 增量
 */
const calculateData = async () => {
  const transMap = new Map();
  for (const tran of mData) {
    tran.gain = '0';
    if (!tran.timestamp) {
      try {
        const res = await getTransactionTime(tran.digest);
        alert(`txDigest ${tran.digest} time is ${res.timestampMs}`);
        tran.timestamp = res.timestampMs;
      } catch (e) {
        console.error(`获取交易时间失败, txDigest: ${tran.digest}, error: ${e}`);
        tran.timestamp = 0;
      }
    }
    // 计算 fee
    if (!tran.fee) {
      tran.fee = 0;
    }
    totalFee.value += tran.fee;

    // 我们把含有 t 值的交易称为「已结算交易」，对于已结算交易对，我们放到一个 Map 中
    if (tran.t) {
      if (!transMap.has(tran.t))  {
        transMap.set(tran.t, [ tran ]);
      } else {
        transMap.get(tran.t).push(tran);
      }
    }

    if (tran.direction === BUY) {
      uAccumulation.value -= tran.u;
      coinAccumulation.value += tran.coin;
    } else { // SELL
      uAccumulation.value += tran.u;
      coinAccumulation.value -= tran.coin;
    }
  }

  // 返回来遍历一遍，计算所有已结算交易对的收益
  for (let index = mData.length - 1; index >= 0; index -= 1) {
    const trans = mData[index];
    if (trans.t && transMap.has(trans.t)) {
      const transList = transMap.get(trans.t);
      let coinGain = 0;
      let usdcGain = 0;
      for (let singleTran of transList) {
        if (singleTran.direction === SELL) { // 卖 sui， 买 usdc
          usdcGain += singleTran.u;
          coinGain -= singleTran.coin;
        } else if (singleTran.direction === BUY) { // 卖 usdc，买 sui
          usdcGain -= singleTran.u;
          coinGain += singleTran.coin;
        }
      }
      trans.gain = `${usdcGain.toFixed(6)} usdc + ${coinGain.toFixed(9)} ${coin.value}`;
      transMap.delete(trans.t);
    }
  }  
};

/**
 * 从本地 js 文件中读取交易数据
 * @param coin { value: string } 需要加载的币种
 */
const loadData = async (coin) => {
  const { data, showThreshold = 0 } = await import(`../data/crypto/${coin.value}.js`);
  mData.push(...data);
  threshold.value = showThreshold;

};
watch(
  () => route.params.coin,
  async (newCoin) => {
    coin.value = newCoin;
    clearData();
    await loadData(coin);
    calculateData();
  },
  { immediate: true },
);
</script>
<style scoped>
.desc {
  margin-bottom: 15px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.para {
  font-size: 1.2rem;
  height: 2rem;
  line-height: 2rem;
}

</style>