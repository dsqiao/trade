import { BUY } from '../../const.js';

// 当前股价（兜底价，配置 Finnhub token 后会被实时价覆盖）
const currentPrice = 0;

const data = [ {
  month: '202610',
  trans: [
    { day: 20, amount: 194.95, price: 97.475, number: 2, direction: BUY, fee: 1.02 },
  ]
} ];

export {
  data,
  currentPrice,
};
