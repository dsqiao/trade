import { BUY, OTHER, SELL } from "../const.js";
// eslint-disable-next-line no-unused-vars
import { direction } from "../sui.js";
const currentPrice = 0;
const data = [{
  month: '202312',
  trans: [
    { day: 19, price: 8.77, number: 300, direction: BUY, fee: 2.40 },
  ]
}, {
  month: '202401',
  trans: [
    { day: 5, price: 8.07, number: 300, direction: BUY, fee: 2.40 },
    { day: 9, price: 7.6, number: 150, direction: BUY, fee: 1.45 },
    { day: 10, price: 7.39, number: 150, direction: BUY, fee: 1.45 },
  ]
}, {
  month: '202402',
  trans: [
    { day: 16, price: 0, number: 0, direction: OTHER, fee: 1.32, desc: '2024-01-30持有900股NIO, ADR 托管费1.32USD' },
    { day: 25, price: 5.46, number: 72, direction: BUY, fee: 1.22 },
  ]
}, {
  month: '202404',
  trans: [
    { day: 9, price: 4.715, number: 172, direction: SELL, fee: 1.56 },
    { day: 9, price: 4.65, number: 200, direction: BUY, fee: 1.60 },
  ]
}, {
  month: '202407',
  trans: [
    { day: 8, price: 4.5, number: 222, direction: BUY, fee: 1.78 },
  ]
}, {
  month: '202408',
  trans: [
    { day: 20, price: 3.84, number: 260, direction: BUY, fee: 2.08 },
    { day: 30, price: 4.16, number: 240, direction: SELL, fee: 1.99 },
  ]
}, {
  month: '202409',
  trans: [
    { day: 5, price: 4.83, number: 207, direction: SELL, fee: 1.72 },
  ]
}];

export {
  data,
  currentPrice,
};