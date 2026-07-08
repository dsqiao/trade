import { BUY } from '../../const.js';

// 当前股价（兜底价，配置 Finnhub token 后会被实时价覆盖）
const currentPrice = 0;

const data = [ {
  month: '202606',
  trans: [
    { day: 26, price: 24.217, number: 10, direction: BUY, fee: 1.04 },
  ]
} ];

export {
  data,
  currentPrice,
};
