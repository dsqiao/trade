<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>checkManagerBalance</div>
  <table class="asset-table">
    <thead>
      <tr>
        <th>资产类型</th>
        <th>数量</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, asset) in assets"
          :key="asset"
      >
        <td>{{ asset }}</td>
        <td>{{ value }}</td>
      </tr>
    </tbody>
  </table>
  <div>accountOpenOrders</div>
  <table class="order-table">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Client Order ID</th>
        <th>Quantity</th>
        <th>Filled Quantity</th>
        <th>Price</th>
        <th>Is Bid</th>
        <th>Status</th>
        <th>Epoch</th>
        <th>Expire</th>
        <th>Fee is Deep</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders"
          :key="order.order_id"
      >
        <td>{{ order.order_id }}</td>
        <td>{{ order.client_order_id }}</td>
        <td>{{ order.quantity }}</td>
        <td>{{ order.filled_quantity }}</td>
        <td>{{ order.normalized_price }}</td>
        <td>{{ order.isBid ? 'Bid' : 'Ask' }}</td>
        <td>{{ order.status }}</td>
        <td>{{ order.epoch }}</td>
        <td>{{ toLocalTime(Number(order.expire_timestamp)) }}</td>
        <td>{{ order.fee_is_deep ? 'Yes' : 'No' }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { ref } from 'vue';
import { SuiClient } from '@mysten/sui/client';
import { DeepBookClient } from '@mysten/deepbook-v3';
import { toLocalTime } from '@/utils';
const orders = ref([]);

const network = 'mainnet';

// 配置网络端点
const rpcEndpoints = {
  mainnet: 'https://fullnode.mainnet.sui.io',
  testnet: 'https://fullnode.testnet.sui.io',
  devnet: 'https://fullnode.devnet.sui.io'
};

const balanceManagers = {
  MANAGER_1: {
    address: '0x344c2734b1d211bd15212bfb7847c66a3b18803f3f5ab00f5ff6f87b6fe6d27d',
    tradeCap: '',
  },
};

// 创建客户端
const client = new SuiClient({ url: rpcEndpoints[network] });
const dbClient = new DeepBookClient({
  address: '0x0',
  env: network,
  client,
  balanceManagers: balanceManagers,
});
const manager = 'MANAGER_1';

// check balance for a balance manager
const assets = { 'SUI': 0, 'USDC': 0, 'DEEP': 0 };
for (const asset of Object.keys(assets)) {
  const res = await dbClient.checkManagerBalance(manager, asset);
  assets[asset] = res.balance;
}

console.log(assets);

// 额外可选 'WUSDT_USDC', 'WUSDC_USDC', 'BETH_USDC' ，Update pools as needed
const pools = [
  'SUI_USDC',
  // 'DEEP_SUI',
  // 'DEEP_USDC'
]; 

for (const pool of pools) {
  // get open orders for a balance manager
  const orderIds = await dbClient.accountOpenOrders(pool, manager);
  const bidOrdersMap = new Map();
  const askOrdersMap = new Map();

  for (const orderId of orderIds) {
    const order = await dbClient.getOrderNormalized(pool, orderId);
    if (!order) {
      continue;
    }
    orders.value.push(order);
    let remainingQuantity = 0;
    if (order) {
      remainingQuantity = Number(order.quantity) - Number(order.filled_quantity);
    }

    const orderMap = order.isBid ? bidOrdersMap : askOrdersMap;
    const orderPrice = Number(order.normalized_price);
    const existingQuantity = orderMap.get(orderPrice) || 0;
    orderMap.set(orderPrice, existingQuantity + remainingQuantity);
  }

  const sortedBidOrders = Array.from(bidOrdersMap.entries()).sort((a, b) => b[0] - a[0]);
  const sortedAskOrders = Array.from(askOrdersMap.entries()).sort((a, b) => a[0] - b[0]);

  console.log(`${pool} bid orders:`, sortedBidOrders);
  console.log(`${pool} ask orders:`, sortedAskOrders);
}
</script>


<style scoped>
/* assets 表格 */
.asset-table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
}

.asset-table th,
.asset-table td {
  border: 1px solid #333;
  text-align: center;
  padding: 8px;
}

.asset-table th {
  background-color: #f5f5f5;
}
/* order 表格 */
.order-table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}
.order-table th,
.order-table td {
  border: 1px solid #333;
  text-align: center;
  padding: 8px;
}
.order-table th {
  background-color: #f5f5f5;
}
</style>