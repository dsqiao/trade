import { BUY, SELL } from '../const.js';
// eslint-disable-next-line no-unused-vars
import { direction } from '../sui.js';

const currentPrice = 12.00;
const data = [{
  month: '202412',
  trans: [
    { day: 11, price: 12.65, number: 200, direction: BUY, fee: 1.60 },
    { day: 11, price: 13, number: 200, direction: SELL, fee: 1.70 },
    // ======================== 清仓 ========================
    { day: 12, price: 12.50, number: 200, direction: BUY, fee: 1.60 },
    { day: 12, price: 12, number: 100, direction: BUY, fee: 0 },
  ]
}];
export {
  currentPrice,
  data,
};