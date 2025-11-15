<template>
  <div class="quantity-calculator">
    <div class="header">
      <h1>DeepBook V3 数量计算器</h1>
      <p class="description">
        演示 getQuoteQuantityOut、getBaseQuantityOut 和 getQuantityOut 方法的使用
      </p>
    </div>

    <!-- 池子选择 -->
    <div class="pool-selector">
      <h2>选择交易池</h2>
      <div class="pool-grid">
        <div 
          v-for="pool in availablePools" 
          :key="pool.key"
          class="pool-card"
          :class="{ active: selectedPool === pool.key }"
          @click="selectPool(pool.key)"
        >
          <div class="pool-name">{{ pool.name }}</div>
          <div class="pool-description">{{ pool.description }}</div>
        </div>
      </div>
    </div>

    <!-- 方法选择 -->
    <div class="method-selector"
         v-if="selectedPool"
    >
      <h2>选择计算方法</h2>
      <div class="method-tabs">
        <button 
          v-for="method in methods" 
          :key="method.key"
          class="method-tab"
          :class="{ active: selectedMethod === method.key }"
          @click="selectMethod(method.key)"
        >
          {{ method.name }}
        </button>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-section"
         v-if="selectedMethod"
    >
      <h2>输入参数</h2>
      <div class="input-form">
        <!-- getQuoteQuantityOut -->
        <div v-if="selectedMethod === 'getQuoteQuantityOut'"
             class="input-group"
        >
          <label>基础资产数量 (Base Quantity):</label>
          <input 
            v-model.number="baseQuantity" 
            type="number" 
            step="0.000001"
            placeholder="输入基础资产数量"
            class="quantity-input"
          >
          <div class="input-hint">
            例如：输入 100 表示 100 个 {{ getBaseAsset() }}
          </div>
        </div>

        <!-- getBaseQuantityOut -->
        <div v-if="selectedMethod === 'getBaseQuantityOut'"
             class="input-group"
        >
          <label>报价资产数量 (Quote Quantity):</label>
          <input 
            v-model.number="quoteQuantity" 
            type="number" 
            step="0.000001"
            placeholder="输入报价资产数量"
            class="quantity-input"
          >
          <div class="input-hint">
            例如：输入 1000 表示 1000 个 {{ getQuoteAsset() }}
          </div>
        </div>

        <!-- getQuantityOut -->
        <div v-if="selectedMethod === 'getQuantityOut'"
             class="input-group"
        >
          <div class="quantity-type-selector">
            <label>选择输入类型:</label>
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="quantityType" 
                  value="base"
                >
                基础资产 ({{ getBaseAsset() }})
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="quantityType" 
                  value="quote"
                >
                报价资产 ({{ getQuoteAsset() }})
              </label>
            </div>
          </div>
          
          <div v-if="quantityType === 'base'"
               class="input-group"
          >
            <label>基础资产数量:</label>
            <input 
              v-model.number="baseQuantityForGeneral" 
              type="number" 
              step="0.000001"
              placeholder="输入基础资产数量"
              class="quantity-input"
            >
          </div>
          
          <div v-if="quantityType === 'quote'"
               class="input-group"
          >
            <label>报价资产数量:</label>
            <input 
              v-model.number="quoteQuantityForGeneral" 
              type="number" 
              step="0.000001"
              placeholder="输入报价资产数量"
              class="quantity-input"
            >
          </div>
        </div>

        <button 
          @click="calculateQuantity" 
          class="calculate-btn"
          :disabled="isCalculating || !canCalculate()"
        >
          {{ isCalculating ? '计算中...' : '计算预估结果' }}
        </button>
      </div>
    </div>

    <!-- 结果展示 -->
    <div class="results-section"
         v-if="calculationResult"
    >
      <h2>计算结果</h2>
      <div class="result-card">
        <div class="result-header">
          <h3>{{ getCurrentMethodName() }} 结果</h3>
          <div class="pool-info">池子: {{ getCurrentPoolName() }}</div>
        </div>
        
        <div class="result-grid">
          <!-- 输入参数 -->
          <div class="result-item input-params">
            <h4>输入参数</h4>
            <div v-if="calculationResult.baseQuantity !== undefined"
                 class="param"
            >
              <span class="label">基础资产数量:</span>
              <span class="value">{{ formatNumber(calculationResult.baseQuantity) }} {{ getBaseAsset() }}</span>
            </div>
            <div v-if="calculationResult.quoteQuantity !== undefined"
                 class="param"
            >
              <span class="label">报价资产数量:</span>
              <span class="value">{{ formatNumber(calculationResult.quoteQuantity) }} {{ getQuoteAsset() }}</span>
            </div>
          </div>

          <!-- 输出结果 -->
          <div class="result-item output-params">
            <h4>输出结果</h4>
            <div class="param highlight">
              <span class="label">基础资产输出:</span>
              <span class="value">{{ formatNumber(calculationResult.baseOut) }} {{ getBaseAsset() }}</span>
            </div>
            <div class="param highlight">
              <span class="label">报价资产输出:</span>
              <span class="value">{{ formatNumber(calculationResult.quoteOut) }} {{ getQuoteAsset() }}</span>
            </div>
          </div>

          <!-- 费用信息 -->
          <div class="result-item fee-info">
            <h4>费用信息</h4>
            <div class="param">
              <span class="label">所需 DEEP 代币:</span>
              <span class="value fee">{{ formatNumber(calculationResult.deepRequired) }} DEEP</span>
            </div>
          </div>
        </div>

        <!-- 汇率信息 -->
        <div class="exchange-rate"
             v-if="calculationResult.baseOut > 0 && calculationResult.quoteOut > 0"
        >
          <h4>有效汇率</h4>
          <div class="rate-info">
            <div class="rate">
              1 {{ getBaseAsset() }} ≈ {{ formatNumber(calculationResult.quoteOut / calculationResult.baseOut) }} {{ getQuoteAsset() }}
            </div>
            <div class="rate">
              1 {{ getQuoteAsset() }} ≈ {{ formatNumber(calculationResult.baseOut / calculationResult.quoteOut) }} {{ getBaseAsset() }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误信息 -->
    <div class="error-section"
         v-if="errorMessage"
    >
      <div class="error-card">
        <h3>计算失败</h3>
        <p>{{ errorMessage }}</p>
        <button @click="clearError"
                class="clear-error-btn"
        >清除错误</button>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="help-section">
      <h2>使用说明</h2>
      <div class="help-content">
        <div class="method-help">
          <h3>方法说明</h3>
          <div class="method-item">
            <h4>getQuoteQuantityOut</h4>
            <p>输入基础资产数量，计算能获得多少报价资产。适用于"卖出"场景。</p>
          </div>
          <div class="method-item">
            <h4>getBaseQuantityOut</h4>
            <p>输入报价资产数量，计算能获得多少基础资产。适用于"买入"场景。</p>
          </div>
          <div class="method-item">
            <h4>getQuantityOut</h4>
            <p>通用方法，可以处理两个方向的转换，但只能有一个输入非零。</p>
          </div>
        </div>
        
        <div class="note">
          <h4>注意事项</h4>
          <ul>
            <li>所有计算都是预估值，实际交易可能因市场变化而有所不同</li>
            <li>DEEP 代币用于支付交易费用</li>
            <li>数量使用标准十进制格式（如 10.5）</li>
            <li>这些是只读操作，不会执行实际交易</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { DeepBookClient } from '@mysten/deepbook-v3';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

export default {
  name: 'QuantityCalculator',
  setup() {
    // 响应式数据
    const selectedPool = ref('');
    const selectedMethod = ref('');
    const baseQuantity = ref(0);
    const quoteQuantity = ref(0);
    const quantityType = ref('base');
    const baseQuantityForGeneral = ref(0);
    const quoteQuantityForGeneral = ref(0);
    const isCalculating = ref(false);
    const calculationResult = ref(null);
    const errorMessage = ref('');

    // 可用池子
    const availablePools = ref([
      {
        key: 'SUI_USDC',
        name: 'SUI/USDC',
        description: 'SUI 与 USDC 交易对',
        baseAsset: 'SUI',
        quoteAsset: 'USDC'
      },
      {
        key: 'DEEP_SUI',
        name: 'DEEP/SUI',
        description: 'DEEP 与 SUI 交易对',
        baseAsset: 'DEEP',
        quoteAsset: 'SUI'
      },
      {
        key: 'DEEP_USDC',
        name: 'DEEP/USDC',
        description: 'DEEP 与 USDC 交易对',
        baseAsset: 'DEEP',
        quoteAsset: 'USDC'
      }
    ]);

    // 可用方法
    const methods = ref([
      {
        key: 'getQuoteQuantityOut',
        name: 'getQuoteQuantityOut',
        description: '基础资产 → 报价资产'
      },
      {
        key: 'getBaseQuantityOut',
        name: 'getBaseQuantityOut',
        description: '报价资产 → 基础资产'
      },
      {
        key: 'getQuantityOut',
        name: 'getQuantityOut',
        description: '通用转换方法'
      }
    ]);

    // DeepBook 客户端
    let dbClient = null;

    // 初始化客户端
    const initializeClient = () => {
      try {
        const suiClient = new SuiClient({
          url: getFullnodeUrl('mainnet')
        });
        
        dbClient = new DeepBookClient({
          client: suiClient,
          address: '0x0000000000000000000000000000000000000000000000000000000000000000',
          env: 'mainnet'
        });
      } catch (error) {
        console.error('Failed to initialize DeepBook client:', error);
      }
    };

    // 选择池子
    const selectPool = (poolKey) => {
      selectedPool.value = poolKey;
      clearResults();
    };

    // 选择方法
    const selectMethod = (methodKey) => {
      selectedMethod.value = methodKey;
      clearResults();
    };

    // 清除结果
    const clearResults = () => {
      calculationResult.value = null;
      errorMessage.value = '';
    };

    // 清除错误
    const clearError = () => {
      errorMessage.value = '';
    };

    // 检查是否可以计算
    const canCalculate = () => {
      if (!selectedPool.value || !selectedMethod.value) return false;
      
      switch (selectedMethod.value) {
        case 'getQuoteQuantityOut':
          return baseQuantity.value > 0;
        case 'getBaseQuantityOut':
          return quoteQuantity.value > 0;
        case 'getQuantityOut':
          if (quantityType.value === 'base') {
            return baseQuantityForGeneral.value > 0;
          } else {
            return quoteQuantityForGeneral.value > 0;
          }
        default:
          return false;
      }
    };

    // 执行计算
    const calculateQuantity = async () => {
      if (!dbClient) {
        initializeClient();
      }

      if (!dbClient) {
        errorMessage.value = '无法初始化 DeepBook 客户端';
        return;
      }

      isCalculating.value = true;
      errorMessage.value = '';
      calculationResult.value = null;

      try {
        let result = null;

        switch (selectedMethod.value) {
          case 'getQuoteQuantityOut': {
            result = await dbClient.getQuoteQuantityOut(selectedPool.value, baseQuantity.value);
            break;
          }
          case 'getBaseQuantityOut': {
            result = await dbClient.getBaseQuantityOut(selectedPool.value, quoteQuantity.value);
            break;
          }
          case 'getQuantityOut': {
            const baseQty = quantityType.value === 'base' ? baseQuantityForGeneral.value : 0;
            const quoteQty = quantityType.value === 'quote' ? quoteQuantityForGeneral.value : 0;
            result = await dbClient.getQuantityOut(selectedPool.value, baseQty, quoteQty);
            break;
          }
        }

        if (result) {
          calculationResult.value = result;
        } else {
          errorMessage.value = '计算返回空结果';
        }
      } catch (error) {
        console.error('Calculation failed:', error);
        errorMessage.value = `计算失败: ${error.message || '未知错误'}`;
        
        // 如果是网络错误，提供模拟数据
        if (error.message?.includes('network') || error.message?.includes('fetch')) {
          provideMockResult();
        }
      } finally {
        isCalculating.value = false;
      }
    };

    // 提供模拟结果（用于演示）
    const provideMockResult = () => {
      const mockResults = {
        'getQuoteQuantityOut': {
          baseQuantity: baseQuantity.value,
          baseOut: baseQuantity.value,
          quoteOut: baseQuantity.value * 1.85, // 模拟汇率
          deepRequired: baseQuantity.value * 0.001
        },
        'getBaseQuantityOut': {
          quoteQuantity: quoteQuantity.value,
          baseOut: quoteQuantity.value / 1.85,
          quoteOut: quoteQuantity.value,
          deepRequired: quoteQuantity.value * 0.001
        },
        'getQuantityOut': quantityType.value === 'base' ? {
          baseQuantity: baseQuantityForGeneral.value,
          quoteQuantity: 0,
          baseOut: baseQuantityForGeneral.value,
          quoteOut: baseQuantityForGeneral.value * 1.85,
          deepRequired: baseQuantityForGeneral.value * 0.001
        } : {
          baseQuantity: 0,
          quoteQuantity: quoteQuantityForGeneral.value,
          baseOut: quoteQuantityForGeneral.value / 1.85,
          quoteOut: quoteQuantityForGeneral.value,
          deepRequired: quoteQuantityForGeneral.value * 0.001
        }
      };

      calculationResult.value = mockResults[selectedMethod.value];
      errorMessage.value = '注意: 由于网络问题，显示的是模拟数据';
    };

    // 获取当前池子信息
    const getCurrentPool = () => {
      return availablePools.value.find(pool => pool.key === selectedPool.value);
    };

    const getCurrentPoolName = () => {
      const pool = getCurrentPool();
      return pool ? pool.name : '';
    };

    const getBaseAsset = () => {
      const pool = getCurrentPool();
      return pool ? pool.baseAsset : 'BASE';
    };

    const getQuoteAsset = () => {
      const pool = getCurrentPool();
      return pool ? pool.quoteAsset : 'QUOTE';
    };

    const getCurrentMethodName = () => {
      const method = methods.value.find(m => m.key === selectedMethod.value);
      return method ? method.name : '';
    };

    // 格式化数字
    const formatNumber = (num) => {
      if (num === undefined || num === null) return '0';
      return Number(num).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      });
    };

    // 初始化
    initializeClient();

    return {
      selectedPool,
      selectedMethod,
      baseQuantity,
      quoteQuantity,
      quantityType,
      baseQuantityForGeneral,
      quoteQuantityForGeneral,
      isCalculating,
      calculationResult,
      errorMessage,
      availablePools,
      methods,
      selectPool,
      selectMethod,
      clearResults,
      clearError,
      canCalculate,
      calculateQuantity,
      getCurrentPoolName,
      getBaseAsset,
      getQuoteAsset,
      getCurrentMethodName,
      formatNumber
    };
  }
};
</script>

<style scoped>
.quantity-calculator {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.description {
  color: #7f8c8d;
  font-size: 16px;
}

.pool-selector, .method-selector, .input-section, .results-section, .help-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.pool-selector h2, .method-selector h2, .input-section h2, .results-section h2, .help-section h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.pool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.pool-card {
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pool-card:hover {
  border-color: #3498db;
  transform: translateY(-2px);
}

.pool-card.active {
  border-color: #3498db;
  background-color: #ebf3fd;
}

.pool-name {
  font-weight: bold;
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 8px;
}

.pool-description {
  color: #7f8c8d;
  font-size: 14px;
}

.method-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.method-tab {
  padding: 12px 24px;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.method-tab:hover {
  border-color: #3498db;
}

.method-tab.active {
  border-color: #3498db;
  background-color: #3498db;
  color: white;
}

.input-form {
  max-width: 500px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
}

.quantity-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.quantity-input:focus {
  outline: none;
  border-color: #3498db;
}

.input-hint {
  margin-top: 6px;
  font-size: 14px;
  color: #7f8c8d;
}

.quantity-type-selector {
  margin-bottom: 16px;
}

.radio-group {
  display: flex;
  gap: 20px;
  margin-top: 8px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.calculate-btn {
  width: 100%;
  padding: 14px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.calculate-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

.calculate-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.result-card {
  border: 2px solid #27ae60;
  border-radius: 12px;
  padding: 24px;
  background-color: #f8fff9;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #27ae60;
}

.result-header h3 {
  color: #27ae60;
  margin: 0;
}

.pool-info {
  color: #7f8c8d;
  font-weight: 500;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.result-item {
  background: white;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #3498db;
}

.result-item h4 {
  margin: 0 0 12px 0;
  color: #2c3e50;
}

.param {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px 0;
}

.param.highlight {
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  font-weight: 500;
}

.param .label {
  color: #7f8c8d;
}

.param .value {
  font-weight: 500;
  color: #2c3e50;
}

.param .value.fee {
  color: #e74c3c;
}

.exchange-rate {
  background: white;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #f39c12;
}

.exchange-rate h4 {
  margin: 0 0 12px 0;
  color: #2c3e50;
}

.rate-info {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.rate {
  background-color: #fef9e7;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 500;
  color: #f39c12;
}

.error-section {
  margin-bottom: 24px;
}

.error-card {
  background-color: #fdf2f2;
  border: 2px solid #e74c3c;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.error-card h3 {
  color: #e74c3c;
  margin: 0 0 12px 0;
}

.error-card p {
  color: #c0392b;
  margin-bottom: 16px;
}

.clear-error-btn {
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.help-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.method-help h3, .note h4 {
  color: #2c3e50;
  margin-bottom: 16px;
}

.method-item {
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.method-item h4 {
  color: #3498db;
  margin: 0 0 8px 0;
}

.method-item p {
  color: #7f8c8d;
  margin: 0;
}

.note ul {
  color: #7f8c8d;
  padding-left: 20px;
}

.note li {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .quantity-calculator {
    padding: 16px;
  }
  
  .help-content {
    grid-template-columns: 1fr;
  }
  
  .result-grid {
    grid-template-columns: 1fr;
  }
  
  .method-tabs {
    flex-direction: column;
  }
  
  .method-tab {
    text-align: center;
  }
}
</style>