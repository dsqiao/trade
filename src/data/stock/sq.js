import { BUY, SELL } from "../const.js";

const currentPrice = 0;
const data = [ {
  month: '202412',
  trans: [
    { day: 4, price: 96, number: 21, direction: BUY, fee: 1.06, t: 't1' },
    { day: 4, price: 96.7, number: 21, direction: SELL, fee: 1.13, t: 't1 收益 14.7' },
    { day: 9, price: 95, number: 22, direction: BUY, fee: 1.07, t: 't2' },
    { day: 11, price: 97.5, number: 22, direction: SELL, fee: 1.14, t: 't2 收益 55' },
    // 以上数据经校验与 LongBridge 无差
  ]
} ];

export {
  data,
  currentPrice,
};