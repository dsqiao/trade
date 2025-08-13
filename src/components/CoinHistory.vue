<template>
  <!-- 币种标题 -->
  <div class="title">{{ `${coin.toUpperCase()}-USDC` }}</div>

  <!-- 展示/隐藏已配对交易对的开关 -->
  <div style="position: fixed; right: 30px; bottom: 30px;">
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
  <div 
    v-for="(tran, index) of mData"
    :key="index"
  >
    <div
      v-if="!tran.t || showT && !(tran.t < 0)"
      class="transaction"
      :class="[
        tran.direction === SELL ? 'sell' : 'buy',
        tran.t ? 'mask' : '',
      ]"
    >
      <span
        @click="jumpOverview(tran.digest)"
        class="digest"
      >
        digest
      </span>
      <span class="date">
        {{ toLocalTime(tran.timestamp) }}
      </span>
      <span class="direction">
        {{ tran.direction === 0 ? '买入' : '卖出' }}
      </span>
      <span class="detail">
        {{ 
          tran.direction === BUY
            ? `${tran.u.toFixed(6)} u => ${tran.coin.toFixed(9)} ${coin} `
            : `${tran.coin.toFixed(9)} ${coin} => ${tran.u.toFixed(6)} u`
        }}
      </span>
      <span class="price">{{ `price: ${(tran.u / tran.coin).toFixed(6)}` }}</span>
      <span class="fee">{{ `fee: ${tran.fee}` }}</span>
      <span class="t">
        {{ tran.t || 'null' }}
      </span>
      <span class="gain">
        {{ `| ${tran.gain || ''}` }}
      </span>
      <span class="des">
        {{ tran.des || '\\' }}
      </span>
    </div>
  </div>
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
        // alert(`txDigest ${tran.digest} time is ${res.timestampMs}`);
        console.log(`txDigest ${tran.digest} time is timestamp:${res.timestampMs},`);
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
      trans.gain = `${usdcGain.toFixed(6)} usdc | ${coinGain.toFixed(9)} ${coin.value}`;
      transMap.delete(trans.t);
    }
  }  
};

/**
 * 从本地 js 文件中读取交易数据
 * @param coin { value: string } 需要加载的币种
 */
const loadData = async (coin) => {
  const { data } = await import(`../data/crypto/${coin.value}.js`);
  mData.push(...data);
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
.transaction>span {
  display: inline-block;
  border: 1px black solid;
  height: 2.2rem;
  line-height: 2.2rem;
  padding-left: 1rem;
}
.direction {
  width: 4rem;
}
.detail {
  width: 20rem;
}
.price {
  width: 10rem
}
.fee {
  width: 10rem;
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

.sell>span {
  background-color: rgb(85, 23, 23);
}

.buy>span {
  background-color: rgb(33, 83, 33);
}

.mask>span {
  opacity: .4;
}

.digest {
  cursor: pointer;
  width: 5rem;
}

.date {
  width: 11rem;
}

.t {
  width: 4rem;
}

.gain {
  width: 18rem;
}
.des {
  width: 7rem;
}
</style>