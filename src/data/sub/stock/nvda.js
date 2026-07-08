import { BUY } from '../../const.js';

// 当前股价（兜底价，配置 Finnhub token 后会被实时价覆盖）
const currentPrice = 0;

/**
 * 子账号股票买卖记录（格式同主账号 src/data/stock/*.js）
 * trans 每条字段：
 *   day        日期（号）
 *   price      成交价（美元）
 *   number     股数
 *   direction  BUY 买入 | SELL 卖出 | OTHER 其他（分红/费用等）
 *   fee        手续费
 *   t          配对交易编号（可选）
 *   desc       备注（可选）
 *
 * 下方为示例数据，请按实际情况替换。
 */
const data = [ {
  month: '202607',
  trans: [
    { day: 2, price: 170, number: 10, direction: BUY, fee: 1.03 },
  ]
} ];

export {
  data,
  currentPrice,
};
