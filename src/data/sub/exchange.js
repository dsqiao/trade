import { CCY } from './const.js';

/**
 * 子账号货币兑换记录（港币 <-> 美元）
 * 每条记录字段说明：
 *   day        当天日期（号）
 *   fromCcy    换出币种
 *   fromAmount 换出金额
 *   toCcy      换入币种
 *   toAmount   换入金额
 *   fee        手续费（可选，默认 0；通常已折算进汇率，可留 0）
 *   desc       备注（可选）
 *
 * 汇率会由 fromAmount / toAmount 或 toAmount / fromAmount 自动计算展示，
 * 无需手动填写。
 */
const exchange = [ {
  month: '202604',
  record: [
    { day: 23, fromCcy: CCY.HKD, fromAmount: 5000, toCcy: CCY.USD, toAmount: 637, fee: 0, desc: '' },
  ]
}, {
  month: '202606',
  record: [
    { day: 3, fromCcy: CCY.HKD, fromAmount: 2500, toCcy: CCY.USD, toAmount: 318.5, fee: 0, desc: '' },
    { day: 15, fromCcy: CCY.HKD, fromAmount: 700, toCcy: CCY.USD, toAmount: 89.18, fee: 0, desc: '' },
    { day: 26, fromCcy: CCY.HKD, fromAmount: 2500, toCcy: CCY.USD, toAmount: 318.25, fee: 0, desc: '' },
  ]
} ];

export {
  exchange,
};
