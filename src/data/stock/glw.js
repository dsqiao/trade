import { BUY, SELL } from "../const.js";

const currentPrice = 631;
const data = [ {
  month: '202606',
  trans: [
    { day: 2, price: 198.7, number: 11, direction: BUY, fee: 0, t: 1 },
    { day: 2, price: 199.75, number: 11, direction: SELL, fee: 0, t: 1 },
  ]
}, ];

export { data, currentPrice };