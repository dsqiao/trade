<template>
  <div class="title-line">
    <span class="title-span">持仓数量(BTC)</span>
    <span class="content-span">{{ btcAccumulation.toFixed(3) }}</span>
  </div>
  <div class="title-line">
    <span class="title-span">成本</span>
    <span class="content-span">{{ (cost / btcAccumulation).toFixed(3) }}</span>
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
    <span class="direction">{{ tran.direction === 0 ? 'OPEN LONG' : 'CLOSE LONG' }}</span>
    <span class="price">{{ tran.price }}</span>
    <span class="amount">{{ tran.amount }}</span>
    <span class="value">{{ (tran.price * tran.amount).toFixed(5) }}</span>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const coin = ref(route.params.coin);
const mData = reactive([]);
const btcAccumulation = ref(0);
const cost = ref(0);
/**
 * 从本地 js 文件中读取交易数据
 * @param coin { value: string } 需要加载的币种
 */
const loadData = async (coin) => {
  const { data } = await import(`../data/future/${coin.value}-usdc.js`);
  mData.push(...data);
};
const clearData = () => {

};

const calculateData = () => {
  for (const tran of mData) {
    if (tran.direction === 0) {
      btcAccumulation.value += tran.amount;
      cost.value += tran.price * tran.amount;
    } else {
      btcAccumulation.value -= tran.amount;
      cost.value -= tran.price * tran.amount;
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
</style>