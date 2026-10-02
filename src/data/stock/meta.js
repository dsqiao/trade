import { BUY, DIVIDEND, SELL } from "../const.js";

const currentPrice = 0;
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
    { day: 3, price: 609.105, number: 4, direction: SELL, fee: 1.08, t: 3 },
  ]
} ];

// 分红记录（独立于股票交易）。amount: 税前分红金额；tax: 预扣税/股息费用；税后净额 = amount - tax。
const dividend = [
  { month: '202512', day: 24, direction: DIVIDEND, amount: 14.18, tax: 1.42, desc: '现金分红 27 股 * 0.525 USD/股' },
];

export { data, currentPrice, dividend };