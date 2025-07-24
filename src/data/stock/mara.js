import { BUY, SELL } from "../const.js";

// 当前股价
const currentPrice = 20.35;
// 交易数据
const data = [
  {
    month: "202312",
    monthlyProfit: 180,
    trans: [
      { day: 19, price: 21.45, number: 100, direction: BUY, fee: 1.3 },
      { day: 22, price: 26.9, number: 50, direction: BUY, fee: 1.15, t: '1' },
      { day: 22, price: 27.1, number: 50, direction: SELL, fee: 1.17, t: '1 收益 0.2 * 50 = 10' },
      { day: 26, price: 25.4, number: 80, direction: BUY, fee: 1.24, t: '2' }, // 3 HKD 返现
      { day: 26, price: 26.4, number: 80, direction: SELL, fee: 1.27, t: '2 收益 1 * 80 = 80' },
      { day: 27, price: 28.2, number: 100, direction: BUY, fee: 1.3 },
      { day: 27, price: 29.2, number: 90, direction: SELL, fee: 1.3 },
      { day: 27, price: 29.9, number: 100, direction: BUY, fee: 1.3, t: '3' },
      { day: 27, price: 30.2, number: 100, direction: SELL, fee: 1.33, t: '3 收益 0.3 * 100 = 30' },
      { day: 27, price: 29.9, number: 100, direction: BUY, fee: 1.3, t: '4' },
      { day: 27, price: 30.2, number: 100, direction: SELL, fee: 1.33, t: '4 收益 0.3 * 100 = 30' },
      { day: 28, price: 29.45, number: 100, direction: BUY, fee: 1.3 },
      { day: 28, price: 28.0, number: 60, direction: BUY, fee: 1.18, t: '5' },
      { day: 28, price: 28.5, number: 60, direction: SELL, fee: 1.2, t: '5 收益 0.5 * 60 = 30' },
      { day: 28, price: 28.978, number: 60, direction: BUY, fee: 1.18 },
      { day: 29, price: 24.5, number: 10, direction: BUY, fee: 1.03 },
    ],
  },
  {
    month: "202401",
    trans: [
      { day: 3, price: 20.97, number: 100, direction: BUY, fee: 1.3 }, // 3 HKD 返现
      { day: 9, price: 25, number: 120, direction: BUY, fee: 1.36 }, // 3 HKD 返现
      { day: 10, price: 25.3, number: 77, direction: BUY, fee: 1.23 },
      { day: 12, price: 21.31, number: 123, direction: BUY, fee: 1.37 },
      { day: 17, price: 17.1, number: 12, direction: BUY, fee: 1.04, t: '6' },
      { day: 26, price: 18.26, number: 7, direction: BUY, fee: 1.02, t: '6' }, // 3 HKD 返现
    ],
  },
  {
    month: "202402",
    monthlyProfit: 352.9,
    trans: [
      { day: 8, price: 19.88, number: 19, direction: SELL, fee: 1.08, t: '6 收益 19.88*19-(17.1*12+18.26*7) = 44.7' },
      { day: 28, price: 33.302, number: 100, direction: SELL, fee: 1.35, t: '7' },
      { day: 28, price: 33.95, number: 100, direction: SELL, fee: 1.35, t: '7' },
      { day: 28, price: 32.78, number: 100, direction: BUY, fee: 1.3, t: '7' }, // 3 HKD 返现
      { day: 28, price: 31.79, number: 100, direction: BUY, fee: 1.3, t: '7 收益3330.2+3395-(3278+3179) = 268.2' }, // 3 HKD 返现
      { day: 29, price: 25.5, number: 200, direction: BUY, fee: 1.6, t: '8' }, // 3 HKD 返现
      { day: 29, price: 25.7, number: 200, direction: SELL, fee: 1.67, t: '8 收益 0.2 * 200 = 40' },
    ],
  },
  {
    month: "202403",
    monthlyProfit: 176.56,
    trans: [
      { day: 1, price: 26.37, number: 200, direction: BUY, fee: 1.6, t: '9' }, // 3 HKD 返现
      { day: 1, price: 26.47, number: 200, direction: SELL, fee: 1.67, t: '9 收益 0.1 * 200 = 20' },
      { day: 4, price: 28.368, number: 200, direction: BUY, fee: 1.6, t: '10' },
      { day: 4, price: 28.87, number: 200, direction: SELL, fee: 1.68, t: '10 收益 (2887-2836.8)* 2 = 100.4' },
      { day: 4, price: 28.8294, number: 200, direction: BUY, fee: 1.6, desc: '神来一笔' },
      { day: 11, price: 20.59, number: 16, direction: BUY, fee: 0.05, t: '11' }, // 1 USD抵扣 + 5HKD 返现，第三方 0.05
      { day: 28, price: 24.1, number: 16, direction: SELL, fee: 0.44, t: '11 收益 (24.1-20.59)*16 = 56.16' }, // 0.63 USD 抵扣
    ],
  },
  {
    month: "202404",
    monthlyProfit: 202.09,
    trans: [
      { day: 2, price: 19.6, number: 23, direction: BUY, fee: 0.44, t: '12' }, // 0.63 USD 抵扣 + 5HKD 返现
      { day: 10, price: 17.43, number: 77, direction: BUY, fee: 1.23, t: '12' },
      { day: 24, price: 19.95, number: 100, direction: SELL, fee: 1.34, t: '12 收益 1995-(19.6*23+17.43*77) = 202.09' },
      { day: 29, price: 18, number: 50, direction: BUY, fee: 1.15, t: '13' },
      { day: 30, price: 17, number: 50, direction: BUY, fee: 1.15, t: '13' },
    ],
  },
  {
    month: "202405",
    monthlyProfit: 427.05,
    trans: [
      { day: 3, price: 18.1, number: 50, direction: SELL, fee: 1.17, t: '13' },
      { day: 6, price: 19.1, number: 50, direction: SELL, fee: 1.17, t: '13 收益  (181+191-180-170) * 5 = 110' },
      { day: 10, price: 18.0, number: 50, direction: BUY, fee: 1.15, t: '14' },
      { day: 13, price: 17.0, number: 50, direction: BUY, fee: 1.15, t: '14' },
      { day: 14, price: 18.1, number: 50, direction: SELL, fee: 0.53, t: '14' }, // 5HKD 抵扣
      { day: 15, price: 19.1, number: 50, direction: SELL, fee: 0.53, t: '14 收益 (181+191-180-170) * 5 = 110' }, // 5HKD 抵扣
      { day: 15, price: 18.0, number: 50, direction: BUY, fee: 1.15, t: '15' },
      { day: 15, price: 19.1, number: 50, direction: SELL, fee: 1.17, t: '15 收益 1.1 * 50 = 55' },

      { day: 20, price: 20.902, number: 50, direction: SELL, fee: 0.55 }, // 5HKD 抵扣
      { day: 20, price: 21.2, number: 50, direction: SELL, fee: 1.19 },
      // 赚 0.4 * 50 = 20
      { day: 20, price: 21.5, number: 50, direction: SELL, fee: 1.19, t: '16', desc: '之前fee记录成1.1了,少了0.09的误差' },
      { day: 20, price: 21.1, number: 50, direction: BUY, fee: 1.15, t: '16 收益 0.4 * 50 = 20' },

      { day: 20, price: 21.8, number: 50, direction: SELL, fee: 1.19 },
      // 赚 0.4 * 50 = 20
      { day: 20, price: 22.1, number: 50, direction: SELL, fee: 1.19, t: '17' },
      { day: 20, price: 21.7, number: 50, direction: BUY, fee: 1.15, t: '17 收益 0.4 * 50 = 20' },
      // 赚 0.4 * 50 = 20
      { day: 20, price: 22.5, number: 50, direction: SELL, fee: 1.19, t: '18' },
      { day: 21, price: 22.1, number: 50, direction: BUY, fee: 1.15, t: '18 收益 0.4 * 50 = 20' },

      // 日，22.1 买了两次，搞错了，盘后的订单睡着了没注意成交了，又下单了一次
      { day: 21, price: 22.1, number: 50, direction: BUY, fee: 0.51, t: '19' }, // 5HKD 抵扣
      { day: 21, price: 22.5, number: 50, direction: SELL, fee: 1.19, t: '19 收益 0.4 * 50 = 20' },
      { day: 21, price: 21.159, number: 50, direction: BUY, fee: 1.15, t: '20' },
      { day: 21, price: 21.6, number: 50, direction: SELL, fee: 1.19, t: '20 收益 (216 - 211.59)*5 = 22.05' },

      { day: 22, price: 21.1, number: 50, direction: BUY, fee: 1.15 },
      { day: 22, price: 21, number: 50, direction: BUY, fee: 1.15 },
      { day: 23, price: 20.485, number: 50, direction: BUY, fee: 1.15 },

      { day: 30, price: 19.8, number: 50, direction: BUY, fee: 0.51, t: '21' }, // 5 HKD 抵扣
      { day: 30, price: 20.8, number: 50, direction: SELL, fee: 0.55, t: '21 收益 50' }, // 5 HKD 抵扣
      { day: 30, price: 20.2, number: 50, direction: BUY, fee: 1.15 },

      { day: 31, price: 19.8, number: 50, direction: BUY, fee: 1.15 },
      { day: 31, price: 19, number: 27, direction: BUY, fee: 1.08, t: '22' },
    ],
  },
  {
    month: "202406",
    trans: [
      { day: 3, price: 20.1, number: 27, direction: SELL, fee: 0.48, t: '22 收益 1.1 * 27 = 29.7' }, // 5 HKD
      { day: 3, price: 20.8, number: 50, direction: SELL, fee: 0.56, t: '23' }, // 5 HKD
      { day: 3, price: 20, number: 50, direction: BUY, fee: 1.15, t: '23 收益 0.8 * 50 = 40' },
      { day: 4, price: 21.1, number: 50, direction: SELL, fee: 1.19 },
      { day: 5, price: 20.625, number: 50, direction: BUY, fee: 1.15 },
      { day: 5, price: 21, number: 50, direction: SELL, fee: 1.19 },
      { day: 7, price: 20, number: 50, direction: BUY, fee: 1.15 },
      { day: 10, price: 19, number: 34, direction: BUY, fee: 1.1 },
      { day: 12, price: 20, number: 34, direction: SELL, fee: 0.49 }, // 5 HKD
      { day: 14, price: 19, number: 36, direction: BUY, fee: 0.47 }, // 5 HKD
      { day: 17, price: 20, number: 36, direction: SELL, fee: 0.5 }, // 5 HKD
      { day: 21, price: 19, number: 38, direction: BUY, fee: 0.47 }, // 5 HKD
      { day: 26, price: 20, number: 38, direction: SELL, fee: 1.14 },
    ],
  },
  {
    month: "202407",
    trans: [
      { day: 1, price: 22, number: 50, direction: SELL, fee: 0.55 }, // 5 HKD
      { day: 3, price: 21, number: 50, direction: BUY, fee: 0.52 }, // 5 HKD
      { day: 9, price: 19, number: 52, direction: BUY, fee: 1.16 },
      { day: 12, price: 20, number: 52, direction: SELL, fee: 1.2 },
      { day: 15, price: 24, number: 50, direction: SELL, fee: 1.19 },
      { day: 16, price: 25, number: 50, direction: SELL, fee: 1.19 },
      { day: 16, price: 26, number: 50, direction: SELL, fee: 1.2 },
      { day: 16, price: 27.05, number: 50, direction: SELL, fee: 1.2 }, // 夜盘
      { day: 17, price: 26, number: 50, direction: BUY, fee: 1.15 }, // 夜盘
      { day: 17, price: 27, number: 50, direction: SELL, fee: 1.2 }, // 夜盘
      { day: 17, price: 25.8076, number: 50, direction: BUY, fee: 1.15 }, // 盘前
      { day: 17, price: 27, number: 50, direction: SELL, fee: 1.2 },
      { day: 17, price: 26, number: 50, direction: BUY, fee: 1.15 },
      { day: 17, price: 25, number: 50, direction: BUY, fee: 1.15 },
      { day: 18, price: 26.1, number: 50, direction: SELL, fee: 1.2 },
      { day: 18, price: 25, number: 50, direction: BUY, fee: 1.15 },
      { day: 18, price: 24, number: 50, direction: BUY, fee: 1.15 },
      { day: 19, price: 25, number: 50, direction: SELL, fee: 1.19 },
      // 周一
      { day: 22, price: 24, number: 50, direction: BUY, fee: 1.15 },
      // 周二
      { day: 23, price: 23, number: 50, direction: BUY, fee: 1.15 },
      { day: 23, price: 22, number: 50, direction: BUY, fee: 1.15 },
      // 周三
      { day: 24, price: 21, number: 50, direction: BUY, fee: 1.15 },
      // 周四
      { day: 25, price: 20, number: 50, direction: BUY, fee: 1.15 },
      { day: 25, price: 21, number: 50, direction: SELL, fee: 1.19 },
      // 周五
      { day: 26, price: 22, number: 50, direction: SELL, fee: 1.19 },
      { day: 26, price: 21, number: 50, direction: BUY, fee: 1.15 },
      // 周一
      { day: 28, price: 22.1802, number: 50, direction: SELL, fee: 1.19 },
      { day: 29, price: 21, number: 50, direction: BUY, fee: 1.15 },
      { day: 30, price: 20, number: 50, direction: BUY, fee: 1.15 },
    ],
  },
  {
    month: "202408",
    trans: [
      { day: 1, price: 19, number: 50, direction: BUY, fee: 1.15 },
      { day: 1, price: 18, number: 67, direction: BUY, fee: 1.2 },
      { day: 6, price: 16.9, number: 60, direction: BUY, fee: 1.18, t: '60.d' },
      { day: 7, price: 16, number: 65, direction: BUY, fee: 1.2, t: '65.a' },
      { day: 8, price: 17, number: 65, direction: SELL, fee: 1.24, t: '65.a 收益 65' },
      { day: 8, price: 18, number: 50, direction: SELL, fee: 1.19, t: '50.c' },
      { day: 9, price: 17, number: 50, direction: BUY, fee: 1.15, t: '50.c 收益 50' },
      { day: 12, price: 16, number: 60, direction: BUY, fee: 1.18, t: '60.c' },
      { day: 13, price: 15, number: 66, direction: BUY, fee: 1.2, t: '66.c' },
      { day: 14, price: 16, number: 66, direction: SELL, fee: 1.24, t: '66.c 收益 66' },
      { day: 14, price: 15, number: 66, direction: BUY, fee: 1.2, t: '66.d' },
      { day: 15, price: 16, number: 66, direction: SELL, fee: 1.24, t: '66.d 收益 66' },
      { day: 20, price: 17, number: 60, direction: SELL, fee: 1.22, t: '60.c 收益 60' },
      { day: 23, price: 18, number: 60, direction: SELL, fee: 1.22, t: '60.d 收益 1.1*60 = 66' },
      { day: 27, price: 17, number: 60, direction: BUY, fee: 1.18, t: '60.b' },
      { day: 29, price: 18, number: 60, direction: SELL, fee: 1.22, t: '60.b 收益 60' },
      { day: 29, price: 17, number: 60, direction: BUY, fee: 1.18, t: '60.a' },
    ],
  },
  {
    month: "202409",
    trans: [
      { day: 3, price: 16, number: 62, direction: BUY, fee: 1.19, t: '62.a' },
      { day: 3, price: 14.94, number: 66, direction: BUY, fee: 1.2, t: '66.b' },
      { day: 5, price: 14, number: 52, direction: BUY, fee: 1.16, t: '52.a' },
      // 9.7 这个周末，持股 1507 股，含手续费成本 20.644，股价 13.38，盈利 -10947.49
      { day: 10, price: 15, number: 52, direction: SELL, fee: 1.19, t: '52.a 收益 52' },
      { day: 12, price: 16, number: 66, direction: SELL, fee: 1.24, t: '66.b 收益 (16-14.94)*66=69.96' },
      { day: 19, price: 15.9, number: 100, direction: BUY, fee: 1.3, t: '100.d' },
      { day: 20, price: 15.1, number: 100, direction: BUY, fee: 1.3, t: '100.e' },
      { day: 20, price: 15, number: 66, direction: BUY, fee: 1.2, t: '66.a' },
      { day: 20, price: 15.6, number: 100, direction: SELL, fee: 1.36, t: '100.e 收益 0.5*100=50' },
      // 9.21 这个周末，持股 1555 股，含手续费成本 20.456，股价 15.5，盈利  -7706.38
      { day: 23, price: 16, number: 66, direction: SELL, fee: 1.24, t: '66.a 收益 66' },
      { day: 26, price: 17, number: 62, direction: SELL, fee: 1.23, t: '62.a 收益 62' },
      { day: 26, price: 17.555, number: 100, direction: SELL, fee: 1.37, t: '100.d 收益 1.655*100=165.5' },
      { day: 26, price: 18, number: 60, direction: SELL, fee: 1.22, t: '60.a 收益 60' },
      { day: 27, price: 17, number: 100, direction: BUY, fee: 1.3, t: '100.a' },
    ],
  },
  {
    month: "202410",
    trans: [
      { day: 1, price: 16, number: 100, direction: BUY, fee: 1.3, t: '100.b' },
      { day: 1, price: 15, number: 100, direction: BUY, fee: 1.3, t: '100.c' },
      { day: 8, price: 16, number: 70, direction: BUY, fee: 1.21 },
      { day: 9, price: 15.5, number: 60, direction: BUY, fee: 1.18 },
      { day: 23, price: 17.4, number: 50, direction: BUY, fee: 1.15, t: '1.a' },
      { day: 24, price: 18.42, number: 50, direction: SELL, fee: 1.19, t: '1.a 收益 1.02*50=51' },
      { day: 24, price: 17.8, number: 50, direction: BUY, fee: 1.15 },
      { day: 25, price: 17.4, number: 50, direction: BUY, fee: 1.15 },
      { day: 25, price: 17, number: 50, direction: BUY, fee: 1.15, t: '50.a' },
      { day: 31, price: 18, number: 50, direction: BUY, fee: 1.15, t: '50.b' },
      { day: 31, price: 17, number: 55, direction: BUY, fee: 1.17 },
    ],
  },
  {
    month: "202411",
    trans: [
      { day: 1, price: 16.5, number: 40, direction: BUY, fee: 1.12 },
      { day: 4, price: 15.9, number: 12, direction: BUY, fee: 1.04 },
      { day: 5, price: 17.5, number: 50, direction: SELL, fee: 1.18 },
      { day: 5, price: 18.1, number: 50, direction: SELL, fee: 1.19, t: '50.a 收益 1.1*50 = 55' },
      { day: 6, price: 19, number: 50, direction: SELL, fee: 1.19, t: '50.b 收益 50' },
      { day: 11, price: 21.22, number: 100, direction: SELL, fee: 1.38 },
      { day: 11, price: 22, number: 50, direction: SELL, fee: 1.19 },
      { day: 11, price: 23, number: 50, direction: SELL, fee: 1.19 },
      { day: 11, price: 21.9, number: 50, direction: BUY, fee: 1.15, t: '24' },
      { day: 11, price: 22.7, number: 50, direction: SELL, fee: 1.19, t: '24 收益 0.8 * 50 = 40' },
      { day: 11, price: 24, number: 100, direction: SELL, fee: 1.39, t: '100.c 收益 9*100=900' },
      { day: 11, price: 25, number: 100, direction: SELL, fee: 1.39, t: '100.b 收益 9*100=900' },
      { day: 11, price: 26, number: 100, direction: SELL, fee: 1.39, t: '100.a 收益 9*100=900' },
      { day: 12, price: 23, number: 50, direction: BUY, fee: 1.15, t: '25' },
      { day: 13, price: 24, number: 50, direction: SELL, fee: 1.19, t: '25 收益 50' },
      { day: 13, price: 23, number: 50, direction: BUY, fee: 1.15, t: '34' },
      { day: 13, price: 22, number: 50, direction: BUY, fee: 1.15, t: '33' },
      { day: 14, price: 21, number: 50, direction: BUY, fee: 1.15, t: '32' },
      { day: 18, price: 20, number: 50, direction: BUY, fee: 1.15, t: '26' },
      { day: 18, price: 19, number: 50, direction: BUY, fee: 1.15, t: '27' },
      { day: 18, price: 20, number: 50, direction: SELL, fee: 1.19, t: '27 收益 50' },
      { day: 18, price: 21, number: 50, direction: SELL, fee: 1.19, t: '26 收益 50' },
      { day: 18, price: 20, number: 50, direction: BUY, fee: 1.15, t: '28' },
      { day: 18, price: 19, number: 50, direction: BUY, fee: 1.15, t: '29' },
      { day: 18, price: 18, number: 50, direction: BUY, fee: 1.15, t: '30' },
      { day: 19, price: 19, number: 50, direction: SELL, fee: 1.19, t: '30 收益 50' },
      { day: 19, price: 20, number: 50, direction: SELL, fee: 1.19, t: '29 收益 50' },
      { day: 20, price: 21, number: 50, direction: SELL, fee: 1.19, t: '28 收益 50' },
      { day: 20, price: 22, number: 50, direction: SELL, fee: 1.19, t: '31' },
      { day: 20, price: 21, number: 50, direction: BUY, fee: 1.15, t: '31 收益 50' },
      { day: 20, price: 22, number: 50, direction: SELL, fee: 1.19, t: '32 收益 50' },
      { day: 20, price: 23, number: 50, direction: SELL, fee: 1.19, t: '33 收益 50' },
      { day: 20, price: 24, number: 50, direction: SELL, fee: 1.19, t: '34 收益 50' },
      { day: 21, price: 25.3, number: 50, direction: SELL, fee: 1.20, t: '35' },
      { day: 21, price: 22.7, number: 50, direction: BUY, fee: 1.15, t: '35 收益 (25.3-22.7)*50 = 130' },
      { day: 21, price: 24, number: 50, direction: SELL, fee: 1.19 },
      { day: 22, price: 25.5, number: 50, direction: SELL, fee: 1.20 },
      { day: 22, price: 26.5, number: 50, direction: SELL, fee: 1.20 },
      { day: 25, price: 25, number: 50, direction: BUY, fee: 1.15, t: '1125a' },
      { day: 25, price: 26, number: 50, direction: SELL, fee: 1.20, t: '1125a 收益 50' },
      { day: 25, price: 28, number: 50, direction: SELL, fee: 1.20, t: '1125b' },
      { day: 25, price: 27, number: 50, direction: BUY, fee: 1.15, t: '1125b 收益 50' },
      { day: 29, price: 29, number: 100, direction: SELL, fee: 1.40, },
      { day: 29, price: 30, number: 104, direction: SELL, fee: 1.42 },
      { day: 29, price: 29, number: 50, direction: BUY, fee: 1.15 },
      { day: 29, price: 28, number: 50, direction: BUY, fee: 1.15 },
      { day: 29, price: 27, number: 50, direction: BUY, fee: 1.15, t: 'grid1' },
    ],
  },
  {
    month: "202412",
    monthlyProfit: 737.5,
    trans: [
      { day: 1, price: 28.34, number: 50, direction: SELL, fee: 1.20, t: 'grid1 收益 67' },
      { day: 2, price: 27, number: 50, direction: BUY, fee: 0.51, t: 'grid6', desc: '5HKD 平台费抵用' },
      { day: 2, price: 26, number: 50, direction: BUY, fee: 1.15, t: 'grid5' },
      { day: 2, price: 25, number: 50, direction: BUY, fee: 1.15, t: 'grid3' },
      { day: 2, price: 24, number: 50, direction: BUY, fee: 1.15, t: 'grid2' },
      { day: 2, price: 25, number: 50, direction: SELL, fee: 1.19, t: 'grid2 收益 50' },
      { day: 2, price: 26, number: 50, direction: SELL, fee: 0.56, t: 'grid3 收益 50', desc: '5 HKD 平台费抵用' },
      { day: 3, price: 25, number: 50, direction: BUY, fee: 1.15, t: 'grid4' },
      // 以上数据经校验与 LongBridge 无差
      { day: 4, price: 26, number: 50, direction: SELL, fee: 1.20, t: 'grid4 收益 50' },
      { day: 4, price: 27.55, number: 50, direction: SELL, fee: 1.20, t: 'grid5 收益 77.5' },
      { day: 4, price: 28, number: 50, direction: SELL, fee: 1.20, t: 'grid6 收益 50' },
      { day: 5, price: 27, number: 50, direction: BUY, fee: 1.15, t: 'grid7' },
      { day: 5, price: 28, number: 50, direction: SELL, fee: 1.20, t: 'grid7 收益 50' },
      { day: 5, price: 27, number: 50, direction: BUY, fee: 1.15 },
      { day: 5, price: 26, number: 50, direction: BUY, fee: 1.15 },
      { day: 5, price: 25, number: 50, direction: BUY, fee: 1.15, t: 'grid8' },
      { day: 6, price: 26, number: 50, direction: SELL, fee: 1.20, t: 'grid8 收益 50' },
      { day: 9, price: 25, number: 50, direction: BUY, fee: 0.51, desc: '5 HKD 抵扣' },
      { day: 9, price: 24, number: 50, direction: BUY, fee: 1.15, t: 'grid12' },
      { day: 10, price: 23, number: 50, direction: BUY, fee: 1.15, t: 'grid9' },
      { day: 11, price: 24, number: 50, direction: SELL, fee: 0.55, t: 'grid9 收益 50', desc: '5 HKD 折扣' },
      { day: 11, price: 23, number: 50, direction: BUY, fee: 1.15, t: 'grid10' },
      { day: 12, price: 24, number: 50, direction: SELL, fee: 1.19, t: 'grid10 收益 50' },
      { day: 12, price: 23, number: 50, direction: BUY, fee: 1.15, t: 'grid11' },
      // 以上数据经校验与 LongBridge 无差
      { day: 15, price: 24.1, number: 50, direction: SELL, fee: 1.19, t: 'grid11 收益 55' },
      { day: 16, price: 25, number: 50, direction: SELL, fee: 0.55, t: 'grid12 收益 50', desc: '5 HKD 抵扣' },
      { day: 18, price: 24, number: 50, direction: BUY, fee: 0.51, t: '', desc: '5 HKD 抵扣' },
      { day: 18, price: 23.5, number: 50, direction: BUY, fee: 1.15 },
      { day: 18, price: 23, number: 50, direction: BUY, fee: 1.15 },
      { day: 18, price: 22.4, number: 50, direction: BUY, fee: 1.15 },
      { day: 18, price: 22, number: 50, direction: BUY, fee: 1.15 },
      { day: 19, price: 21.5, number: 60, direction: BUY, fee: 1.18 },
      { day: 19, price: 21, number: 60, direction: BUY, fee: 1.18 },
      { day: 19, price: 20.5, number: 60, direction: BUY, fee: 1.18, t: 'grid43' },
      { day: 19, price: 20, number: 80, direction: BUY, fee: 1.24, t: 'grid43' },
      { day: 20, price: 19.1, number: 80, direction: BUY, fee: 1.24, t: 'grid13' },
      { day: 20, price: 20.2, number: 80, direction: SELL, fee: 1.29, t: 'grid13 收益 88' },
      // 以上数据经过校验与 LongBridge 无差
    ]
  }, {
    month: '202501',
    monthlyProfit: 355,
    trans: [
      { day: 13, price: 17, number: 100, direction: BUY, fee: 0.66, t: 'grid15', desc: '5 HKD 抵扣' },
      { day: 14, price: 18, number: 50, direction: SELL, fee: 0.55, t: 'grid14', desc: '5 HKD 抵扣' },
      { day: 14, price: 17, number: 50, direction: BUY, fee: 0.51, t: 'grid14 收益 50', desc: '5 HKD 抵扣' },
      { day: 15, price: 18, number: 50, direction: SELL, fee: 1.19, t: 'grid15 收益 50' },
      { day: 17, price: 19, number: 50, direction: SELL, fee: 1.19, t: 'grid15 收益 100' },
      { day: 24, price: 21.1, number: 50, direction: SELL, fee: 1.19, t: 'grid16' },
      { day: 26, price: 19, number: 50, direction: BUY, fee: 1.15, t: 'grid16 收益 105' },
      { day: 27, price: 18, number: 50, direction: BUY, fee: 1.15, t: 'grid17' },
      { day: 30, price: 19, number: 50, direction: SELL, fee: 1.19, t: 'grid17 收益 50' },
    ]
  }, {
    month: '202502',
    monthlyProfit: 264.8,
    trans: [
      { day: 7, price: 17, number: 150, direction: BUY, fee: 1.45, t: 'grid42' },
      { day: 13, price: 15.92, number: 50, direction: BUY, fee: 1.15, t: 'grid18' },
      { day: 14, price: 17, number: 50, direction: SELL, fee: 1.18, t: 'grid18 收益 54' },
      { day: 18, price: 16, number: 50, direction: BUY, fee: 1.15, t: 'grid33' },
      { day: 21, price: 15, number: 50, direction: BUY, fee: 1.15, t: 'grid 24' },
      { day: 24, price: 14, number: 100, direction: BUY, fee: 0.66, t: 'grid21' },
      { day: 25, price: 13, number: 69, direction: BUY, fee: 1.21, t: 'grid19' },
      { day: 25, price: 12.45, number: 16, direction: BUY, fee: 1.05, t: 'grid19' },
      { day: 27, price: 14, number: 85, direction: SELL, fee: 1.30, t: 'grid19 收益 93.8' },
      { day: 27, price: 12.70, number: 90, direction: BUY, fee: 1.27, t: 'grid20' },
      { day: 28, price: 14, number: 90, direction: SELL, fee: 1.32, t: 'grid20 收益 117' },
    ]
  }, {
    month: '202503',
    monthlyProfit: 546,
    trans: [
      { day: 2, price: 15.65, number: 100, direction: SELL, fee: 1.36, t: 'grid21 收益 165' },
      { day: 3, price: 14, number: 100, direction: BUY, fee: 0.66, t: 'grid22' },
      { day: 5, price: 15, number: 100, direction: SELL, fee: 1.36, t: 'grid22 收益 100' },
      { day: 6, price: 14, number: 100, direction: BUY, fee: 1.30, t: 'grid23' },
      { day: 7, price: 15, number: 100, direction: SELL, fee: 1.36, t: 'grid23 收益 100' },
      { day: 7, price: 16, number: 50, direction: SELL, fee: 1.18, t: 'grid24 收益 50' },
      { day: 9, price: 15, number: 50, direction: BUY, fee: 1.15, t: 'grid 31' },
      { day: 10, price: 14, number: 100, direction: BUY, fee: 1.30, t: 'grid 30' },
      { day: 10, price: 13, number: 95, direction: BUY, fee: 1.29, t: 'grid 25' },
      { day: 11, price: 12.8, number: 30, direction: BUY, fee: 0.45, t: 'grid25', desc: '5 HKD 抵扣' },
      { day: 24, price: 14, number: 125, direction: SELL, fee: 0.81, t: 'grid25 收益 131' },
      { day: 28, price: 12.9, number: 100, direction: BUY, fee: 0.66, t: 'grid28' },
      { day: 30, price: 11.8, number: 83, direction: BUY, fee: 0.61, t: 'grid27' },
    ]
  }, {
    month: '202504',
    monthlyProfit: 395.92,
    trans: [
      { day: 8, price: 9.9368, number: 100, direction: BUY, fee: 0.66, t: 'grid26' },
      { day: 9, price: 11.8, number: 100, direction: SELL, fee: 0.71, t: 'grid26 收益 186.32' },
      // 以上数据经过校验与 LongBridge 无差
      { day: 14, price: 13, number: 83, direction: SELL, fee: 0.65, t: 'grid27 收益 99.6' },
      { day: 22, price: 14, number: 100, direction: SELL, fee: 0.72, t: 'grid28 收益 110' },
    ]
  }, {
    month: '202505',
    monthlyProfit: 490,
    trans: [
      { day: 6, price: 12.95, number: 100, direction: BUY, fee: 0.66, t: 'grid29' },
      { day: 8, price: 14.05, number: 100, direction: SELL, fee: 0.72, t: 'grid29 收益 110' },
      { day: 9, price: 15, number: 100, direction: SELL, fee: 0.72, t: 'grid 30 收益 100' },
      { day: 9, price: 16, number: 50, direction: SELL, fee: 0.54, t: 'grid 31 收益 50' },
      { day: 9, price: 15, number: 50, direction: BUY, fee: 1.15, t: 'grid 32' },
      { day: 12, price: 16.5, number: 50, direction: SELL, fee: 1.18, t: 'grid 32 收益 75' },
      { day: 21, price: 17, number: 50, direction: SELL, fee: 0.53, t: 'grid33 收益 50' },
      { day: 21, price: 16, number: 50, direction: BUY, fee: 0.52, t: 'grid34' },
      { day: 22, price: 17, number: 50, direction: SELL, fee: 0.53, t: 'grid34 收益 50' },
      { day: 22, price: 16, number: 50, direction: BUY, fee: 0.52, t: 'grid40' },
      { day: 23, price: 14.9, number: 50, direction: BUY, fee: 1.15, t: 'grid35' },
      { day: 27, price: 16, number: 50, direction: SELL, fee: 1.16, t: 'grid35 收益 55' },
      { day: 28, price: 15, number: 50, direction: BUY, fee: 1.15, t: 'grid37' },
    ],
  }, {
    month: '202506',
    monthlyProfit: 157.5,
    trans: [
      { day: 2, price: 14, number: 50, direction: BUY, fee: 1.15, t: 'grid36' },
      { day: 3, price: 15, number: 50, direction: SELL, fee: 0.53, t: 'grid36 收益 50' },
      { day: 6, price: 16, number: 50, direction: SELL, fee: 1.16, t: 'grid37 收益 50' },
      { day: 13, price: 15, number: 50, direction: BUY, fee: 0.52, t: 'grid39' },
      { day: 23, price: 13.85, number: 50, direction: BUY, fee: 0.52, t: 'grid38' },
      { day: 24, price: 15, number: 50, direction: SELL, fee: 0.53, t: 'grid38 收益 57.5' },
    ]
  }, {
    month: '202507',
    monthlyProfit: 648,
    trans: [
      { day: 1, price: 16, number: 50, direction: SELL, fee: 0.53, t: 'grid39 收益 50' },
      { day: 2, price: 17, number: 50, direction: SELL, fee: 1.16, t: 'grid40 收益 50' },
      { day: 3, price: 18, number: 50, direction: SELL, fee: 1.16, t: 'grid42' },
      { day: 7, price: 16.5, number: 50, direction: BUY, fee: 1.15, t: 'grid41' },
      { day: 9, price: 18, number: 50, direction: SELL, fee: 1.16, t: 'grid41 收益 75' },
      { day: 10, price: 19, number: 50, direction: SELL, fee: 1.16, t: 'grid42' },
      { day: 14, price: 20, number: 50, direction: SELL, fee: 1.16, t: 'grid42 收益 50 + 100 + 150 = 300' },
      { day: 14, price: 21.02, number: 100, direction: SELL, fee: 0, t: 'grid43', desc: '100 * 21.02 = 2102.00 USD' },
      { day: 14, price: 21.025, number: 40, direction: SELL, fee: 0.81, t: 'grid43 收益 113', desc: '40 * 21.025 = 841.00 USD' },
      { day: 14, price: 19.9, number: 50, direction: BUY, fee: 1.15 },
      { day: 15, price: 18.8, number: 50, direction: BUY, fee: 0.52, t: 'grid44' },
      { day: 16, price: 20, number: 50, direction: SELL, fee: 1.16, t: 'grid44 收益 60' },
      { day: 21, price: 19, number: 50, direction: BUY, fee: 1.15 },
      { day: 23, price: 17.485, number: 50, direction: BUY, fee: 0 },
      { day: 23, price: 17, number: 50, direction: BUY, fee: 0 },
    ]
  }
];

export {
  currentPrice,
  data,
};
