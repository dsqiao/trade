<template>
  <div class="title-line">
    <span class="title-span">持仓数量(BTC)</span>
    <span class="content-span">{{ btcAccumulation.toFixed(3) }}</span>
  </div>
  <div
    class="title-line"
    v-if="btcAccumulation > 0.0001"
  >
    <span class="title-span">成本</span>
    <span class="content-span">{{ (cost / btcAccumulation).toFixed(3) }}</span>
  </div>
  <div class="title-line">
    <span class="title-span">资金费</span>
    <span class="content-span">{{ totalFee.toFixed(8) }}</span>
  </div>
  <div class="title-line">
    <span class="title-span">当前价格</span>
    <input 
      type="number"
      name="price-input"
      class="price-input"
      v-model="currentPrice" 
      placeholder="请输入当前价格"
    />
  </div>
  <div class="title-line">
    <span class="title-span">PnL</span>
    <span class="title-span">{{ (currentPrice * btcAccumulation - cost + totalFee).toFixed(3) }}</span>
  </div>
  <br />
  <table class="transaction-table">
    <thead>
      <tr>
        <th>日期</th>
        <th>方向</th>
        <th>价格</th>
        <th>数量</th>
        <th>价值</th>
        <th>持仓</th>
        <th>t</th>
        <th>gain</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(tran, index) in mData"
        :key="index"
        v-show="!tran.t || showT"
        :class="[
          tran.direction === 0 ? 'buy' : 'sell',
          tran.t ? 'mask' : '',
        ]"
      >
        <td class="date">{{ tran.date }}</td>
        <td class="direction">{{ tran.direction === 0 ? 'OPEN LONG' : 'CLOSE LONG' }}</td>
        <td class="price">{{ parseNumber(tran.price) }}</td>
        <td class="amount">{{ tran.amount }}</td>
        <td class="value">{{ (tran.price * tran.amount).toFixed(4) }}</td>
        <td>{{ tran.current }}</td>
        <td class="t">{{ tran.t || '\\' }}</td>
        <td class="gain">{{ tran.gain || '0' }}</td>
      </tr>
    </tbody>
  </table>

  <div style="position: fixed; right: 30px; bottom: 30px;">
    <t-switch v-model="showT" />
  </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { parseNumber } from '@/utils';
const route = useRoute();
const coin = ref(route.params.coin);
const mData = reactive([]);
const mFundingFee = reactive([]);
const totalFee = ref(0);
const btcAccumulation = ref(0);
const cost = ref(0);
const showT = ref(false); // 默认不展示已成交交易对
const currentPrice = ref(114000);

/**
 * 从本地 js 文件中读取交易数据
 * @param coin { value: string } 需要加载的币种
 */
const loadData = async (coin) => {
  const { data, fundingFee } = await import(`../data/future/${coin.value}-usdc.js`);
  mData.push(...data);
  mFundingFee.push(...fundingFee);
};
const clearData = () => {

};

const calculateData = () => {

  const transMap = new Map();

  for (const tran of mData) {

    // 我们把含有 t 值的交易称为「已结算交易」，对于已结算交易对，我们放到一个 Map 中
    if (tran.t) {
      if (!transMap.has(tran.t))  {
        transMap.set(tran.t, [ tran ]);
      } else {
        transMap.get(tran.t).push(tran);
      }
    }

    if (tran.direction === 0) {
      btcAccumulation.value += tran.amount;
      cost.value += tran.price * tran.amount;
    } else {
      btcAccumulation.value -= tran.amount;
      cost.value -= tran.price * tran.amount;
    }
    if (btcAccumulation.value === 0) {
      cost.value = 0; // 清仓后，成本归零
    }
    tran.current = btcAccumulation.value > 0.0001 ? btcAccumulation.value.toFixed(3) : '== 清仓 == ';
  }

  // 返回来遍历一遍，计算所有已结算交易对的收益
  for (let index = mData.length - 1; index >= 0; index -= 1) {
    const trans = mData[index];
    if (trans.t && transMap.has(trans.t)) {
      const transList = transMap.get(trans.t);
      let gain = 0;
      for (let singleTran of transList) {
        if (singleTran.direction === 0) { // open
          gain -= (singleTran.amount * singleTran.price);
        } else if (singleTran.direction === 1) { // close
          gain += (singleTran.amount * singleTran.price);
        }
      }
      trans.gain = `${gain.toFixed(3)} usdc`;
      transMap.delete(trans.t);
    }
  }  
  for (let day of mFundingFee) {
    for (const fee of day.fee) {
      totalFee.value += fee;
    }
  }

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
.title-span {
  width: 10rem;
}
.content-span {
  width: 10rem;
}
.title-line {
  margin: .3rem 0;
  font-size: large;
}
.title-line > span {
  display: inline-block;
}
.price-input {
  width: 7rem;
  border: rgb(172, 172, 172) 1px solid;
  background-color: rgb(35, 35, 35);
  color: rgb(172, 172, 172);
}

.date {
  width: 15%;
}
.direction {
  width: 13%;
}
.price {
  width: 10%;
}
</style>