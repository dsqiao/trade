import { BUY, SELL } from "../const.js";
// eslint-disable-next-line no-unused-vars
import { direction } from "../sui.js";
const currentPrice = 360;
const data = [{
  month: '202412',
  trans: [
    { day: 20, price: 350, number: 4, direction: BUY, fee: 1.01 },
    { day: 23, price: 330, number: 1, direction: BUY, fee: 0.36, desc: '5 HKD 抵扣' },
  ]
}, {
  month: '202501',
  trans: [
    { day: 15, price: 360, number: 5, direction: SELL, fee: 0 },
  ]
}];

export { data, currentPrice };