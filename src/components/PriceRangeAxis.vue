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
           :style="{
             left: toPercent(priceToRatio(pos.from)),
             width: toPercent(priceToRatio(pos.to) - priceToRatio(pos.from)),
             top: `${baseTop + laneHeight * pos.lane}px`,
             backgroundColor: pos.color || '#17a2b8'
           }"
           @mouseenter="showTip(pos, $event)"
           @mousemove="moveTip($event)"
           @mouseleave="hideTip"
      >
        <span class="pos-label">{{ pos.label || `${pos.from}-${pos.to}` }}</span>
      </div>

      <!-- vertical markers (e.g. current price) spanning the whole axis -->
      <div v-for="(m, mi) in normalizedMarkers"
           :key="'marker-' + mi"
           class="marker"
           :title="m.title || (m.label ? `${m.label}: ${m.value}` : String(m.value))"
           :style="{
             left: toPercent(priceToRatio(m.value)),
             backgroundColor: m.color || '#ef4444'
           }"
      >
        <span v-if="m.label"
              class="marker-label"
              :style="{ color: m.color || '#ef4444' }"
        >{{ m.label }}</span>
      </div>
    </div>

    <!-- 悬浮浮窗：鼠标移到某个单子上时展示其完整属性 -->
    <div v-if="tip.visible"
         class="pos-tooltip"
         :style="{ left: `${tip.x}px`, top: `${tip.y}px` }"
    >
      <div class="tip-title">
        <span class="tip-chip"
              :style="{ background: tip.color }"
        />
        {{ tip.id }}
      </div>
      <div v-for="(row, ri) in tip.detail"
           :key="ri"
           class="tip-row"
      >
        <span class="tip-label">{{ row.label }}</span>
        <span class="tip-value">{{ row.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';

const props = defineProps({
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  positions: { type: Array, default: () => [] },
  markers: { type: Array, default: () => [] }, // [{ value, label?, color?, title? }] 贯穿竖线，如当前价
  tickStep: { type: Number, default: 0.5 },
  decimals: { type: Number, default: 2 },
  scale: { type: String, default: 'linear', validator: v => [ 'linear', 'log' ].includes(v) },
  logTickDensity: { type: String, default: 'normal', validator: v => [ 'sparse', 'normal', 'dense' ].includes(v) },
});

// 悬浮浮窗状态：鼠标移入某个区间条时显示其完整属性，移出时隐藏。
// 坐标相对 .axis-wrapper（position: relative）计算，跟随鼠标。
const tip = reactive({ visible: false, x: 0, y: 0, id: '', color: '', detail: [] });

function tipXY(e) {
  const wrap = e.currentTarget.closest('.axis-wrapper');
  const rect = wrap ? wrap.getBoundingClientRect() : { left: 0, top: 0 };
  return { x: e.clientX - rect.left + 12, y: e.clientY - rect.top + 12 };
}

function showTip(pos, e) {
  const { x, y } = tipXY(e);
  tip.visible = true;
  tip.x = x;
  tip.y = y;
  tip.id = pos.id;
  tip.color = pos.color || '#17a2b8';
  tip.detail = pos.detail || [];
}

function moveTip(e) {
  if (!tip.visible) return;
  const { x, y } = tipXY(e);
  tip.x = x;
  tip.y = y;
}

function hideTip() {
  tip.visible = false;
}

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

// markers within axis range only
const normalizedMarkers = computed(() => {
  return props.markers.filter(m =>
    m && m.value != null && m.value >= props.minPrice && m.value <= props.maxPrice
  );
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
.axis-wrapper { width: 100%; position: relative; }
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
  cursor: pointer;
  transition: opacity 0.12s, box-shadow 0.12s;
}
.position:hover {
  opacity: 1;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
}
.pos-label {
  font-size: 12px;
  color: #fff;
  text-shadow: 0 1px 1px rgba(0,0,0,0.25);
  padding: 0 6px;
  white-space: nowrap;
}
.marker {
  position: absolute;
  top: 16px;
  bottom: 4px;
  width: 2px;
  transform: translateX(-50%);
  z-index: 5;
  box-shadow: 0 0 6px currentColor;
}
.marker-label {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(255,255,255,0.6);
}
/* 悬浮浮窗 */
.pos-tooltip {
  position: absolute;
  z-index: 20;
  min-width: 160px;
  max-width: 240px;
  padding: 8px 10px;
  background: rgba(31, 41, 55, 0.96);
  color: #f9fafb;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  font-size: 12px;
  line-height: 1.6;
  pointer-events: none;
}
.tip-title {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}
.tip-chip {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  margin-right: 6px;
}
.tip-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.tip-label { color: #9ca3af; }
.tip-value { color: #f9fafb; font-variant-numeric: tabular-nums; }

</style>