<template>
  <div class="title">SUI-USDC</div>
  <div style="position: fixed; right: 30px; bottom: 30px;">
    <t-switch v-model="showT" />
  </div>
  <div class="desc">
    <div class="para">{{ `sui 收益: ${suiGain.toFixed(9)}` }}</div>
    <div class="para">{{ `usdc 收益: ${usdcGain.toFixed(9)}` }}</div>
    <div class="para"
         v-if="suiGain < 0 && usdcGain > 0 || suiGain > 0 && usdcGain < 0"
    >
      {{ `均价 ${- usdcGain / suiGain}` }}
    </div>
    <div class="para">{{ `total gas: ${totalGas.toFixed(9)}` }}</div>
  </div>
  <div v-for="(tran, index) of suiTradeData"
       :key="index"
  >
    <div
      v-if="!tran.t || showT && !(tran.t < 80)"
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
        @click="jumpChanges(tran.digest)"
      >
        {{ `gas: ${tran.gas.toFixed(5)}` }}
      </span>
      <span class="t">
        {{ tran.t || 'null' }}
      </span>
      <span class="gain">
        {{ `| ${tran.gain || ''}` }}
      </span>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { suiTradeData } from '../../data/crypto/sui-usdc.js';
import { getTransactionTime, toLocalTime, jumpOverview, jumpChanges } from '../../utils/index.js';
import { BUY, SELL } from '@/data/const.js';

const suiGain = ref(0);
const usdcGain = ref(0);
const totalGas = ref(0);
const showT = ref(false);
const transKeySet = [];
for (let index = 0; index < suiTradeData.length; index += 1) {
  const trans = suiTradeData[index];
  trans.gain = '0';
  if (!trans.timestamp) {
    const res = await getTransactionTime(trans.digest);
    alert(`txDigest ${trans.digest} time is ${res.timestampMs}`);
    trans.timestamp = res.timestampMs;
  }
  // sui-usdc 交易对，gas 被算到 sui 的变化里去了，这种就不单独记录 gas 了
  if (!trans.gas) {
    trans.gas = 0;
  }
  if (trans.t) {
    if (transKeySet.includes(trans.t)) {
      for (let j = 0; j < index; j += 1) {
        let prevTrans = suiTradeData[j];
        if (prevTrans.t === trans.t) {
          if (prevTrans.direction === BUY && trans.direction === SELL) {
            const usdcGain = trans.usdc - prevTrans.usdc;
            const suiGain = prevTrans.sui - trans.sui;
            trans.gain = `${usdcGain.toFixed(6)} usdc | ${suiGain.toFixed(6)} sui`;
          } else if (prevTrans.direction === SELL && trans.direction === BUY) {
            const usdcGain = prevTrans.usdc - trans.usdc;
            const suiGain = trans.sui - prevTrans.sui;
            trans.gain = `${usdcGain.toFixed(6)} usdc | ${suiGain.toFixed(6)} sui`;
          }
        }
      }
    } else {
      transKeySet.push(trans.t);
    }
  }
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

.direction {
  width: 4rem;
}

.detail {
  width: 20rem;
}

.price {
  width: 10rem;
}

.gas {
  width: 8rem;
}

.t {
  width: 6rem;
}

.gain {
  width: 16rem;
}
</style>