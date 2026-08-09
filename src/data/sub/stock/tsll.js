import { BUY, SELL } from '../../const.js';

// 当前股价（兜底价，配置 Finnhub token 后会被实时价覆盖）
const currentPrice = 0;

const data = [ {
  month: '202608',
  trans: [
    { day: 7, price: 7.72, number: 30, direction: BUY, fee: 0 },
  ]
} ];

export {
  data,
  currentPrice,
};
