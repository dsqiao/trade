import { BUY, SELL } from '../const.js';
// eslint-disable-next-line no-unused-vars
import { direction } from '../sui.js';

const currentPrice = 12.00;
const data = [{
  month: '202412',
  trans: [
    // { day: 11, price: 12.65, number: 200, direction: BUY, fee: 1.60, t: 't0' },
    // { day: 11, price: 13, number: 200, direction: SELL, fee: 1.70, t: 't0 收益 70' },
    // ======================== 清仓 ========================
    { day: 12, price: 12.50, number: 200, direction: BUY, fee: 1.60 },
    { day: 13, price: 12, number: 100, direction: BUY, fee: 1.30, t: 't1' },
    { day: 16, price: 13, number: 100, direction: SELL, fee: 1.36, t: 't1 收益 100' },
    { day: 16, price: 12.48, number: 100, direction: BUY, fee: 1.30 },
    { day: 17, price: 12.3, number: 100, direction: BUY, fee: 1.30, t: 't2' },
    { day: 18, price: 13, number: 100, direction: SELL, fee: 1.36, t: 't2 收益 70' },
    { day: 18, price: 12.48, number: 100, direction: BUY, fee: 1.30 },
    { day: 18, price: 12.2, number: 100, direction: BUY, fee: 1.30 },
    { day: 18, price: 12.1, number: 100, direction: BUY, fee: 1.30 },
    { day: 18, price: 12, number: 100, direction: BUY, fee: 1.30 },
    { day: 18, price: 11.7, number: 100, direction: BUY, fee: 1.30 },
    { day: 18, price: 11.3, number: 100, direction: BUY, fee: 1.30 },
    { day: 19, price: 11, number: 100, direction: BUY, fee: 0 },
  ]
}];
export {
  currentPrice,
  data,
};