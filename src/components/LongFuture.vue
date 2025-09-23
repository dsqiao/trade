<template>
  <div class="title-line">
    <span class="title-span">持仓数量(BTC)</span>
    <span class="content-span">{{ btcAccumulation.toFixed(3) }}</span>
  </div>
  <div class="title-line">
    <span class="title-span">成本</span>
    <span class="content-span">{{ (cost / btcAccumulation).toFixed(3) }}</span>
  </div>
  <div class="title-line">
    <span class="title-span">资金费</span>
    <span class="content-span">{{ totalFee.toFixed(8) }}</span>
  </div>
  <div 
    v-for="(tran, index) in mData"
    :key="index"
    class="transaction"
    :class="[
      tran.direction === 0 ? 'open' : 'close',
      tran.t ? 'mask' : '',
    ]"
  >
    <span class="date">{{ tran.date }}</span>
    <span class="direction">{{ tran.direction === 0 ? 'OPEN LONG' : 'CLOSE LONG' }}</span>
    <span class="price">{{ tran.price }}</span>
    <span class="amount">{{ tran.amount }}</span>
    <span class="value">{{ (tran.price * tran.amount).toFixed(5) }}</span>
    <span class="t">{{ tran.t || '\\' }}</span>
    <span class="gain">{{ tran.gain || '0' }}</span>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const coin = ref(route.params.coin);
const mData = reactive([]);
const mFundingFee = reactive([]);
const totalFee = ref(0);
const btcAccumulation = ref(0);
const cost = ref(0);
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
  }

  // 返回来遍历一遍，计算所有已结算交易对的收益
  for (let index = mData.length - 1; index >= 0; index -= 1) {
    const trans = mData[index];
    if (trans.t && transMap.has(trans.t)) {
      const transList = transMap.get(trans.t);
      let gain = 0;
      for (let singleTran of transList) {
        console.log(singleTran);
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
.transaction>span {
  display: inline-block;
  border: 1px black solid;
  height: 2.2rem;
  line-height: 2.2rem;
  padding-left: 1rem;
}
.direction {
  width: 10rem;
}
.price {
  width: 8rem;
}
.amount {
  width: 8rem;
}
.value {
  width: 8rem;
}
.close>span {
  background-color: rgb(85, 23, 23);
}
.open>span {
  background-color: rgb(33, 83, 33);
}
.mask>span {
  opacity: .4;
}
.title-span {
  width: 10rem;
}
.content-span {
  width: 10rem;
}
.title-line > span {
  display: inline-block;
}
.gain {
  width: 6rem;
}
.t {
  width: 3rem;
}
.date {
  width: 6rem;
}
</style>