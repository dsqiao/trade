import { BUY, SELL } from '../../const.js';

// 当前股价（兜底价，配置 Finnhub token 后会被实时价覆盖）
const currentPrice = 0;

const data = [ {
  month: '202604',
  trans: [
    { day: 28, price: 213.84, number: 2, direction: BUY, fee: 1.01, t: 1 },
  ]
}, {
  month: '202607',
  trans: [
    { day: 7, price: 260, number: 2, direction: SELL, fee: 1.04, t: 1 },
    { day: 30, price: 243.69, number: 3, direction: BUY, fee: 0.39, t: 2 },
  ]
}, {
  month: '202608',
  trans: [
    { day: 5, price: 233.8, number: 4, direction: BUY, fee: 1.02, t: 2 },
    { day: 6, price: 241.5, number: 7, direction: SELL, fee: 1.07, t: 2 },
    { day: 12, price: 248.5, number: 3, direction: BUY, fee: 0 },
  ]
} ];

export {
  data,
  currentPrice,
};
