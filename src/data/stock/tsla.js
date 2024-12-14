import { BUY, SELL } from "../const.js";
const currentPrice = 24;
const data = [{
  month: '202311',
  trans: [
    { day: 9, price: 214, number: 5, direction: BUY, fee: 1.02 }, // 3 HKD 返现
    { day: 16, price: 233.94, number: 5, direction: BUY, fee: 1.02 },
    { day: 28, price: 249.32, number: 10, direction: SELL, fee: 1.06, t: '清仓收益 253.50' },
    // ==================== 清仓 ==================== //
    { day: 29, price: 244, number: 10, direction: BUY, fee: 1.03 },
    { day: 30, price: 246.5, number: 10, direction: SELL, fee: 1.06, t: '清仓收益 25' },
    // ==================== 清仓 ==================== //
    { day: 30, price: 245, number: 10, direction: BUY, fee: 1.03 },
  ]
}, {
  month: '202312',
  transNum: 12,
  trans: [
    { day: 6, price: 246.32, number: 10, direction: SELL, fee: 1.06, t: '清仓收益 13.2' },
    // ==================== 清仓 ==================== //
    { day: 6, price: 243.9, number: 5, direction: BUY, fee: 1.02 }, // 3 HKD 返现
    { day: 11, price: 241.8, number: 5, direction: BUY, fee: 1.02 },
    { day: 11, price: 238, number: 2, direction: BUY, fee: 1.01 },
    { day: 12, price: 235, number: 10, direction: BUY, fee: 1.03 },
    { day: 13, price: 230.4, number: 10, direction: BUY, fee: 1.03 },
    { day: 14, price: 244.5, number: 32, direction: SELL, fee: 1.17, t: '清仓收益 265.5' },
    // ==================== 清仓 ==================== //
    { day: 18, price: 255, number: 5, direction: BUY, fee: 1.02 }, // 3 HKD 返现
    { day: 20, price: 248, number: 5, direction: BUY, fee: 1.02 },
    { day: 22, price: 252, number: 5, direction: BUY, fee: 1.02 },
    { day: 26, price: 257, number: 5, direction: SELL, fee: 1.04 },
    { day: 27, price: 262, number: 5, direction: SELL, fee: 1.04 },
  ]
}, {
  month: '202401',
  transNum: 3,
  trans: [
    { day: 9, price: 235, number: 9, direction: BUY, fee: 1.03 },
    { day: 12, price: 219.94, number: 9, direction: BUY, fee: 1.03 },
    { day: 26, price: 184.7, number: 10, direction: BUY, fee: 1.03 }, // 3 HKD 返现
  ]
}, {
  month: '202402',
  trans: [],
}, {
  month: '202403',
  trans: [],
}, {
  month: '202404',
  trans: [
    { day: 11, price: 169, number: 3, direction: BUY, fee: 1.01 },
    { day: 24, price: 160, number: 5, direction: BUY, fee: 1.02 },
    { day: 25, price: 170, number: 5, direction: SELL, fee: 1.04 },
  ]
}, {
  month: '202405',
  trans: []
}, {
  month: '202406',
  trans: []
}, {
  month: '202407',
  trans: [
    { day: 1, price: 212.6, number: 3, direction: SELL, fee: 0.4, }, // 5 HKD (0.64 usd)抵扣
    { day: 2, price: 206, number: 3, direction: BUY, fee: 0.37 }, // 5 HKD (0.64 usd) 抵扣
    { day: 2, price: 221, number: 5, direction: SELL, fee: 1.06, },
    { day: 2, price: 230, number: 5, direction: SELL, fee: 1.06 },
    { day: 3, price: 240, number: 5, direction: SELL, fee: 1.06 },
    { day: 8, price: 255, number: 5, direction: SELL, fee: 1.07 },
    { day: 9, price: 261.03, number: 5, direction: SELL, fee: 1.07 },
    { day: 10, price: 267, number: 5, direction: SELL, fee: 1.07 },
    { day: 10, price: 264.4, number: 5, direction: BUY, fee: 1.02 },
    { day: 11, price: 268, number: 5, direction: SELL, fee: 1.07 },
    { day: 11, price: 246, number: 5, direction: BUY, fee: 1.02 },
    { day: 12, price: 251, number: 5, direction: SELL, fee: 1.02 },
    { day: 12, price: 250, number: 5, direction: BUY, fee: 1.06 },
    { day: 15, price: 263, number: 5, direction: SELL, fee: 1.07 },
    { day: 15, price: 262, number: 5, direction: BUY, fee: 1.02 },
    { day: 19, price: 238, number: 5, direction: BUY, fee: 1.02 },
    { day: 22, price: 252, number: 5, direction: SELL, fee: 1.07 },
    { day: 23, price: 228, number: 6, direction: BUY, fee: 1.02 },
    { day: 24, price: 218, number: 6, direction: BUY, fee: 1.02 },
    { day: 29, price: 229, number: 5, direction: SELL, fee: 1.06 }
  ],
}, {
  month: '202410',
  trans: [
    { day: 11, price: 218, number: 5, direction: BUY, fee: 1.02 },
    { day: 23, price: 241.02, number: 5, direction: SELL, fee: 1.06, desc: '委托价241,成交价241.02,之前这里填错了产生了0.1的误差' },
    { day: 24, price: 254, number: 5, direction: SELL, fee: 1.07 },
    { day: 24, price: 258, number: 5, direction: SELL, fee: 1.07 },
    { day: 24, price: 262, number: 7, direction: SELL, fee: 1.08 },
  ],
}, {
  month: '202411',
  trans: [
    { day: 1, price: 249, number: 5, direction: BUY, fee: 1.02 },
    { day: 5, price: 270, number: 5, direction: SELL, fee: 1.07 },
    { day: 6, price: 286, number: 1, direction: SELL, fee: 1.02 },
    // 以上数据经校验与 LongBridge 无差
  ]
}];

export {
  currentPrice,
  data,
};