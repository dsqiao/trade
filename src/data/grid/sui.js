import { RUNNING } from '../const.js';

// SUI 的所有网格单（同一币种放同一个文件，往数组里加即可）
// 提示：id 可选，不填由系统按顺序自动生成（如 sui-1）
export const coin = 'SUI';
export const grids = [
  { range: [ 1.5, 2.5 ], gridCount: 100, principal: 1000, startTime: '11/16/2025, 22:25:56', status: RUNNING, desc: '' },
  { range: [ 1, 2 ], gridCount: 100, principal: 1000, startTime: '11/21/2025, 22:02:05', status: RUNNING, desc: '' },
  { range: [ 1.1, 2.1 ], gridCount: 100, principal: 1000, startTime: '12/05/2025, 19:26:45', status: RUNNING, desc: '' },
  { range: [ 1.17, 2.17 ], gridCount: 100, principal: 1000, startTime: '01/05/2026, 14:42:39', status: RUNNING, desc: '' },
  { range: [ 1.125, 2.125 ], principal: 1400, startTime: '01/22/2026, 18:26:38', gridCount: 100, status: RUNNING, desc: '' },
  { range: [ 0.903, 1.903 ], principal: 1300, startTime: '02/03/2026, 21:58:28', gridCount: 100, status: RUNNING, desc: '', },
  { range: [ 0.7, 1.5 ], principal: 2400, startTime: '02/12/2026, 15:57:23', gridCount: 80, status: RUNNING, desc: '', }, 
];
