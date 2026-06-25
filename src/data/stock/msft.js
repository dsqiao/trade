import { BUY, OTHER, SELL } from "../const.js";

const currentPrice = 0;
const data = [ {
  month: '202311',
  trans: [
    { day: 20, price: 379.24, number: 3, direction: BUY, fee: 1.01, t: 1 },
    { day: 20, price: 369, number: 3, direction: BUY, fee: 1.01, t: 1 },
    { day: 20, price: 378.16, number: 6, direction: SELL, fee: 1.05, t: 1 },
    { day: 21, price: 375, number: 6, direction: BUY, fee: 1.02, t: 2 },
    { day: 21, price: 377.94, number: 6, direction: SELL, fee: 1.05, t: 2 },
  ]
}, {
  month: '202601',
  trans: [
    { day: 29, price: 445, number: 44, direction: BUY, fee: 1.13, },
  ]
}, {
  month: '202603',
  trans: [
    { day: 13, price: 0, number: 0, direction: OTHER, fee: -40.04, desc: '现金分红 44 股 * 0.91 USD/股' },
    { day: 13, price: 0, number: 0, direction: OTHER, fee: 4.00, desc: '企业行动费用' },
  ]
}, {
  month: '202606',
  trans: [
    { day: 3, price: 436, number: 5, direction: BUY, fee: 1.03 },
    { day: 8, price: 412, number: 1, direction: BUY, fee: 0.01 },
    { day: 9, price: 402, number: 2, direction: BUY, fee: 0.02 },
    { day: 10, price: 397, number: 2, direction: BUY, fee: 0.02 },
    { day: 12, price: 0, number: 0, direction: OTHER, fee: -40.04, desc: '现金分红 44 股 * 0.91 USD/股' },
    { day: 12, price: 0, number: 0, direction: OTHER, fee: 4.00, desc: '企业行动费用' },
    { day: 17, price: 378, number: 3, direction: BUY, fee: 0.02 },
    { day: 22, price: 372, number: 5, direction: BUY, fee: 1.03 },
    { day: 22, price: 368, number: 5, direction: BUY, fee: 1.03 },
    { day: 25, price: 351.7, number: 10, direction: BUY, fee: 0, t: 3 },
    { day: 25, price: 357, number: 10, direction: SELL, fee: 0, t: 3 },
  ]
} ];

export {
  data,
  currentPrice,
};