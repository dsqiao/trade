<template>
  <div class="title">DEEP-USDC</div>
  <div style="position: fixed; right: 30px; bottom: 30px;">
    <t-switch v-model="showT" />
  </div>
  <div class="desc">
    <div class="para">{{ `deep 收益: ${deepGain.toFixed(9)}` }}</div>
    <div class="para">{{ `usdc 收益: ${usdcGain.toFixed(9)}` }}</div>
    <div class="para"
         v-if="deepGain < 0 && usdcGain > 0 || deepGain > 0 && usdcGain < 0"
    >{{ `均价 ${- usdcGain / deepGain}` }}</div>
    <div class="para">{{ `total gas: ${totalGas.toFixed(9)}` }}</div>
  </div>

  <div
    v-for="(tran, index) of deepTradeData"
    :key="index"
  >
    <div
      v-if="!tran.t || showT"
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
            ? `${tran.deep.toFixed(6)} DEEP => ${tran.usdc.toFixed(6)} USDC` 
            : `${tran.usdc.toFixed(6)} USDC => ${tran.deep.toFixed(6)} DEEP` 
        }}
      </span>
      <span class="price">
        {{ `均价 ${(tran.usdc / tran.deep).toFixed(6)}` }}
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
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { deepTradeData } from '../../data/crypto/deep-usdc.js';
import { SELL } from '@/data/const.js';
const jump = (digest) => {
  window.open(`https://suivision.xyz/txblock/${digest}?tab=Overview`);
};
const jumpGas = (digest) => {
  window.open(`https://suivision.xyz/txblock/${digest}?tab=Changes`);
};
const deepGain = ref(0);
const usdcGain = ref(0);
const totalGas = ref(0);
const showT = ref(true);

for (const trans of deepTradeData) {
  totalGas.value += trans.gas;
  if (trans.direction === SELL) { // 卖 deep， 买 usdc
    deepGain.value -= trans.deep;
    usdcGain.value += trans.usdc;
  } else { // 卖 usdc，买 deep
    deepGain.value += trans.deep;
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