<template>
  <div style="padding:16px">
    <h3>网格仓位可视化</h3>
    
    <!-- Scale selector -->
    <div class="controls">
      <label>
        <input type="radio"
               value="linear"
               v-model="scale"
        />
        线性刻度
      </label>
      <label>
        <input type="radio"
               value="log"
               v-model="scale"
        />
        对数刻度
      </label>
      
      <button @click="toggleExample"
              class="btn-switch"
      >
        切换示例 ({{ exampleType === 'narrow' ? '窄区间' : '宽区间' }})
      </button>
    </div>

    <!-- Log tick density selector (only show when log scale is active) -->
    <div v-if="scale === 'log'"
         class="density-controls"
    >
      <span class="density-label">刻度密度:</span>
      <label>
        <input type="radio"
               value="sparse"
               v-model="logTickDensity"
        />
        稀疏 (1, 10, 100...)
      </label>
      <label>
        <input type="radio"
               value="normal"
               v-model="logTickDensity"
        />
        正常 (1, 2, 5, 10...)
      </label>
      <label>
        <input type="radio"
               value="dense"
               v-model="logTickDensity"
        />
        密集 (1, 2, 3, 4, 5...)
      </label>
    </div>

    <div class="example-info">
      <strong>当前范围:</strong> {{ minPrice }} - {{ maxPrice }} USD
      <span v-if="scale === 'log'"
            style="color:#f59e0b; margin-left:12px"
      >
        📊 对数刻度适合展示跨度大的价格区间
      </span>
    </div>

    <PriceRangeAxis
      :min-price="minPrice"
      :max-price="maxPrice"
      :tick-step="tickStep"
      :positions="positions"
      :scale="scale"
      :log-tick-density="logTickDensity"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import PriceRangeAxis from './PriceRangeAxis.vue';

const scale = ref('log');
const exampleType = ref('narrow');
const logTickDensity = ref('normal');

// Narrow range example (0-5 USD, good for linear)
const narrowExample = {
  minPrice: 1,
  maxPrice: 5,
  tickStep: 0.2,
  positions: [
    { id: 'pos-1', from: 1.5, to: 2.5, color: '#10b981', label: '100 格' },
  ]
};

// Wide range example (0.1-1000 USD, good for log)
const wideExample = {
  minPrice: 0.1,
  maxPrice: 1000,
  tickStep: 100,
  positions: [
    { id: 'pos-1', from: 0.5, to: 2, color: '#10b981', label: '低价区' },
    { id: 'pos-2', from: 1.5, to: 5, color: '#3b82f6', label: '中低价区' },
    { id: 'pos-3', from: 10, to: 50, color: '#f59e0b', label: '中价区' },
    { id: 'pos-4', from: 100, to: 500, color: '#ef4444', label: '高价区' },
    { id: 'pos-5', from: 400, to: 800, color: '#8b5cf6', label: '超高价区' },
  ]
};

const currentExample = computed(() => 
  exampleType.value === 'narrow' ? narrowExample : wideExample
);

const minPrice = computed(() => currentExample.value.minPrice);
const maxPrice = computed(() => currentExample.value.maxPrice);
const tickStep = computed(() => currentExample.value.tickStep);
const positions = computed(() => currentExample.value.positions);

const toggleExample = () => {
  exampleType.value = exampleType.value === 'narrow' ? 'wide' : 'narrow';
  // Auto-switch to log scale for wide range
  if (exampleType.value === 'wide') {
    scale.value = 'log';
  }
};
</script>

<style scoped>
h3 { margin-bottom: 16px; }
.controls {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
}
.controls label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
}
.controls input[type="radio"] {
  cursor: pointer;
}
.btn-switch {
  margin-left: auto;
  padding: 6px 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}
.btn-switch:hover {
  background: #2563eb;
}
.example-info {
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #eff6ff;
  border-left: 3px solid #3b82f6;
  border-radius: 4px;
  font-size: 14px;
}
.density-controls {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
  background: #fef3c7;
  border-radius: 6px;
  border-left: 3px solid #f59e0b;
}
.density-label {
  font-weight: 600;
  font-size: 14px;
  color: #92400e;
}
.density-controls label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #78350f;
}
.density-controls input[type="radio"] {
  cursor: pointer;
}
</style>