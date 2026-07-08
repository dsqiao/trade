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
    { day: 7, price: 260, number: 2, direction: SELL, fee: 0, t: 1 },
  ]
} ];

export {
  data,
  currentPrice,
};
