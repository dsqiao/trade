import { BUY, OTHER, SELL } from "../const.js";

const currentPrice = 631;
const data = [ {
  month: '202510',
  trans: [
    { day: 29, price: 701, number: 3, direction: BUY, fee: 0.38, t: 1 },
    { day: 30, price: 695, number: 3, direction: BUY, fee: 1.02, t: 1 },
    { day: 30, price: 673, number: 3, direction: BUY, fee: 1.02, t: 1 },
    { day: 30, price: 660, number: 3, direction: BUY, fee: 1.02, t: 1 },
    { day: 31, price: 650, number: 3, direction: BUY, fee: 1.02, t: 1 },
  ]
}, {
  month: '202511',
  trans: [
    { day: 3, price: 638, number: 3, direction: BUY, fee: 1.02, t: 1 },
    { day: 4, price: 630, number: 3, direction: BUY, fee: 1.02, t: 1 },
    { day: 6, price: 618, number: 3, direction: BUY, fee: 1.02, t: 1 },
    { day: 7, price: 610, number: 3, direction: BUY, fee: 1.02, t: 1 },
  ]
}, {
  month: '202512',
  trans: [
    { day: 24, price: 0, number: 0, direction: OTHER, fee: -14.18, desc: '现金分红 27 股 * 0.525 USD/股' },
    { day: 25, price: 0, number: 0, direction: OTHER, fee: 1.42, desc: 'Tax/Dividend Fee' },
  ]
}, {
  month: '202601',
  trans: [
    { day: 29, price: 725.5, number: 27, direction: SELL, fee: 0.45, t: 1 },
  ]
}, {
  month: '202606',
  trans: [
    { day: 2, price: 607.15, number: 4, direction: BUY, fee: 1.02, t: 2 },
    { day: 2, price: 608.115, number: 4, direction: SELL, fee: 1.08, t: 2 },
    { day: 2, price: 606.77, number: 4, direction: BUY, fee: 1.02, t: 3 },
    { day: 3, price: 609.105, number: 4, direction: SELL, fee: 0, t: 3 },
  ]
} ];

export { data, currentPrice };