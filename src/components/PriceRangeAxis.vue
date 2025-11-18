<template>
  <div class="axis-wrapper">
    <div class="axis"
         :style="axisStyle"
    >
      <div v-for="tick in ticks"
           :key="tick"
           class="tick"
           :style="{ left: toPercent(priceToRatio(tick)) }"
      >
        <div class="tick-line" />
        <div class="tick-label">{{ formatPrice(tick) }}</div>
      </div>

      <!-- stacked positions to avoid vertical overlap -->
      <div v-for="pos in stackedPositions.positions"
           :key="pos.id"
           class="position"
           :title="`${pos.label || pos.id}: ${pos.from} - ${pos.to}`"
           :style="{
             left: toPercent(priceToRatio(pos.from)),
             width: toPercent(priceToRatio(pos.to) - priceToRatio(pos.from)),
             top: `${baseTop + laneHeight * pos.lane}px`,
             backgroundColor: pos.color || '#17a2b8'
           }"
      >
        <span class="pos-label">{{ pos.label || `${pos.from}-${pos.to}` }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  positions: { type: Array, default: () => [] },
  tickStep: { type: Number, default: 0.5 },
  decimals: { type: Number, default: 2 },
  scale: { type: String, default: 'linear', validator: v => [ 'linear', 'log' ].includes(v) },
  logTickDensity: { type: String, default: 'normal', validator: v => [ 'sparse', 'normal', 'dense' ].includes(v) },
});

// Logarithmic scale helpers
const toLogScale = (price) => {
  if (props.scale !== 'log') return price;
  return Math.log10(Math.max(price, 0.0001)); // avoid log(0)
};

// Convert price to position ratio (0-1)
const priceToRatio = (price) => {
  if (props.scale === 'log') {
    const logMin = toLogScale(props.minPrice);
    const logMax = toLogScale(props.maxPrice);
    const logPrice = toLogScale(price);
    return (logPrice - logMin) / (logMax - logMin);
  }
  return (price - props.minPrice) / (props.maxPrice - props.minPrice);
};

const toPercent = (ratio) => `${Math.max(0, Math.min(1, ratio)) * 100}%`;
const formatPrice = (v) => Number(v).toFixed(props.decimals);

const ticks = computed(() => {
  const list = [];
  const start = props.minPrice;
  const end = props.maxPrice;
  
  if (props.scale === 'log') {
    // Generate logarithmic ticks (powers of 10 and their subdivisions)
    const logMin = Math.floor(Math.log10(start));
    const logMax = Math.ceil(Math.log10(end));
    
    // Define multipliers based on density
    let multipliers = [];
    if (props.logTickDensity === 'sparse') {
      multipliers = []; // Only powers of 10
    } else if (props.logTickDensity === 'normal') {
      multipliers = [ 2, 5 ]; // 1, 2, 5, 10, 20, 50...
    } else if (props.logTickDensity === 'dense') {
      multipliers = [ 2, 3, 4, 5, 6, 7, 8, 9 ]; // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10...
    }
    
    for (let exp = logMin; exp <= logMax; exp++) {
      const base = Math.pow(10, exp);
      // Major ticks: 1, 10, 100, etc.
      if (base >= start && base <= end) {
        list.push(base);
      }
      // Minor ticks based on density
      for (const mult of multipliers) {
        const val = base * mult;
        if (val >= start && val <= end && val < Math.pow(10, exp + 1)) {
          list.push(val);
        }
      }
    }
    return list.sort((a, b) => a - b);
  }
  
  // Linear scale
  const step = props.tickStep > 0 ? props.tickStep : (end - start) / 5;
  for (let v = start; v <= end + 1e-9; v = Number((v + step).toFixed(10))) {
    list.push(Number(v.toFixed(props.decimals)));
  }
  return list;
});

const normalizedPositions = computed(() => {
  return props.positions
    .map(p => {
      const from = Math.max(props.minPrice, Math.min(props.maxPrice, p.from));
      const to = Math.max(props.minPrice, Math.min(props.maxPrice, p.to));
      return from <= to ? { ...p, from, to } : { ...p, from: to, to: from };
    })
    .filter(p => p.to > p.from);
});

// stacking config
const baseTop = 30;       // px, baseline where the first lane starts
const laneHeight = 22;    // px, vertical spacing between lanes (includes bar height)
const axisMinHeight = 60; // px, minimal axis height

// Assign lane indices to avoid overlap
const stackedPositions = computed(() => {
  const sorted = [ ...normalizedPositions.value ].sort((a, b) =>
    a.from === b.from ? a.to - b.to : a.from - b.from
  );
  const lanesEnd = []; // last end price per lane
  const result = [];
  for (const p of sorted) {
    let laneIndex = -1;
    for (let i = 0; i < lanesEnd.length; i++) {
      // place in first lane whose last end does not overlap
      if (lanesEnd[i] <= p.from) { laneIndex = i; break; }
    }
    if (laneIndex === -1) { laneIndex = lanesEnd.length; lanesEnd.push(p.to); }
    else { lanesEnd[laneIndex] = p.to; }
    result.push({ ...p, lane: laneIndex });
  }
  return { positions: result, laneCount: lanesEnd.length };
});

const axisStyle = computed(() => {
  const laneCount = stackedPositions.value.laneCount || 1;
  const dynamicHeight = baseTop + laneHeight * laneCount + 10; // extra padding
  return { height: `${Math.max(axisMinHeight, dynamicHeight)}px` };
});
</script>

<style scoped>
.axis-wrapper { width: 100%; }
.axis {
  position: relative;
  /* height dynamically adjusted via inline style */
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: linear-gradient(180deg, #fafafa 0%, #fff 100%);
  padding: 18px 8px 8px;
  box-sizing: border-box;
}
.tick {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  text-align: center;
}
.tick-line { width: 1px; height: 10px; background: #9ca3af; margin: 0 auto 2px; }
.tick-label { font-size: 12px; color: #6b7280; }
.position {
  position: absolute;
  height: 18px;
  border-radius: 4px;
  opacity: 0.9;
  border: 1px solid rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.pos-label {
  font-size: 12px;
  color: #fff;
  text-shadow: 0 1px 1px rgba(0,0,0,0.25);
  padding: 0 6px;
  white-space: nowrap;
}
</style>