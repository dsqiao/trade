import { BUY, SELL } from '../const.js';

const currentPrice = 11.299;
const data = [ {
  month: '202412',
  trans: [
    { day: 11, price: 12.65, number: 200, direction: BUY, fee: 1.60, t: 't0' },
    { day: 11, price: 13, number: 200, direction: SELL, fee: 1.70, t: 't0 收益 70' },
    // ======================== 清仓 ========================
    { day: 12, price: 12.50, number: 200, direction: BUY, fee: 1.60 },
    { day: 13, price: 12, number: 100, direction: BUY, fee: 1.30, t: 't1' },
    { day: 16, price: 13, number: 100, direction: SELL, fee: 1.36, t: 't1 收益 100' },
    { day: 16, price: 12.48, number: 100, direction: BUY, fee: 1.30 },
    { day: 17, price: 12.3, number: 100, direction: BUY, fee: 1.30, t: 't2' },
    { day: 18, price: 13, number: 100, direction: SELL, fee: 1.36, t: 't2 收益 70' },
    { day: 18, price: 12.48, number: 100, direction: BUY, fee: 1.30 },
    { day: 18, price: 12.2, number: 100, direction: BUY, fee: 1.30 },
    { day: 18, price: 12.1, number: 100, direction: BUY, fee: 1.30 },
    { day: 18, price: 12, number: 100, direction: BUY, fee: 1.30 },
    { day: 18, price: 11.7, number: 100, direction: BUY, fee: 1.30, t: 't11' },
    { day: 18, price: 11.3, number: 100, direction: BUY, fee: 1.30, t: 't10' },
    { day: 19, price: 11, number: 100, direction: BUY, fee: 1.30, t: 't5' },
    // 以上数据经校验与长桥无差
    { day: 23, price: 10.33, number: 100, direction: BUY, fee: 0.66, t: 't3', desc: '5 HKD 抵扣' }
    // 以上数据经校验与长桥无差
  ]
}, {
  month: '202501',
  monthlyProfit: 267,
  trans: [
    { day: 17, price: 12, number: 100, direction: SELL, t: 't3 收益 167', fee: 1.35, },
    { day: 27, price: 10, number: 100, direction: BUY, fee: 1.30, t: 't4' },
    { day: 30, price: 11, number: 100, direction: SELL, fee: 1.35, t: 't4 收益 100' },
  ]
}, {
  month: '202502',
  monthlyProfit: 100,
  trans: [
    { day: 7, price: 12, number: 100, direction: SELL, fee: 1.35, t: 't5 收益 100' },
    { day: 10, price: 11, number: 100, direction: BUY, fee: 1.30, t: 't8' },
    { day: 21, price: 9.34, number: 100, direction: BUY, fee: 1.30, t: 't9' },
    { day: 24, price: 8.48, number: 100, direction: BUY, fee: 1.30, t: 't7' },
  ]
}, {
  month: '202503',
  monthlyProfit: 0,
  trans: [
    { day: 5, price: 7.99, number: 100, direction: BUY, fee: 0.66, t: 't6' },
  ]
}, {
  month: '202504',
  monthlyProfit: 186,
  trans: [
    { day: 12, price: 9.85, number: 100, direction: SELL, fee: 1.35, t: 't6 收益 186' },
  ]
}, {
  month: '202506',
  monthlyProfit: 263,
  trans: [
    { day: 30, price: 11.11, number: 100, direction: SELL, fee: 0.69, t: 't7 收益 263' },
  ]
}, {
  month: '202507',
  monthlyProfit: 770,
  trans: [
    { day: 2, price: 12, number: 100, direction: SELL, fee: 0.69, t: 't8 收益 100' },
    { day: 3, price: 12.54, number: 100, direction: SELL, fee: 1.32, t: 't9 收益 320' },
    { day: 10, price: 13, number: 100, direction: SELL, fee: 1.32, t: 't10 收益 170' },
    { day: 11, price: 13.5, number: 100, direction: SELL, fee: 1.32, t: 't11 收益 180', }
  ]
} ];
export {
  currentPrice,
  data,
};