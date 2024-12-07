import { BUY, SELL } from "./const.js";
const currentPrice = 24;
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
}]
export {
  currentPrice,
  data,
}