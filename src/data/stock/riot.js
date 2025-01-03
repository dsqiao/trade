import { BUY, SELL } from "../const.js";
// eslint-disable-next-line no-unused-vars
import { direction } from "../sui.js";
const currentPrice = 11.67;
const data = [{
  month: '202312',
  trans: [
    { day: 28, price: 19.43, number: 150, direction: BUY, fee: 1.45 },
    { day: 28, price: 18.2, number: 150, direction: BUY, fee: 1.45 },
  ]
}, {
  month: '202407',
  trans: [
    { day: 5, price: 8.95, number: 120, direction: BUY, fee: 1.36 },
    { day: 15, price: 11.5, number: 120, direction: SELL, fee: 1.42, t: '1' },
    { day: 16, price: 11.3, number: 120, direction: BUY, fee: 1.36, t: '1 收益 0.2 * 120 = 24' },
  ]
}, {
  month: '202409',
  trans: [
    { day: 3, price: 6.8595, number: 145, direction: BUY, fee: 1.44, t: '2' },
    { day: 10, price: 7.175, number: 145, direction: SELL, fee: 1.49, t: '2 收益 0.3155 * 145 = 45.7475' },
    { day: 11, price: 6.8, number: 147, direction: BUY, fee: 1.44 },
  ]
}, {
  month: '202411',
  trans: [
    { day: 11, price: 14.6, number: 100, direction: SELL, fee: 1.36 },
    { day: 11, price: 15, number: 67, direction: SELL, fee: 1.24 },
    { day: 11, price: 15.5, number: 100, direction: SELL, fee: 1.36 },
    // 以上数据经校验与 LongBridge 无差
  ]
}, {
  month: '202412',
  trans: [
    { day: 9, price: 11.9, number: 100, direction: BUY, fee: 1.30, t: '3' },
    { day: 9, price: 11.1, number: 100, direction: BUY, fee: 1.30, t: '4' },
    { day: 11, price: 12, number: 100, direction: SELL, fee: 1.35, t: '4 收益 90' },
    { day: 12, price: 13.05, number: 100, direction: SELL, fee: 1.36, t: '3 收益 115' },
    { day: 12, price: 12, number: 100, direction: BUY, fee: 1.30, t: '5' },
    { day: 12, price: 13, number: 100, direction: SELL, fee: 1.36, t: '5 收益 100' },
    // 以上数据经校验与 LongBridge 无差
    { day: 16, price: 14, number: 100, direction: SELL, fee: 1.36 },
    { day: 18, price: 13.1, number: 100, direction: BUY, fee: 1.30 },
    { day: 18, price: 12, number: 100, direction: BUY, fee: 1.30 },
    { day: 19, price: 11, number: 100, direction: BUY, fee: 1.30 },
    // 以上数据经校验与 LongBridge 无差
  ]
}, {
  month: '202501',
  trans: [
    { day: 3, price: 12, number: 100, direction: SELL, fee: 0 },
  ]
}];
export {
  currentPrice,
  data,
};