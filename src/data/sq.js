import { BUY, SELL } from "./const.js";
const currentPrice = 0
const data = [{
  month: '202412',
  trans: [
    { day: 4, price: 96, number: 21, direction: BUY, fee: 1.06 },
    { day: 4, price: 96.7, number: 21, direction: SELL, fee: 1.13 },
    { day: 9, price: 95, number: 22, direction: BUY, fee: 1.07 },
  ]
}]

export {
  data,
  currentPrice,
}