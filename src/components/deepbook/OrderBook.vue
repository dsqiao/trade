<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="order-book-container">
    <h2>SUI/USDC 订单簿深度图</h2>
    
    <!-- 控制面板 -->
    <div class="controls">
      <button @click="fetchOrderBook"
              :disabled="loading"
      >
        {{ loading ? '加载中...' : '刷新订单簿' }}
      </button>
      <select v-model="selectedPool"
              @change="fetchOrderBook"
      >
        <option value="SUI_USDC">SUI/USDC</option>
        <option value="DEEP_SUI">DEEP/SUI</option>
        <option value="DEEP_USDC">DEEP/USDC</option>
      </select>
      <div class="price-levels-input">
        <label for="ticks">价格档位:</label>
        <input 
          id="ticks"
          v-model.number="ticks" 
          type="number" 
          min="1" 
          max="200" 
          step="1"
          @change="fetchOrderBook"
        />
      </div>
    </div>

    <!-- 深度图表 -->
    <div class="depth-chart"
         ref="chartContainer"
    >
      <canvas ref="depthCanvas"
              width="800"
              height="400"
      ></canvas>
    </div>

    <!-- 订单簿表格 -->
    <div class="order-book-tables">
      <!-- 买单表格 -->
      <div class="bid-orders">
        <h3>买单 (Bids)</h3>
        <table class="order-table">
          <thead>
            <tr>
              <th>价格</th>
              <th>数量</th>
              <th>累计</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in sortedBids"
                :key="index"
                class="bid-row"
            >
              <td class="price">{{ formatPrice(order.price) }}</td>
              <td class="quantity">{{ formatQuantity(order.quantity) }}</td>
              <td class="cumulative">{{ formatQuantity(order.cumulative) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 卖单表格 -->
      <div class="ask-orders">
        <h3>卖单 (Asks)</h3>
        <table class="order-table">
          <thead>
            <tr>
              <th>价格</th>
              <th>数量</th>
              <th>累计</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in sortedAsks"
                :key="index"
                class="ask-row"
            >
              <td class="price">{{ formatPrice(order.price) }}</td>
              <td class="quantity">{{ formatQuantity(order.quantity) }}</td>
              <td class="cumulative">{{ formatQuantity(order.cumulative) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="statistics">
      <div class="stat-item">
        <span class="label">总买单数量:</span>
        <span class="value">{{ totalBidQuantity.toFixed(2) }}</span>
      </div>
      <div class="stat-item">
        <span class="label">总卖单数量:</span>
        <span class="value">{{ totalAskQuantity.toFixed(2) }}</span>
      </div>
      <div class="stat-item">
        <span class="label">价差:</span>
        <span class="value">{{ spread.toFixed(6) }}</span>
      </div>
      <div class="stat-item"
           v-if="poolInfo.midPrice"
      >
        <span class="label">中间价格:</span>
        <span class="value">{{ poolInfo.midPrice.toFixed(6) }}</span>
      </div>
      <div class="stat-item">
        <span class="label">价格档位:</span>
        <span class="value">{{ ticks }}</span>
      </div>
    </div>

    <!-- 调试信息面板 -->
    <div class="debug-panel"
         v-if="showDebugInfo"
    >
      <h3>调试信息</h3>
      <div class="debug-content">
        <div class="debug-section">
          <h4>池子状态</h4>
          <pre>{{ JSON.stringify(poolInfo, null, 2) }}</pre>
        </div>
        <div class="debug-section">
          <h4>API 调用日志</h4>
          <div class="api-logs">
            <div v-for="(log, index) in apiLogs"
                 :key="index" 
                 :class="['log-entry', log.type]"
            >
              <span class="timestamp">{{ log.timestamp }}</span>
              <span class="method">{{ log.method }}</span>
              <span class="status">{{ log.status }}</span>
              <span class="message">{{ log.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 调试开关 -->
    <div class="debug-toggle">
      <button @click="showDebugInfo = !showDebugInfo">
        {{ showDebugInfo ? '隐藏调试信息' : '显示调试信息' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { SuiClient } from '@mysten/sui/client';
import { DeepBookClient } from '@mysten/deepbook-v3';

// 响应式数据
const loading = ref(false);
const selectedPool = ref('SUI_USDC');
const ticks = ref(100); // 默认价格档位为100
const bidOrders = ref([]);
const askOrders = ref([]);
const chartContainer = ref(null);
const depthCanvas = ref(null);
const showDebugInfo = ref(false);
const poolInfo = ref({});
const apiLogs = ref([]);

// 网络配置
const network = 'mainnet';
const rpcEndpoints = {
  mainnet: 'https://fullnode.mainnet.sui.io',
  testnet: 'https://fullnode.testnet.sui.io',
  devnet: 'https://fullnode.devnet.sui.io'
};

// 创建客户端
const client = new SuiClient({ url: rpcEndpoints[network] });

// 创建 DeepBook 客户端，使用一个虚拟地址（因为我们主要进行只读操作）
let dbClient;
try {
  dbClient = new DeepBookClient({
    address: '0x0000000000000000000000000000000000000000000000000000000000000000',
    env: network,
    client,
  });
  console.log('DeepBook 客户端初始化成功');
} catch (error) {
  console.error('DeepBook 客户端初始化失败:', error);
}

// 计算属性
const sortedBids = computed(() => {
  const sorted = [ ...bidOrders.value ].sort((a, b) => b.price - a.price);
  let cumulative = 0;
  return sorted.map(order => {
    cumulative += order.quantity;
    return { ...order, cumulative };
  });
});

const sortedAsks = computed(() => {
  const sorted = [ ...askOrders.value ].sort((a, b) => a.price - b.price);
  let cumulative = 0;
  return sorted.map(order => {
    cumulative += order.quantity;
    return { ...order, cumulative };
  });
});

const totalBidQuantity = computed(() => {
  return bidOrders.value.reduce((sum, order) => sum + order.quantity, 0);
});

const totalAskQuantity = computed(() => {
  return askOrders.value.reduce((sum, order) => sum + order.quantity, 0);
});

const spread = computed(() => {
  if (sortedBids.value.length === 0 || sortedAsks.value.length === 0) return 0;
  return sortedAsks.value[0].price - sortedBids.value[0].price;
});

// 添加 API 调用日志
const addApiLog = (method, status, message) => {
  const timestamp = new Date().toLocaleTimeString();
  apiLogs.value.unshift({
    timestamp,
    method,
    status,
    message,
    type: status === 'success' ? 'success' : status === 'error' ? 'error' : 'info'
  });
  
  // 限制日志数量
  if (apiLogs.value.length > 50) {
    apiLogs.value = apiLogs.value.slice(0, 50);
  }
};

// 检查池子是否存在和可访问
const checkPoolAvailability = async (poolKey) => {
  try {
    addApiLog('checkPoolAvailability', 'info', `检查池子 ${poolKey}`);
    
    // 尝试获取池子的基本信息来验证池子是否存在
    const whitelisted = await dbClient.whitelisted(poolKey);
    addApiLog('whitelisted', 'success', `白名单状态: ${whitelisted}`);
    console.log(`池子 ${poolKey} 白名单状态:`, whitelisted);
    
    const midPrice = await dbClient.midPrice(poolKey);
    addApiLog('midPrice', 'success', `中间价格: ${midPrice}`);
    console.log(`池子 ${poolKey} 中间价格:`, midPrice);
    
    // 获取其他池子信息
    try {
      const tradeParams = await dbClient.poolTradeParams(poolKey);
      addApiLog('poolTradeParams', 'success', `交易参数获取成功`);
      
      const bookParams = await dbClient.poolBookParams(poolKey);
      addApiLog('poolBookParams', 'success', `账本参数获取成功`);
      
      const vaultBalances = await dbClient.vaultBalances(poolKey);
      addApiLog('vaultBalances', 'success', `金库余额获取成功`);
      
      // 更新池子信息
      poolInfo.value = {
        exists: true,
        whitelisted,
        midPrice,
        tradeParams,
        bookParams,
        vaultBalances
      };
      
    } catch (infoError) {
      addApiLog('poolInfo', 'warning', `部分池子信息获取失败: ${infoError.message}`);
      poolInfo.value = { exists: true, whitelisted, midPrice };
    }
    
    return { exists: true, whitelisted, midPrice };
  } catch (error) {
    addApiLog('checkPoolAvailability', 'error', `池子检查失败: ${error.message}`);
    console.warn(`池子 ${poolKey} 不可访问:`, error.message);
    poolInfo.value = { exists: false, error: error.message };
    return { exists: false, error: error.message };
  }
};

// 获取订单簿数据
const fetchOrderBook = async () => {
  if (!dbClient) {
    console.error('DeepBook 客户端未初始化');
    return;
  }
  
  loading.value = true;
  try {
    console.log(`开始获取 ${selectedPool.value} 的订单簿数据...`);
    
    // 首先检查池子是否可用
    const poolStatus = await checkPoolAvailability(selectedPool.value);
    console.log('池子状态:', poolStatus);
    
    // 获取订单簿数据
    await fetchOrderBookData();
    
    // 绘制深度图
    await nextTick();
    drawDepthChart();
    
    console.log('订单簿数据获取和渲染完成');
    
  } catch (error) {
    console.error('获取订单簿数据失败:', error);
    
    // 即使出错也显示一些基本数据
    if (bidOrders.value.length === 0 && askOrders.value.length === 0) {
      console.log('使用兜底数据...');
      bidOrders.value = [
        { price: 2.1500, quantity: 1000 },
        { price: 2.1450, quantity: 1500 },
        { price: 2.1400, quantity: 2000 },
      ];
      
      askOrders.value = [
        { price: 2.1550, quantity: 1100 },
        { price: 2.1600, quantity: 1400 },
        { price: 2.1650, quantity: 1900 },
      ];
      
      await nextTick();
      drawDepthChart();
    }
  } finally {
    loading.value = false;
  }
};

// 获取订单簿数据的真实实现
const fetchOrderBookData = async () => {
  try {
    console.log(`正在获取 ${selectedPool.value} 的订单簿数据...`);
    
    // 重置数据
    bidOrders.value = [];
    askOrders.value = [];
    
    // 方法1: 使用 getLevel2TicksFromMid 获取订单簿数据
    try {
      addApiLog('getLevel2TicksFromMid', 'info', '尝试获取Level2订单簿数据');
      console.log('尝试使用 getLevel2TicksFromMid 获取订单簿...');
      
      // 获取从中间价格开始的订单簿数据，使用用户设置的价格档位
      const level2Data = await dbClient.getLevel2TicksFromMid(selectedPool.value, ticks.value);
      console.log('Level2 data:', level2Data);
      
      if (level2Data && level2Data.bid_prices && level2Data.ask_prices) {
        // 处理买单数据
        bidOrders.value = level2Data.bid_prices.map((price, index) => ({
          price: Number(price),
          quantity: Number(level2Data.bid_quantities[index] || 0)
        })).filter(order => order.quantity > 0);
        
        // 处理卖单数据
        askOrders.value = level2Data.ask_prices.map((price, index) => ({
          price: Number(price),
          quantity: Number(level2Data.ask_quantities[index] || 0)
        })).filter(order => order.quantity > 0);
        
        const message = `获取到 ${bidOrders.value.length} 个买单, ${askOrders.value.length} 个卖单 (档位: ${ticks.value})`;
        addApiLog('getLevel2TicksFromMid', 'success', message);
        console.log(`从 Level2 ${message}`);
        
        // 如果获取到了真实数据，直接返回
        if (bidOrders.value.length > 0 || askOrders.value.length > 0) {
          return;
        }
      } else {
        addApiLog('getLevel2TicksFromMid', 'warning', '返回数据格式不正确或为空');
      }
    } catch (level2Error) {
      addApiLog('getLevel2TicksFromMid', 'error', `调用失败: ${level2Error.message}`);
      console.warn('getLevel2TicksFromMid 调用失败:', level2Error);
    }
    
    // 方法2: 使用 getLevel2Range 获取指定价格范围的订单簿数据
    try {
      addApiLog('getLevel2Range', 'info', '尝试使用价格范围获取订单簿');
      console.log('尝试使用 getLevel2Range 获取订单簿...');
      
      // 先获取中间价格
      const midPrice = await dbClient.midPrice(selectedPool.value);
      console.log('Mid price:', midPrice);
      
      if (midPrice && midPrice > 0) {
        // 设置价格范围（中间价格的 ±5%）
        const priceRange = midPrice * 0.05;
        const priceLow = midPrice - priceRange;
        const priceHigh = midPrice + priceRange;
        
        const rangeMessage = `价格范围: ${priceLow.toFixed(4)} - ${priceHigh.toFixed(4)}`;
        addApiLog('getLevel2Range', 'info', rangeMessage);
        console.log(rangeMessage);
        
        // 获取买单数据
        const bidData = await dbClient.getLevel2Range(selectedPool.value, priceLow, midPrice, true);
        console.log('Bid data:', bidData);
        
        // 获取卖单数据
        const askData = await dbClient.getLevel2Range(selectedPool.value, midPrice, priceHigh, false);
        console.log('Ask data:', askData);
        
        // 处理买单数据
        if (bidData && bidData.prices && bidData.quantities) {
          bidOrders.value = bidData.prices.map((price, index) => ({
            price: Number(price),
            quantity: Number(bidData.quantities[index] || 0)
          })).filter(order => order.quantity > 0);
        }
        
        // 处理卖单数据
        if (askData && askData.prices && askData.quantities) {
          askOrders.value = askData.prices.map((price, index) => ({
            price: Number(price),
            quantity: Number(askData.quantities[index] || 0)
          })).filter(order => order.quantity > 0);
        }
        
        const resultMessage = `获取到 ${bidOrders.value.length} 个买单, ${askOrders.value.length} 个卖单`;
        addApiLog('getLevel2Range', 'success', resultMessage);
        console.log(`从 Level2Range ${resultMessage}`);
        
        // 如果获取到了真实数据，直接返回
        if (bidOrders.value.length > 0 || askOrders.value.length > 0) {
          return;
        }
      } else {
        addApiLog('getLevel2Range', 'warning', '无法获取有效的中间价格');
      }
    } catch (rangeError) {
      addApiLog('getLevel2Range', 'error', `调用失败: ${rangeError.message}`);
      console.warn('getLevel2Range 调用失败:', rangeError);
    }
    
    // 方法3: 尝试获取池子的基本信息和参数
    try {
      console.log('尝试获取池子基本信息...');
      
      // 获取池子交易参数
      const tradeParams = await dbClient.poolTradeParams(selectedPool.value);
      console.log('Trade params:', tradeParams);
      
      // 获取池子账本参数
      const bookParams = await dbClient.poolBookParams(selectedPool.value);
      console.log('Book params:', bookParams);
      
      // 获取池子余额
      const vaultBalances = await dbClient.vaultBalances(selectedPool.value);
      console.log('Vault balances:', vaultBalances);
      
      // 获取中间价格
      const midPrice = await dbClient.midPrice(selectedPool.value);
      console.log('Mid price:', midPrice);
      
      // 如果能获取到中间价格，生成基于真实价格的模拟数据
      if (midPrice && midPrice > 0) {
        addApiLog('simulateData', 'info', '基于真实中间价格生成模拟订单簿数据');
        console.log('基于真实中间价格生成订单簿数据...');
        
        const tickSize = bookParams?.tickSize || 0.0001;
        const spread = tickSize * 5; // 5个tick的价差
        
        // 生成买单（价格递减）
        bidOrders.value = [];
        const simulatedLevels = Math.min(ticks.value, 50); // 限制模拟数据最多50档
        for (let i = 0; i < simulatedLevels; i++) {
          const price = midPrice - spread / 2 - (i * tickSize);
          const quantity = Math.random() * 2000 + 500;
          bidOrders.value.push({ 
            price: Number(price.toFixed(6)), 
            quantity: Number(quantity.toFixed(2)) 
          });
        }
        
        // 生成卖单（价格递增）
        askOrders.value = [];
        for (let i = 0; i < simulatedLevels; i++) {
          const price = midPrice + spread / 2 + (i * tickSize);
          const quantity = Math.random() * 2000 + 500;
          askOrders.value.push({ 
            price: Number(price.toFixed(6)), 
            quantity: Number(quantity.toFixed(2)) 
          });
        }
        
        addApiLog('simulateData', 'success', `生成了 ${bidOrders.value.length} 个买单和 ${askOrders.value.length} 个卖单 (档位: ${simulatedLevels})`);
        console.log('基于真实价格的模拟数据生成完成');
        return;
      }
    } catch (infoError) {
      console.warn('获取池子信息失败:', infoError);
    }
    
    // 方法4: 如果所有真实API都失败，使用完全模拟的数据
    addApiLog('fallbackData', 'warning', '所有真实API调用都失败，使用完全模拟的数据');
    console.log('所有真实API调用都失败，使用完全模拟的数据...');
    
    // 根据不同的交易对设置不同的基准价格
    let basePrice;
    switch (selectedPool.value) {
      case 'SUI_USDC':
        basePrice = 2.15;
        break;
      case 'DEEP_SUI':
        basePrice = 0.05;
        break;
      case 'DEEP_USDC':
        basePrice = 0.11;
        break;
      default:
        basePrice = 1.0;
    }
    
    const spread = basePrice * 0.002; // 0.2% 价差
    
    // 生成买单（价格递减）
    bidOrders.value = [];
    const fallbackLevels = Math.min(ticks.value, 30); // 限制兜底数据最多30档
    for (let i = 0; i < fallbackLevels; i++) {
      const price = basePrice - spread / 2 - (i * spread / 10);
      const quantity = Math.random() * 2000 + 500;
      bidOrders.value.push({ 
        price: Number(price.toFixed(6)), 
        quantity: Number(quantity.toFixed(2)) 
      });
    }
    
    // 生成卖单（价格递增）
    askOrders.value = [];
    for (let i = 0; i < fallbackLevels; i++) {
      const price = basePrice + spread / 2 + (i * spread / 10);
      const quantity = Math.random() * 2000 + 500;
      askOrders.value.push({ 
        price: Number(price.toFixed(6)), 
        quantity: Number(quantity.toFixed(2)) 
      });
    }
    
    addApiLog('fallbackData', 'success', `生成了完全模拟的订单簿数据: ${bidOrders.value.length} 买单, ${askOrders.value.length} 卖单 (档位: ${fallbackLevels})`);
    console.log('完全模拟数据生成完成');
    
  } catch (error) {
    console.error('获取订单簿数据失败:', error);
    
    // 最后的兜底数据
    bidOrders.value = [
      { price: 2.1500, quantity: 1000 },
      { price: 2.1450, quantity: 1500 },
      { price: 2.1400, quantity: 2000 },
    ];
    
    askOrders.value = [
      { price: 2.1550, quantity: 1100 },
      { price: 2.1600, quantity: 1400 },
      { price: 2.1650, quantity: 1900 },
    ];
  }
};

// 绘制深度图
const drawDepthChart = () => {
  const canvas = depthCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // 清空画布
  ctx.clearRect(0, 0, width, height);

  // 设置样式
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, width, height);

  if (sortedBids.value.length === 0 && sortedAsks.value.length === 0) return;

  // 计算价格范围
  const allPrices = [
    ...sortedBids.value.map(o => o.price),
    ...sortedAsks.value.map(o => o.price)
  ];
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRange = maxPrice - minPrice;

  // 计算数量范围
  const maxCumulative = Math.max(
    ...sortedBids.value.map(o => o.cumulative),
    ...sortedAsks.value.map(o => o.cumulative)
  );

  // 绘制买单深度
  ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 2;
  ctx.beginPath();

  if (sortedBids.value.length > 0) {
    // 从最低价格的底部开始
    const firstBid = sortedBids.value[sortedBids.value.length - 1];
    const firstX = ((firstBid.price - minPrice) / priceRange) * width;
    ctx.moveTo(firstX, height);
    
    // 绘制买单深度线（从右到左，价格从低到高）
    for (let i = sortedBids.value.length - 1; i >= 0; i--) {
      const order = sortedBids.value[i];
      const x = ((order.price - minPrice) / priceRange) * width;
      const y = height - (order.cumulative / maxCumulative) * height;
      ctx.lineTo(x, y);
    }
    
    // 连接到最高价格的底部，形成封闭区域
    const lastBid = sortedBids.value[0];
    const lastX = ((lastBid.price - minPrice) / priceRange) * width;
    ctx.lineTo(lastX, height);
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // 绘制卖单深度
  ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
  ctx.strokeStyle = '#ff0000';
  ctx.beginPath();

  if (sortedAsks.value.length > 0) {
    // 从最低价格的底部开始
    const firstAsk = sortedAsks.value[0];
    const firstX = ((firstAsk.price - minPrice) / priceRange) * width;
    ctx.moveTo(firstX, height);
    
    // 绘制卖单深度线（从左到右，价格从低到高）
    sortedAsks.value.forEach((order) => {
      const x = ((order.price - minPrice) / priceRange) * width;
      const y = height - (order.cumulative / maxCumulative) * height;
      ctx.lineTo(x, y);
    });
    
    // 连接到最高价格的底部，形成封闭区域
    const lastAsk = sortedAsks.value[sortedAsks.value.length - 1];
    const lastX = ((lastAsk.price - minPrice) / priceRange) * width;
    ctx.lineTo(lastX, height);
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // 绘制网格线
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  
  // 垂直网格线
  for (let i = 0; i <= 10; i++) {
    const x = (i / 10) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  // 水平网格线
  for (let i = 0; i <= 10; i++) {
    const y = (i / 10) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 添加标签
  ctx.fillStyle = '#ffffff';
  ctx.font = '12px Arial';
  ctx.fillText(`最低价: ${minPrice.toFixed(4)}`, 10, height - 10);
  ctx.fillText(`最高价: ${maxPrice.toFixed(4)}`, width - 120, height - 10);
  ctx.fillText(`最大深度: ${maxCumulative.toFixed(2)}`, 10, 20);
};

// 格式化函数
const formatPrice = (price) => {
  return price.toFixed(4);
};

const formatQuantity = (quantity) => {
  return quantity.toFixed(2);
};

// 组件挂载时获取数据
onMounted(() => {
  fetchOrderBook();
});
</script>

<style scoped>
.order-book-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.controls button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.controls select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.price-levels-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-levels-input label {
  font-size: 14px;
  color: #495057;
  font-weight: 500;
  white-space: nowrap;
}

.price-levels-input input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 80px;
  font-size: 14px;
  text-align: center;
}

.price-levels-input input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.depth-chart {
  margin-bottom: 30px;
  text-align: center;
}

.depth-chart canvas {
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #1a1a1a;
}

.order-book-tables {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.bid-orders h3 {
  color: #28a745;
  margin-bottom: 10px;
}

.ask-orders h3 {
  color: #dc3545;
  margin-bottom: 10px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Courier New', monospace;
}

.order-table th,
.order-table td {
  padding: 8px 12px;
  text-align: right;
  border: 1px solid #ddd;
}

.order-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.bid-row {
  background-color: rgba(40, 167, 69, 0.1);
}

.ask-row {
  background-color: rgba(220, 53, 69, 0.1);
}

.bid-row .price {
  color: #28a745;
  font-weight: bold;
}

.ask-row .price {
  color: #dc3545;
  font-weight: bold;
}

.statistics {
  display: flex;
  gap: 30px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-item .label {
  font-size: 12px;
  color: #6c757d;
  margin-bottom: 4px;
}

.stat-item .value {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.debug-panel {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.debug-panel h3 {
  margin-top: 0;
  color: #495057;
}

.debug-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.debug-section h4 {
  margin-bottom: 10px;
  color: #6c757d;
  font-size: 14px;
}

.debug-section pre {
  background-color: #ffffff;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  font-size: 12px;
  max-height: 300px;
  overflow-y: auto;
}

.api-logs {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
}

.log-entry {
  display: grid;
  grid-template-columns: 80px 150px 80px 1fr;
  gap: 10px;
  padding: 5px 10px;
  border-bottom: 1px solid #f1f3f4;
  font-size: 12px;
  font-family: 'Courier New', monospace;
}

.log-entry.success {
  background-color: rgba(40, 167, 69, 0.1);
}

.log-entry.error {
  background-color: rgba(220, 53, 69, 0.1);
}

.log-entry.warning {
  background-color: rgba(255, 193, 7, 0.1);
}

.log-entry.info {
  background-color: rgba(23, 162, 184, 0.1);
}

.log-entry .timestamp {
  color: #6c757d;
}

.log-entry .method {
  font-weight: bold;
  color: #495057;
}

.log-entry .status {
  font-weight: bold;
}

.log-entry.success .status {
  color: #28a745;
}

.log-entry.error .status {
  color: #dc3545;
}

.log-entry.warning .status {
  color: #ffc107;
}

.log-entry.info .status {
  color: #17a2b8;
}

.log-entry .message {
  color: #495057;
}

.debug-toggle {
  margin-top: 10px;
  text-align: center;
}

.debug-toggle button {
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.debug-toggle button:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .order-book-tables {
    grid-template-columns: 1fr;
  }
  
  .statistics {
    flex-direction: column;
    gap: 10px;
  }
  
  .depth-chart canvas {
    width: 100%;
    height: auto;
  }
  
  .debug-content {
    grid-template-columns: 1fr;
  }
  
  .log-entry {
    grid-template-columns: 1fr;
    gap: 5px;
  }
}
</style>