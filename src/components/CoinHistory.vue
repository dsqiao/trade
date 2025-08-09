<template>
  <div class="desc">
    <div>{{ `${coin} accumulation: ${coinAccumulation.toFixed(6)}` }}</div>
    <div>{{ `usdc accumulation: ${uAccumulation.toFixed(6)}` }}</div>
    <div>{{ `average price: ${(-uAccumulation/coinAccumulation).toFixed(6)}` }}</div>
  </div>
  <div v-for="(tran, index) of mData"
       :key="index"
       class="transaction"
  >
    <span class="direction">{{ tran.direction === 0 ? '买入' : '卖出' }}</span>
    <span class="detail">
      {{ 
        tran.direction === BUY
          ? `${tran.u} u => ${tran.coin} ${coin} `
          : `${tran.coin} ${coin} => ${tran.u} u`
      }}
    </span>
    <span class="price">{{ (tran.u / tran.coin).toFixed(5) }}</span>
    <span class="gas">{{ tran.fee }}</span>
  </div>
</template>
<script setup>
import { BUY } from '@/data/const';
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const coin = ref(route.params.coin);
const mData = reactive([]);
const coinAccumulation = ref(0);
const uAccumulation = ref(0);

const clearData = () => {
  mData.length = 0;
  coinAccumulation.value = 0;
  uAccumulation.value = 0;
};
const calculateData = () => {
  for (const tran of mData) {
    if (tran.direction === BUY) {
      uAccumulation.value -= tran.u;
      coinAccumulation.value += tran.coin;
    } else { // SELL
      uAccumulation.value += tran.u;
      coinAccumulation.value -= tran.coin;
    }
  }

};
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
.gas {
  width: 10rem;
}
</style>