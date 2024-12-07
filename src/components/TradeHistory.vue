<template>
<div>Trade History</div>
<div>2024.12.6 转出 1000 sui 到钱包做 T <span @click="jump('5e4R8XLG9noGZ28ez1LpaYcSZ2yM7YTRrfGzrcxhx8ZD')" class="digest">5e4R8XLG9noGZ28ez1LpaYcSZ2yM7YTRrfGzrcxhx8ZD</span> </div>
<div>{{ `sui 收益: ${suiGain.toFixed(9)}` }}</div>
<div>{{ `usdc 收益: ${usdcGain.toFixed(6)}` }}</div>
<div v-if="suiGain < 0">{{ `卖出 SUI 均价 ${ - usdcGain / suiGain}` }}</div>
<div v-for="(tran, index) of suiTradeData" :key="index" class="transaction" :class="tran.direction === direction.SELL ? 'sell' : 'buy'">
  <span @click="jump(tran.digest)" class="digest">digest</span>
  <span class="direction">{{ tran.direction === direction.SELL ? '卖出' : '买入' }}</span>
  <span class="detail">{{ tran.direction === direction.SELL ? `${tran.sui} SUI => ${tran.usdc} USDC` : `${tran.usdc} USDC => ${tran.sui} SUI`}}</span>
  <span class="price">{{ `均价 ${(tran.usdc / tran.sui).toFixed(4)}` }}</span>
  <span class="t">{{ tran.t || 'null' }}</span>
</div>
</template>
<script setup>
import { ref } from 'vue';
import { suiTradeData, direction } from '../data/sui.js'

const jump = (digest) => {
  window.open(`https://suivision.xyz/txblock/${digest}?tab=Changes`)
}
const suiGain = ref(0)
const usdcGain = ref(0)
for (const trans of suiTradeData) {
  if (trans.direction === direction.SELL) { // 卖 sui，买 usdc
    suiGain.value -= trans.sui;
    usdcGain.value += trans.usdc;
  } else { // 卖 usdc，买 sui
    suiGain.value += trans.sui;
    usdcGain.value -= trans.usdc;
  }
}
</script>
<style>
.transaction>span {
  display: inline-block;
  border: 1px black solid;
  height: 2rem;
  line-height: 2rem;
  padding-left: 1rem;
}
.sell {
  background-color: rgb(85, 23, 23);
}
.buy {
  background-color: rgb(33, 83, 33);
}
.digest {
  cursor: pointer;
  width: 5rem;
}
.direction {
  width: 4rem;
}
.detail {
  width: 30rem;
}
.price {
  width: 10rem;
}
.t {
  width: 10rem;
}
</style>