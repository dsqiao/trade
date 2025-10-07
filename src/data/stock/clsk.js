import { BUY, SELL } from '../const.js';

const currentPrice = 11.299;
const data = [ {
  month: '202412',
  trans: [
    { day: 11, price: 12.65, number: 200, direction: BUY, fee: 1.60, t: 1 },
    { day: 11, price: 13, number: 200, direction: SELL, fee: 1.70, t: 1 },
    // ======================== 清仓 ========================
    { day: 12, price: 12.50, number: 200, direction: BUY, fee: 1.60 },
    { day: 13, price: 12, number: 100, direction: BUY, fee: 1.30, t: 2 },
    { day: 16, price: 13, number: 100, direction: SELL, fee: 1.36, t: 2 },
    { day: 16, price: 12.48, number: 100, direction: BUY, fee: 1.30 },
    { day: 17, price: 12.3, number: 100, direction: BUY, fee: 1.30, t: 3 },
    { day: 18, price: 13, number: 100, direction: SELL, fee: 1.36, t: 3 },
    { day: 18, price: 12.48, number: 100, direction: BUY, fee: 1.30 },
    { day: 18, price: 12.2, number: 100, direction: BUY, fee: 1.30 },
    { day: 18, price: 12.1, number: 100, direction: BUY, fee: 1.30, t: 16 },
    { day: 18, price: 12, number: 100, direction: BUY, fee: 1.30, t: 15 },
    { day: 18, price: 11.7, number: 100, direction: BUY, fee: 1.30, t: 12 },
    { day: 18, price: 11.3, number: 100, direction: BUY, fee: 1.30, t: 11 },
    { day: 19, price: 11, number: 100, direction: BUY, fee: 1.30, t: 6 },
    // 以上数据经校验与长桥无差
    { day: 23, price: 10.33, number: 100, direction: BUY, fee: 0.66, t: 4, desc: '5 HKD 抵扣' }
    // 以上数据经校验与长桥无差
  ]
}, {
  month: '202501',
  monthlyProfit: 267,
  trans: [
    { day: 17, price: 12, number: 100, direction: SELL, t: 4, fee: 1.35, },
    { day: 27, price: 10, number: 100, direction: BUY, fee: 1.30, t: 5 },
    { day: 30, price: 11, number: 100, direction: SELL, fee: 1.35, t: 5 },
  ]
}, {
  month: '202502',
  monthlyProfit: 100,
  trans: [
    { day: 7, price: 12, number: 100, direction: SELL, fee: 1.35, t: 6 },
    { day: 10, price: 11, number: 100, direction: BUY, fee: 1.30, t: 9 },
    { day: 21, price: 9.34, number: 100, direction: BUY, fee: 1.30, t: 10 },
    { day: 24, price: 8.48, number: 100, direction: BUY, fee: 1.30, t: 8 },
  ]
}, {
  month: '202503',
  monthlyProfit: 0,
  trans: [
    { day: 5, price: 7.99, number: 100, direction: BUY, fee: 0.66, t: 7 },
  ]
}, {
  month: '202504',
  monthlyProfit: 186,
  trans: [
    { day: 12, price: 9.85, number: 100, direction: SELL, fee: 1.35, t: 7 },
  ]
}, {
  month: '202506',
  monthlyProfit: 263,
  trans: [
    { day: 30, price: 11.11, number: 100, direction: SELL, fee: 0.69, t: 8 },
  ]
}, {
  month: '202507',
  monthlyProfit: 770,
  trans: [
    { day: 2, price: 12, number: 100, direction: SELL, fee: 0.69, t: 9 },
    { day: 3, price: 12.54, number: 100, direction: SELL, fee: 1.32, t: 10 },
    { day: 10, price: 13, number: 100, direction: SELL, fee: 1.32, t: 11 },
    { day: 11, price: 13.5, number: 100, direction: SELL, fee: 1.32, t: 12, }
  ]
}, {
  month: '202508',
  trans: [
    { day: 8, price: 10, number: 100, direction: BUY, fee: 1.31, t: 14 },
    { day: 20, price: 9, number: 100, direction: BUY, fee: 1.31, t: 13 },
  ]
}, {
  month: '202509',
  trans: [
    { day: 10, price: 10, number: 100, direction: SELL, fee: 1.33, t: 13 },
    { day: 16, price: 11, number: 100, direction: SELL, fee: 1.33, t: 14 },
    { day: 18, price: 12.5, number: 100, direction: SELL, fee: 1.33, t: 15 },
    { day: 18, price: 13.5, number: 100, direction: SELL, fee: 1.33, t: 16 },
    { day: 19, price: 14, number: 100, direction: SELL, fee: 1.33, },
    { day: 22, price: 14.5, number: 100, direction: SELL, fee: 1.33 },
    { day: 23, price: 15, number: 100, direction: SELL, fee: 1.33 },
    { day: 25, price: 13.5, number: 100, direction: BUY, fee: 1.31, t: 18 },
    { day: 26, price: 12.5, number: 100, direction: BUY, fee: 1.31, t: 17 },
    { day: 26, price: 13.5, number: 100, direction: SELL, fee: 1.33, t: 17 },
    { day: 29, price: 14.5, number: 100, direction: SELL, fee: 1.33, t: 18 },
  ]
}, {
  month: '202510',
  trans: [
    { day: 3, price: 16, number: 100, direction: SELL, fee: 0.69 },
    { day: 6, price: 17, number: 100, direction: SELL, fee: 1.33 },
  ]
} ];
export {
  currentPrice,
  data,
};