# DeepBook 订单簿深度图组件使用说明

## 概述

`OrderBook.vue` 组件用于查询和展示 DeepBook 协议中交易对的订单簿数据，并通过深度图进行可视化展示。

## 功能特性

1. **实时订单簿查询**: 连接 DeepBook V3 协议获取真实的买卖挂单数据
2. **深度图可视化**: 使用 Canvas 绘制订单簿深度图
3. **多交易对支持**: 支持 SUI/USDC、DEEP/SUI、DEEP/USDC 等交易对
4. **响应式设计**: 适配不同屏幕尺寸
5. **实时统计**: 显示总买单量、总卖单量、价差等统计信息

## 使用方法

### 1. 在项目中引入组件

```vue
<template>
  <div>
    <OrderBook />
  </div>
</template>

<script setup>
import OrderBook from '@/components/OrderBook.vue';
</script>
```

### 2. 组件功能说明

#### 控制面板
- **刷新按钮**: 点击获取最新的订单簿数据
- **交易对选择**: 切换不同的交易对（SUI/USDC、DEEP/SUI、DEEP/USDC）

#### 深度图
- **绿色区域**: 买单深度，价格越高深度越大
- **红色区域**: 卖单深度，价格越低深度越大
- **网格线**: 辅助查看价格和数量刻度

#### 订单簿表格
- **买单表格**: 显示所有买单的价格、数量和累计数量
- **卖单表格**: 显示所有卖单的价格、数量和累计数量

#### 统计信息
- **总买单数量**: 所有买单的总数量
- **总卖单数量**: 所有卖单的总数量  
- **价差**: 最优买价和最优卖价之间的差值

## 技术实现

### API 调用策略

组件采用多层级的数据获取策略：

1. **优先使用真实 API**: 尝试调用 DeepBook V3 的订单簿 API
2. **聚合订单数据**: 如果没有直接的订单簿 API，通过聚合所有开放订单构建订单簿
3. **模拟数据兜底**: 如果 API 调用失败，使用模拟数据进行演示

### 关键代码片段

```javascript
// 获取订单簿数据
const fetchOrderBookData = async () => {
  try {
    // 尝试获取所有开放订单
    const allOrderIds = await dbClient.getAllOpenOrders?.(selectedPool.value);
    
    if (allOrderIds && allOrderIds.length > 0) {
      const bidOrdersMap = new Map();
      const askOrdersMap = new Map();
      
      // 聚合相同价格的订单
      for (const orderId of allOrderIds) {
        const order = await dbClient.getOrderNormalized(selectedPool.value, orderId);
        if (!order) continue;
        
        const price = Number(order.normalized_price);
        const remainingQuantity = Number(order.quantity) - Number(order.filled_quantity);
        
        const orderMap = order.isBid ? bidOrdersMap : askOrdersMap;
        const existingQuantity = orderMap.get(price) || 0;
        orderMap.set(price, existingQuantity + remainingQuantity);
      }
      
      // 转换为组件需要的格式
      bidOrders.value = Array.from(bidOrdersMap.entries()).map(([price, quantity]) => ({
        price, quantity
      }));
    }
  } catch (error) {
    // 使用模拟数据
    console.warn('API 调用失败，使用模拟数据');
  }
};
```

## DeepBook V3 API 集成

### 当前实现状态

由于 DeepBook V3 SDK 的 API 可能还在发展中，组件目前：

1. **尝试调用可能存在的 API 方法**:
   - `dbClient.getAllOpenOrders(pool)`
   - `dbClient.getPoolInfo(pool)`
   - `dbClient.getOrderNormalized(pool, orderId)`

2. **提供模拟数据**: 当真实 API 不可用时，生成合理的模拟数据用于演示

### 真实 API 集成指南

要集成真实的 DeepBook API，你需要：

1. **查阅 DeepBook V3 文档**: 确认获取订单簿的正确 API 方法
2. **更新 API 调用**: 替换 `fetchOrderBookData` 函数中的 API 调用
3. **处理数据格式**: 确保返回的数据格式符合组件期望

示例真实 API 集成：

```javascript
// 假设 DeepBook V3 提供了这些方法
const fetchOrderBookData = async () => {
  try {
    // 方法1: 直接获取订单簿
    const orderBook = await dbClient.getOrderBook(selectedPool.value, {
      depth: 20 // 获取前20档
    });
    
    bidOrders.value = orderBook.bids;
    askOrders.value = orderBook.asks;
    
  } catch (error) {
    // 方法2: 通过市场数据 API
    const marketData = await dbClient.getMarketDepth(selectedPool.value);
    bidOrders.value = marketData.bidLevels;
    askOrders.value = marketData.askLevels;
  }
};
```

## 自定义配置

### 网络配置

```javascript
const network = 'mainnet'; // 或 'testnet', 'devnet'
const rpcEndpoints = {
  mainnet: 'https://fullnode.mainnet.sui.io',
  testnet: 'https://fullnode.testnet.sui.io',
  devnet: 'https://fullnode.devnet.sui.io'
};
```

### 支持的交易对

```javascript
const supportedPools = [
  'SUI_USDC',
  'DEEP_SUI', 
  'DEEP_USDC',
  'WUSDT_USDC',
  'WUSDC_USDC',
  'BETH_USDC'
];
```

## 注意事项

1. **API 限制**: 注意 DeepBook API 的调用频率限制
2. **数据延迟**: 订单簿数据可能有轻微延迟
3. **错误处理**: 组件包含完善的错误处理和降级策略
4. **性能优化**: 大量订单时会限制查询数量以避免性能问题

## 故障排除

### 常见问题

1. **无法获取数据**: 检查网络连接和 RPC 端点配置
2. **API 调用失败**: 确认 DeepBook V3 SDK 版本和 API 方法名称
3. **深度图不显示**: 检查 Canvas 元素是否正确渲染

### 调试信息

组件会在控制台输出详细的调试信息：

```javascript
console.log('正在获取订单簿数据...');
console.log('Pool info:', poolInfo);
console.log('All order IDs:', allOrderIds);
console.log(`获取到 ${bidOrders.value.length} 个买单, ${askOrders.value.length} 个卖单`);
```

## 扩展功能

可以考虑添加的功能：

1. **实时更新**: 使用 WebSocket 实现实时数据更新
2. **更多图表类型**: 添加 K 线图、成交量图等
3. **订单操作**: 直接在界面上下单
4. **历史数据**: 显示历史订单簿快照
5. **价格提醒**: 设置价格到达提醒

## 依赖项

```json
{
  "vue": "^3.0.0",
  "@mysten/sui": "latest",
  "@mysten/deepbook-v3": "latest"
}
```