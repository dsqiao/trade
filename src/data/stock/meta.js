import { BUY } from "../const.js";

const currentPrice = 668;
const data = [ {
  month: '202510',
  trans: [
    { day: 29, price: 701, number: 3, direction: BUY, fee: 0 },
    { day: 30, price: 695, number: 3, direction: BUY, fee: 0 },
    { day: 30, price: 673, number: 3, direction: BUY, fee: 0 },
    { day: 30, price: 660, number: 3, direction: BUY, fee: 0 },
  ]
}, {
  month: '202511',
  trans: []
} ];

export { data, currentPrice };