import { DEPOSIT, CCY } from './const.js';

/**
 * 子账号出入金记录
 * 每条记录字段说明：
 *   day        当天日期（号）
 *   amount     金额
 *   ccy        币种：CCY.HKD（港币） | CCY.USD（美元）
 *   direction  方向：DEPOSIT（入金/充值） | WITHDRAW（出金/提款）
 *   fee        手续费（可选，默认 0）
 *   desc       备注（可选）
 *
 * 说明：数据按月份倒序/正序均可，展示时会按 month 顺序渲染。
 */
const funding = [ {
  month: '202604',
  record: [
    { day: 23, amount: 5000, ccy: CCY.HKD, direction: DEPOSIT, fee: 0, desc: '' },
  ]
}, {
  month: '202606',
  record: [
    { day: 3, amount: 2500, ccy: CCY.HKD, direction: DEPOSIT, fee: 0, desc: '' },
    { day: 15, amount: 700, ccy: CCY.HKD, direction: DEPOSIT, fee: 0, desc: '' },
    { day: 26, amount: 2500, ccy: CCY.HKD, direction: DEPOSIT, fee: 0, desc: '' },
  ]
} ];

export {
  funding,
};
