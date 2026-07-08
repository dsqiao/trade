import { BUY } from '../../const.js';

// 当前股价（兜底价，配置 Finnhub token 后会被实时价覆盖）
const currentPrice = 0;

const data = [ {
  month: '202606',
  trans: [
    { day: 3, price: 59.2, number: 5, direction: BUY, fee: 0.40 },
  ]
} ];

export {
  data,
  currentPrice,
};
