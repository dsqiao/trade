<template>
  <div class="title">SUI-USDC</div>
  <div class="desc">
    <div class="para">{{ `sui 收益: ${suiGain.toFixed(9)}` }}</div>
    <div class="para">{{ `usdc 收益: ${usdcGain.toFixed(9)}` }}</div>
    <div class="para"
         v-if="suiGain < 0 && usdcGain > 0 || suiGain > 0 && usdcGain < 0"
    >{{ `均价 ${- usdcGain / suiGain}` }}</div>
    <div class="para">{{ `total gas: ${totalGas.toFixed(9)}` }}</div>
  </div>

  <div
    v-for="(tran, index) of suiTradeData"
    :key="index"
    class="transaction"
    :class="[tran.direction === SELL ? 'sell' : 'buy', tran.t ? 'mask' : '']"
  >
    <span 
      @click="jump(tran.digest)"
      class="digest"
    >
      digest
    </span>
    <span class="date">{{ tran.date }}</span>
    <span class="direction">
      {{ tran.direction === SELL ? '卖出' : '买入' }}
    </span>
    <span class="detail">
      {{ 
        tran.direction === SELL 
          ? `${tran.sui.toFixed(6)} SUI => ${tran.usdc.toFixed(6)} USDC` 
          : `${tran.usdc.toFixed(6)} USDC => ${tran.sui.toFixed(6)} SUI` 
      }}
    </span>
    <span class="price">
      {{ `均价 ${(tran.usdc / tran.sui).toFixed(6)}` }}
    </span>
    <span 
      class="gas"
      @click="jumpGas(tran.digest)"
    >
      {{ `gas: ${tran.gas}` }}
    </span>
    <span class="t">
      {{ tran.t || 'null' }}
    </span>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { suiTradeData } from '../../data/crypto/sui-usdc.js';
import { SELL } from '@/data/const.js';
const jump = (digest) => {
  window.open(`https://suivision.xyz/txblock/${digest}?tab=Overview`);
};
const jumpGas = (digest) => {
  window.open(`https://suivision.xyz/txblock/${digest}?tab=Changes`);
};
const suiGain = ref(0);
const usdcGain = ref(0);
const totalGas = ref(0);
for (const trans of suiTradeData) {
  totalGas.value += trans.gas;
  if (trans.direction === SELL) { // 卖 sui， 买 usdc
    suiGain.value -= trans.sui;
    usdcGain.value += trans.usdc;
  } else { // 卖 usdc，买 sui
    suiGain.value += trans.sui;
    usdcGain.value -= trans.usdc;
  }
}
</script>
<style scoped>
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.desc {
  padding-bottom: 1rem;
}
.para {
  font-size: 1.2rem;
  height: 2rem;
  line-height: 2rem;
}
.transaction>span {
  display: inline-block;
  border: 1px black solid;
  height: 2.2rem;
  line-height: 2.2rem;
  padding-left: 1rem;
}

.sell>span {
  background-color: rgb(85, 23, 23);
}

.buy>span {
  background-color: rgb(33, 83, 33);
}
.mask > span {
  opacity: .4;
}
.digest {
  cursor: pointer;
  width: 5rem;
}
.date {
  width: 6rem;
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

.gas {
  width: 10rem;
}
.t {
  width: 10rem;
}
</style>