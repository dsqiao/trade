<template>
  <div v-for="(tran, index) of mData"
       :key="index"
       class="transaction"
  >
    <!-- <span>{{ tran.digest }}</span> -->
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
<script>
import { BUY } from '@/data/const';
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const clearData = () => {
  mData.length = 0;
};
const calculateData = () => {

};
const mData = reactive([]);
const loadData = async (coin) => {
  const { data } = await import(`../data/crypto/${coin.value}.js`);
  mData.push(...data);
};
export default {
  setup() {
    const route = useRoute();
    const coin = ref(route.params.coin);
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
    return {
      mData,
      coin,
      BUY,
    };
  }
};
</script>
<style>
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