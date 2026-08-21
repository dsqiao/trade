import { RUNNING } from '../const.js';

// ETH 的所有网格单（同一币种放同一个文件，往数组里加即可）
// 提示：id 可选，不填由系统按顺序自动生成（如 eth-1）；color 可选，不填自动分配
export const coin = 'ETH';
export const grids = [
  { range: [ 2600, 3600 ], principal: 1000, startTime: '12/05/2025, 21:19:58', gridCount: 90, status: RUNNING, desc: '' },
  { range: [ 2850, 3450 ], principal: 590, startTime: '12/12/2025, 23:31:52', gridCount: 50, status: RUNNING, desc: '' },
  { range: [ 2636, 3436 ], principal: 975, startTime: '12/22/2025, 17:26:34', gridCount: 80, status: RUNNING, desc: '' },
  { range: [ 2654, 3654 ], principal: 1000, startTime: '01/05/2026, 14:47:04', gridCount: 80, status: RUNNING, desc: '' },
  { range: [ 3000, 3900 ], principal: 1000, startTime: '01/17/2026, 03:04:05', gridCount: 50, status: RUNNING, desc: '' },
  { range: [ 2100, 3100 ], principal: 1200, startTime: '02/03/2026, 18:00:05', gridCount: 80, status: RUNNING, desc: '' },
  { range: [ 2000, 3000 ], principal: 1000, startTime: '02/05/2026, 12:22:08', gridCount: 80, status: RUNNING, desc: '' },
  { range: [ 1856, 2856 ], principal: 1400, startTime: '02/05/2026, 19:47:29', gridCount: 80, status: RUNNING, desc: '' },
  { range: [ 1793, 2793 ], principal: 1240, startTime: '02/06/2026, 01:00:45', gridCount: 80, status: RUNNING, desc: '' },
  { range: [ 1700, 3200 ], principal: 2800, startTime: '02/12/2026, 14:29:03', gridCount: 120, status: RUNNING, desc: '' },
  { range: [ 1683.7, 2683.7 ], principal: 3000, startTime: '02/12/2026, 23:51:42', gridCount: 80, status: RUNNING, desc: '' },
  { range: [ 1596.8, 2596.8 ], principal: 3750, startTime: '02/13/2026, 00:28:53', gridCount: 80, status: RUNNING, desc: '' },
  { range: [ 1706.25, 3206.25 ], principal: 3000, startTime: '04/03/2026, 17:26:25', gridCount: 120, status: RUNNING, desc: '' },
  { range: [ 1950, 2950 ], principal: 1100, startTime: '04/18/2026, 00:55:01', gridCount: 80, status: RUNNING, desc: '' },
  { range: [ 1815, 2815 ], principal: 1000, startTime: '04/21/2026, 13:08:12', gridCount: 80, status: RUNNING, desc: '' },
  { range: [ 1755, 2755 ], principal: 2400, startTime: '04/30/2026, 21:03:00', gridCount: 80, status: RUNNING, desc: '' },
];