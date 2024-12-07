<template>
<div>Trade History</div>
<div>2024.12.6 转出 1000 sui 到钱包做 T 5e4R8XLG9noGZ28ez1LpaYcSZ2yM7YTRrfGzrcxhx8ZD </div>
<div>{{ `sui 收益: ${suiGain.toFixed(9)}` }}</div>
<div>{{ `usdc 收益: ${usdcGain.toFixed(6)}` }}</div>
</template>
<script setup>
import { ref } from 'vue';
import { suiTradeData, direction } from '../data/sui.js'
// import { useRoute } from 'vue-router';
// const route = useRoute();
// const coin = route.params.stock;

const suiGain = ref(0)
const usdcGain = ref(0)
for (const trans of suiTradeData) {
  if (trans.direction === direction.SuiToUsdc) { // 卖 sui，买 usdc
    suiGain.value -= trans.sui;
    usdcGain.value += trans.usdc;
  } else { // 卖 usdc，买 sui
    suiGain.value += trans.sui;
    usdcGain.value -= trans.usdc;
  }
}
</script>