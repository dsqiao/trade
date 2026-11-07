<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <table class="asset-table">
    <thead>
      <tr>
        <th>日期</th>
        <th>星期</th>
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
        <td>{{ getWeekday(row.date) }}</td>
        <td>{{ row.exchangeRate }}</td>
        <td 
          v-for="asset in assetKeys"
          :key="asset"
        >
          {{ parseNumber(row[asset]) || '-' }}
        </td>
        <td :class="totalClass(row)">{{ parseNumber(rawTotal(row)) }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { computed } from 'vue';
import { data, AssetCategory, AssetCurrency } from '../data/assets.js';
import { parseNumber } from '@/utils/index.js';
// 列基于完整资产清单 AssetCategory，而不是 data[0]。
// 否则像 OKX 这类首行数据里还没出现的资产会整列缺失。
const assetKeys = AssetCategory.map(asset => asset.name);

// 从 date 字符串中提取 YYYY-MM-DD 并推断星期（Mon-Sun）。
// date 格式不统一（可能带 'Sat'/'Wed' 等前缀），故用正则只取日期部分。
const getWeekday = (dateStr) => {
  const match = String(dateStr).match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return '-';
  const [ , y, m, d ] = match;
  const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
  return days[new Date(Number(y), Number(m) - 1, Number(d)).getDay()];
};


// 计算某一行的 total 原始数值（未格式化，用于比较大小）
const rawTotal = (item) => {
  let usdTotal = 0;
  let cnyTotal = 0;
  for (const asset of AssetCategory) {
    const name = asset.name;
    if (item[name]) { // 该资产留有余额
      if (asset.currency === AssetCurrency.USD) usdTotal += item[name];
      else if (asset.currency === AssetCurrency.CNY) cnyTotal += item[name];
    }
  }
  return usdTotal * item.exchangeRate + cnyTotal;
};

// 所有行的 total，用于定位最高 / 最低值
const totals = computed(() => data.map(rawTotal));
const maxTotal = computed(() => Math.max(...totals.value));
const minTotal = computed(() => Math.min(...totals.value));

// 最高值标红，最低值标绿（最高与最低相等时不着色）
const totalClass = (item) => {
  if (maxTotal.value === minTotal.value) return '';
  const value = rawTotal(item);
  if (value === maxTotal.value) return 'total-max';
  if (value === minTotal.value) return 'total-min';
  return '';
};
</script>
<style scoped>
.asset-table {
  border-collapse: collapse;
  width: 100%;
}
.asset-table th,
.asset-table td {
  border: 1px solid var(--border-color);
  text-align: center;
  padding: 8px;
}
.asset-table th {
  background-color: var(--bg-secondary);
}
.asset-table td.total-max {
  color: #ff4d4f;
  font-weight: bold;
}
.asset-table td.total-min {
  color: #2ee59d;
  font-weight: bold;
}
</style>