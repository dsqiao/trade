<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    deep
  </div>
</template>
<script setup>
import { SuiClient } from '@mysten/sui/client';
import { DeepBookClient } from '@mysten/deepbook-v3';

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

// 额外可选 'WUSDT_USDC', 'WUSDC_USDC', 'BETH_USDC' ，Update pools as needed
const pools = [
  'SUI_USDC',
  // 'DEEP_SUI',
  // 'DEEP_USDC'
]; 
const manager = 'MANAGER_1'; // Update the manager accordingly

for (const pool of pools) {
  const orders = await dbClient.accountOpenOrders(pool, manager);
  const bidOrdersMap = new Map();
  const askOrdersMap = new Map();

  for (const orderId of orders) {
    const order = await dbClient.getOrderNormalized(pool, orderId);
    if (!order) {
      continue;
    }
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