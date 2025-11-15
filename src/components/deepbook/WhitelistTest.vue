<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="whitelist-test-container">
    <h2>DeepBook V3 池子白名单状态测试</h2>
    
    <!-- 测试控制面板 -->
    <div class="test-panel">
      <h3>白名单状态检查</h3>
      <div class="test-controls">
        <div class="pool-selector">
          <label for="pool-select">选择池子:</label>
          <select id="pool-select"
                  v-model="selectedPool"
          >
            <option value="SUI_USDC">SUI/USDC</option>
            <option value="DEEP_SUI">DEEP/SUI</option>
            <option value="DEEP_USDC">DEEP/USDC</option>
          </select>
        </div>
        <button @click="testWhitelisted"
                :disabled="loading"
                class="test-button"
        >
          {{ loading ? '检查中...' : '检查白名单状态' }}
        </button>
      </div>
      
      <!-- 测试结果显示 -->
      <div v-if="whitelistResult !== null"
           class="test-result"
      >
        <h4>测试结果</h4>
        <div class="result-grid">
          <div class="result-item">
            <strong>池子:</strong> {{ selectedPool }}
          </div>
          <div class="result-item">
            <strong>白名单状态:</strong> 
            <span :class="whitelistResult ? 'status-whitelisted' : 'status-not-whitelisted'">
              {{ whitelistResult ? '✅ 已白名单' : '❌ 未白名单' }}
            </span>
          </div>
          <div class="result-item">
            <strong>费用影响:</strong>
            <div class="fee-impact">
              {{ whitelistResult ? 
                '享有 0% 的 Taker 和 Maker 费用' : 
                '需要支付正常的交易费用' 
              }}
            </div>
          </div>
        </div>
        
        <!-- 详细影响说明 -->
        <div class="impact-explanation">
          <h5>影响说明:</h5>
          <div class="explanation-content">
            {{ whitelistResult ? 
              '白名单池子享有零费用交易特权，通常用于 DEEP/USDC 或 DEEP/SUI 等核心交易对，为其他池子提供 DEEP 价格转换数据。' : 
              '非白名单池子需要支付正常的 taker 和 maker 费用，费用根据池子类型（稳定币对或波动币对）而定。' 
            }}
          </div>
        </div>
      </div>
    </div>

    <!-- 白名单机制详细说明 -->
    <div class="mechanism-explanation">
      <h3>白名单机制说明</h3>
      <div class="explanation-grid">
        <div class="explanation-card">
          <h4>🎯 白名单特权</h4>
          <ul>
            <li>享有 0% 的 Taker 费用</li>
            <li>享有 0% 的 Maker 费用</li>
            <li>完全免费的交易体验</li>
          </ul>
        </div>
        
        <div class="explanation-card">
          <h4>📊 价格数据源</h4>
          <ul>
            <li>为其他池子提供 DEEP 价格基准</li>
            <li>支持整个生态系统的费用计算</li>
            <li>通常是 DEEP/USDC 或 DEEP/SUI</li>
          </ul>
        </div>
        
        <div class="explanation-card">
          <h4>💰 费用结构对比</h4>
          <div class="fee-comparison">
            <div class="fee-type">
              <strong>波动币对:</strong>
              <ul>
                <li>Taker: 1-10 bps</li>
                <li>Maker: 0-5 bps</li>
              </ul>
            </div>
            <div class="fee-type">
              <strong>稳定币对:</strong>
              <ul>
                <li>Taker: 0.1-1 bps</li>
                <li>Maker: 0-0.5 bps</li>
              </ul>
            </div>
            <div class="fee-type">
              <strong>白名单池子:</strong>
              <ul>
                <li>Taker: 0 bps</li>
                <li>Maker: 0 bps</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="explanation-card">
          <h4>🏛️ 治理影响</h4>
          <ul>
            <li>白名单状态由协议治理决定</li>
            <li>影响整个生态系统的费用结构</li>
            <li>关系到流动性的分布和集中</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- API 调用日志 -->
    <div class="api-logs-section">
      <h3>API 调用日志</h3>
      <div class="api-logs">
        <div v-if="apiLogs.length === 0"
             class="no-logs"
        >
          暂无日志记录
        </div>
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
</template>

<script setup>
import { ref } from 'vue';
import { SuiClient } from '@mysten/sui/client';
import { DeepBookClient } from '@mysten/deepbook-v3';

// 响应式数据
const loading = ref(false);
const selectedPool = ref('SUI_USDC');
const whitelistResult = ref(null);
const apiLogs = ref([]);

// 添加API日志
const addApiLog = (method, type, message) => {
  const timestamp = new Date().toLocaleTimeString();
  apiLogs.value.unshift({
    timestamp,
    method,
    type,
    status: type === 'success' ? '成功' : type === 'error' ? '失败' : type === 'warning' ? '警告' : '信息',
    message
  });
  
  // 限制日志数量
  if (apiLogs.value.length > 50) {
    apiLogs.value = apiLogs.value.slice(0, 50);
  }
};

// whitelisted 方法测试
const testWhitelisted = async () => {
  try {
    loading.value = true;
    addApiLog('whitelisted', 'info', `开始检查池子 ${selectedPool.value} 的白名单状态`);
    
    // 初始化客户端
    const suiClient = new SuiClient({
      url: 'https://fullnode.mainnet.sui.io:443'
    });
    
    const dbClient = new DeepBookClient({
      client: suiClient,
      address: '0x0', // 临时地址
      env: 'mainnet'
    });
    
    // 调用 whitelisted 方法
    const isWhitelisted = await dbClient.whitelisted(selectedPool.value);
    whitelistResult.value = isWhitelisted;
    
    addApiLog('whitelisted', 'success', 
      `池子 ${selectedPool.value} 白名单状态: ${isWhitelisted ? '已白名单' : '未白名单'}`);
    
    console.log(`池子 ${selectedPool.value} 白名单状态:`, isWhitelisted);
    
  } catch (error) {
    console.error('检查白名单状态失败:', error);
    addApiLog('whitelisted', 'error', `检查失败: ${error.message}`);
    whitelistResult.value = null;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.whitelist-test-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.whitelist-test-container h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
}

.test-panel {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  margin-bottom: 30px;
}

.test-panel h3 {
  margin-top: 0;
  color: #495057;
  margin-bottom: 20px;
}

.test-controls {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}

.pool-selector label {
  margin-right: 10px;
  font-weight: 500;
}

.pool-selector select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.test-button {
  padding: 10px 20px;
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.test-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.test-button:hover:not(:disabled) {
  background-color: #138496;
}

.test-result {
  background-color: white;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.test-result h4 {
  margin-top: 0;
  color: #495057;
  margin-bottom: 15px;
}

.result-grid {
  display: grid;
  gap: 15px;
  margin-bottom: 20px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.status-whitelisted {
  color: #28a745;
  font-weight: bold;
}

.status-not-whitelisted {
  color: #dc3545;
  font-weight: bold;
}

.fee-impact {
  color: #6c757d;
  font-style: italic;
}

.impact-explanation {
  padding-top: 15px;
  border-top: 1px solid #dee2e6;
}

.impact-explanation h5 {
  margin-bottom: 10px;
  color: #495057;
}

.explanation-content {
  font-size: 14px;
  color: #6c757d;
  line-height: 1.5;
}

.mechanism-explanation {
  margin-bottom: 30px;
}

.mechanism-explanation h3 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.explanation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.explanation-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.explanation-card h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #495057;
  font-size: 16px;
}

.explanation-card ul {
  margin: 0;
  padding-left: 20px;
}

.explanation-card li {
  margin-bottom: 8px;
  color: #6c757d;
  font-size: 14px;
}

.fee-comparison {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.fee-type {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.fee-type strong {
  color: #495057;
  display: block;
  margin-bottom: 5px;
}

.fee-type ul {
  margin: 0;
  padding-left: 15px;
}

.fee-type li {
  margin-bottom: 3px;
  font-size: 13px;
}

.api-logs-section {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.api-logs-section h3 {
  margin-top: 0;
  color: #495057;
  margin-bottom: 15px;
}

.api-logs {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
}

.no-logs {
  padding: 20px;
  text-align: center;
  color: #6c757d;
  font-style: italic;
}

.log-entry {
  display: grid;
  grid-template-columns: 80px 120px 60px 1fr;
  gap: 10px;
  padding: 8px 15px;
  border-bottom: 1px solid #f1f3f4;
  font-size: 12px;
  font-family: 'Courier New', monospace;
}

.log-entry:last-child {
  border-bottom: none;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .test-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .explanation-grid {
    grid-template-columns: 1fr;
  }
  
  .log-entry {
    grid-template-columns: 1fr;
    gap: 5px;
  }
  
  .log-entry .timestamp,
  .log-entry .method,
  .log-entry .status {
    font-weight: bold;
  }
}
</style>