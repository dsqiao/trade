import { BUY, OTHER, SELL } from "../const.js";

const currentPrice = 200;
const data = [ {
  month: '202311',
  trans: [
    { day: 20, price: 498.5350, number: 3, direction: BUY, fee: 1.01 },
    { day: 22, price: 489.9, number: 3, direction: BUY, fee: 1.01 },
    { day: 22, price: 482.7, number: 5, direction: BUY, fee: 1.02 },
    { day: 28, price: 477.01, number: 3, direction: BUY, fee: 1.01 },
    { day: 30, price: 473.74, number: 3, direction: BUY, fee: 1.01 },
  ]
}, {
  month: '202312',
  trans: [
    { day: 6, price: 466, number: 3, direction: BUY, fee: 1.01 },
    { day: 6, price: 458, number: 5, direction: BUY, fee: 1.02 },
    { day: 18, price: 499, number: 5, direction: SELL, fee: 1.05 },
    { day: 18, price: 501.1, number: 5, direction: SELL, fee: 1.05 },
  ]
}, {
  month: '202401',
  trans: [
    { day: 8, price: 510, number: 5, direction: SELL, fee: 1.05 },
    { day: 8, price: 520, number: 5, direction: SELL, fee: 1.05 },
    { day: 9, price: 533.35, number: 4, direction: SELL, fee: 1.04 },
    { day: 9, price: 542.5, number: 1, direction: SELL, fee: 1.02 },
    // { day: 8, price: 0, number: 0, direction: OTHER, fee: -14.18, desc: '现金分红 27 股 * 0.525 USD/股' },
    // { day: 25, price: 0, number: 0, direction: OTHER, fee: 1.42, desc: 'Tax/Dividend Fee' },
  ]
}, {
  month: '202508',
  trans: [
    { day: 27, price: 175, number: 10, direction: BUY, fee: 1.04 },
  ]
}, {
  month: '202509',
  trans: [
    { day: 2, price: 168, number: 10, direction: BUY, fee: 0.40 },
    { day: 17, price: 170, number: 5, direction: BUY, fee: 0.39 },
  ]
}, {
  month: '202510',
  trans: [
    { day: 10, price: 190, number: 5, direction: BUY, fee: 1.03 },
    { day: 10, price: 186, number: 5, direction: BUY, fee: 1.03 },
    { day: 10, price: 181, number: 5, direction: BUY, fee: 1.03 },
    { day: 14, price: 180, number: 5, direction: BUY, fee: 1.03 },
    { day: 22, price: 178, number: 5, direction: BUY, fee: 1.03 },
  ]
}, {
  month: '202511',
  trans: [
    { day: 6, price: 186.83, number: 5, direction: BUY, fee: 1.03 },
    { day: 7, price: 183, number: 5, direction: BUY, fee: 1.03 },
  ]
} ];

export { data, currentPrice };