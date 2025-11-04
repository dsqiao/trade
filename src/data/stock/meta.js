import { BUY } from "../const.js";

const currentPrice = 631;
const data = [ {
  month: '202510',
  trans: [
    { day: 29, price: 701, number: 3, direction: BUY, fee: 0.38 },
    { day: 30, price: 695, number: 3, direction: BUY, fee: 1.02 },
    { day: 30, price: 673, number: 3, direction: BUY, fee: 1.02 },
    { day: 30, price: 660, number: 3, direction: BUY, fee: 1.02 },
    { day: 31, price: 650, number: 3, direction: BUY, fee: 1.02 },
  ]
}, {
  month: '202511',
  trans: [
    { day: 3, price: 638, number: 3, direction: BUY, fee: 0 },
    { day: 4, price: 630, number: 3, direction: BUY, fee: 0 },
  ]
} ];

export { data, currentPrice };