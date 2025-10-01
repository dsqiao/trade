<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <table class="asset-table">
    <thead>
      <tr>
        <th>日期</th>
        <th>汇率</th>
        <th v-for="asset in assetKeys"
            :key="asset"
        >{{ asset }}</th>
        <th>total</th>
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="row in data"
        :key="row.date"
      >
        <td>{{ row.date }}</td>
        <td>{{ row.exchangeRate }}</td>
        <td 
          v-for="asset in assetKeys"
          :key="asset"
        >
          {{ parseNumber(row[asset]) || '-' }}
        </td>
        <td>{{ calculateTotal(row) }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { data, AssetCategory, AssetCurrency } from '../data/assets.js';
import { parseNumber } from '@/utils/index.js';
const assetKeys = Object.keys(data[0]).filter(
  key => key !== 'date' && key !== 'exchangeRate'
);


const calculateTotal = (item) => {
  let usdTotal = 0;
  let cnyTotal = 0;
  for (const asset of AssetCategory) {
    const name = asset.name;
    if (item[name]) { // 该资产留有余额
      if (asset.currency === AssetCurrency.USD) usdTotal += item[name];
      else if (asset.currency === AssetCurrency.CNY) cnyTotal += item[name];
    }
  }
  return parseNumber(usdTotal * item.exchangeRate + cnyTotal);
};
</script>
<style scoped>
.asset-table {
  border-collapse: collapse;
  width: 100%;
}
.asset-table th,
.asset-table td {
  border: 1px solid #333;
  text-align: center;
  padding: 8px;
}
.asset-table th {
  background-color: #343434;
}
</style>