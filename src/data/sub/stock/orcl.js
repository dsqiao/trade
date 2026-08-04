import { BUY } from '../../const.js';

// 当前股价（兜底价，配置 Finnhub token 后会被实时价覆盖）
const currentPrice = 0;

const data = [ {
  month: '202608',
  trans: [
    { day: 3, price: 136.55, number: 3, direction: BUY, fee: 1.02 },
  ]
} ];

export {
  data,
  currentPrice,
};
