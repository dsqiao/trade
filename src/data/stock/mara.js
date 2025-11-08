import { BUY, SELL } from "../const.js";

// 当前股价
const currentPrice = 20.35;
// 交易数据
const data = [
  {
    month: "202312",
    trans: [
      { day: 19, price: 21.45, number: 100, direction: BUY, fee: 1.3 },
      { day: 22, price: 26.9, number: 50, direction: BUY, fee: 1.15, t: 1 },
      { day: 22, price: 27.1, number: 50, direction: SELL, fee: 1.17, t: 1 },
      { day: 26, price: 25.4, number: 80, direction: BUY, fee: 1.24, t: 2 }, // 3 HKD 返现
      { day: 26, price: 26.4, number: 80, direction: SELL, fee: 1.27, t: 2 },
      { day: 27, price: 28.2, number: 100, direction: BUY, fee: 1.3 },
      { day: 27, price: 29.2, number: 90, direction: SELL, fee: 1.3 },
      { day: 27, price: 29.9, number: 100, direction: BUY, fee: 1.3, t: 3 },
      { day: 27, price: 30.2, number: 100, direction: SELL, fee: 1.33, t: 3 },
      { day: 27, price: 29.9, number: 100, direction: BUY, fee: 1.3, t: 4 },
      { day: 27, price: 30.2, number: 100, direction: SELL, fee: 1.33, t: 4 },
      { day: 28, price: 29.45, number: 100, direction: BUY, fee: 1.3 },
      { day: 28, price: 28.0, number: 60, direction: BUY, fee: 1.18, t: 5 },
      { day: 28, price: 28.5, number: 60, direction: SELL, fee: 1.2, t: 5 },
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
      { day: 17, price: 17.1, number: 12, direction: BUY, fee: 1.04, t: 6 },
      { day: 26, price: 18.26, number: 7, direction: BUY, fee: 1.02, t: 6 }, // 3 HKD 返现
    ],
  },
  {
    month: "202402",
    trans: [
      { day: 8, price: 19.88, number: 19, direction: SELL, fee: 1.08, t: 6 },
      { day: 28, price: 33.302, number: 100, direction: SELL, fee: 1.35, t: 7 },
      { day: 28, price: 33.95, number: 100, direction: SELL, fee: 1.35, t: 7 },
      { day: 28, price: 32.78, number: 100, direction: BUY, fee: 1.3, t: 7 }, // 3 HKD 返现
      { day: 28, price: 31.79, number: 100, direction: BUY, fee: 1.3, t: 7 }, // 3 HKD 返现
      { day: 29, price: 25.5, number: 200, direction: BUY, fee: 1.6, t: 8 }, // 3 HKD 返现
      { day: 29, price: 25.7, number: 200, direction: SELL, fee: 1.67, t: 8 },
    ],
  },
  {
    month: "202403",
    trans: [
      { day: 1, price: 26.37, number: 200, direction: BUY, fee: 1.6, t: 9 }, // 3 HKD 返现
      { day: 1, price: 26.47, number: 200, direction: SELL, fee: 1.67, t: 9 },
      { day: 4, price: 28.368, number: 200, direction: BUY, fee: 1.6, t: 10 },
      { day: 4, price: 28.87, number: 200, direction: SELL, fee: 1.68, t: 10 },
      { day: 4, price: 28.8294, number: 200, direction: BUY, fee: 1.6, desc: '神来一笔' },
      { day: 11, price: 20.59, number: 16, direction: BUY, fee: 0.05, t: 11 }, // 1 USD抵扣 + 5HKD 返现，第三方 0.05
      { day: 28, price: 24.1, number: 16, direction: SELL, fee: 0.44, t: 11 }, // 0.63 USD 抵扣
    ],
  },
  {
    month: "202404",
    trans: [
      { day: 2, price: 19.6, number: 23, direction: BUY, fee: 0.44, t: 12 }, // 0.63 USD 抵扣 + 5HKD 返现
      { day: 10, price: 17.43, number: 77, direction: BUY, fee: 1.23, t: 12 },
      { day: 24, price: 19.95, number: 100, direction: SELL, fee: 1.34, t: 12 },
      { day: 29, price: 18, number: 50, direction: BUY, fee: 1.15, t: 13 },
      { day: 30, price: 17, number: 50, direction: BUY, fee: 1.15, t: 13 },
    ],
  },
  {
    month: "202405",
    trans: [
      { day: 3, price: 18.1, number: 50, direction: SELL, fee: 1.17, t: 13 },
      { day: 6, price: 19.1, number: 50, direction: SELL, fee: 1.17, t: 13 },
      { day: 10, price: 18.0, number: 50, direction: BUY, fee: 1.15, t: 14 },
      { day: 13, price: 17.0, number: 50, direction: BUY, fee: 1.15, t: 14 },
      { day: 14, price: 18.1, number: 50, direction: SELL, fee: 0.53, t: 14 }, // 5HKD 抵扣
      { day: 15, price: 19.1, number: 50, direction: SELL, fee: 0.53, t: 14 }, // 5HKD 抵扣
      { day: 15, price: 18.0, number: 50, direction: BUY, fee: 1.15, t: 15 },
      { day: 15, price: 19.1, number: 50, direction: SELL, fee: 1.17, t: 15 },

      { day: 20, price: 20.902, number: 50, direction: SELL, fee: 0.55 }, // 5HKD 抵扣
      { day: 20, price: 21.2, number: 50, direction: SELL, fee: 1.19 },
      // 赚 0.4 * 50 = 20
      { day: 20, price: 21.5, number: 50, direction: SELL, fee: 1.19, t: 16, desc: '之前fee记录成1.1了,少了0.09的误差' },
      { day: 20, price: 21.1, number: 50, direction: BUY, fee: 1.15, t: 16 },

      { day: 20, price: 21.8, number: 50, direction: SELL, fee: 1.19 },
      // 赚 0.4 * 50 = 20
      { day: 20, price: 22.1, number: 50, direction: SELL, fee: 1.19, t: 17 },
      { day: 20, price: 21.7, number: 50, direction: BUY, fee: 1.15, t: 17 },
      // 赚 0.4 * 50 = 20
      { day: 20, price: 22.5, number: 50, direction: SELL, fee: 1.19, t: 18 },
      { day: 21, price: 22.1, number: 50, direction: BUY, fee: 1.15, t: 18 },

      // 日，22.1 买了两次，搞错了，盘后的订单睡着了没注意成交了，又下单了一次
      { day: 21, price: 22.1, number: 50, direction: BUY, fee: 0.51, t: 19 }, // 5HKD 抵扣
      { day: 21, price: 22.5, number: 50, direction: SELL, fee: 1.19, t: 19 },
      { day: 21, price: 21.159, number: 50, direction: BUY, fee: 1.15, t: 20 },
      { day: 21, price: 21.6, number: 50, direction: SELL, fee: 1.19, t: 20 },

      { day: 22, price: 21.1, number: 50, direction: BUY, fee: 1.15 },
      { day: 22, price: 21, number: 50, direction: BUY, fee: 1.15 },
      { day: 23, price: 20.485, number: 50, direction: BUY, fee: 1.15 },

      { day: 30, price: 19.8, number: 50, direction: BUY, fee: 0.51, t: 21 }, // 5 HKD 抵扣
      { day: 30, price: 20.8, number: 50, direction: SELL, fee: 0.55, t: 21 }, // 5 HKD 抵扣
      { day: 30, price: 20.2, number: 50, direction: BUY, fee: 1.15 },

      { day: 31, price: 19.8, number: 50, direction: BUY, fee: 1.15 },
      { day: 31, price: 19, number: 27, direction: BUY, fee: 1.08, t: 22 },
    ],
  },
  {
    month: "202406",
    trans: [
      { day: 3, price: 20.1, number: 27, direction: SELL, fee: 0.48, t: 22 }, // 5 HKD
      { day: 3, price: 20.8, number: 50, direction: SELL, fee: 0.56, t: 23 }, // 5 HKD
      { day: 3, price: 20, number: 50, direction: BUY, fee: 1.15, t: 23 },
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
      { day: 6, price: 16.9, number: 60, direction: BUY, fee: 1.18, t: 24 },
      { day: 7, price: 16, number: 65, direction: BUY, fee: 1.2, t: 25 },
      { day: 8, price: 17, number: 65, direction: SELL, fee: 1.24, t: 25 },
      { day: 8, price: 18, number: 50, direction: SELL, fee: 1.19, t: 26 },
      { day: 9, price: 17, number: 50, direction: BUY, fee: 1.15, t: 26 },
      { day: 12, price: 16, number: 60, direction: BUY, fee: 1.18, t: 27 },
      { day: 13, price: 15, number: 66, direction: BUY, fee: 1.2, t: 28 },
      { day: 14, price: 16, number: 66, direction: SELL, fee: 1.24, t: 28 },
      { day: 14, price: 15, number: 66, direction: BUY, fee: 1.2, t: 29 },
      { day: 15, price: 16, number: 66, direction: SELL, fee: 1.24, t: 29 },
      { day: 20, price: 17, number: 60, direction: SELL, fee: 1.22, t: 27 },
      { day: 23, price: 18, number: 60, direction: SELL, fee: 1.22, t: 24 },
      { day: 27, price: 17, number: 60, direction: BUY, fee: 1.18, t: 30 },
      { day: 29, price: 18, number: 60, direction: SELL, fee: 1.22, t: 30 },
      { day: 29, price: 17, number: 60, direction: BUY, fee: 1.18, t: 31 },
    ],
  },
  {
    month: "202409",
    trans: [
      { day: 3, price: 16, number: 62, direction: BUY, fee: 1.19, t: 32 },
      { day: 3, price: 14.94, number: 66, direction: BUY, fee: 1.2, t: 33 },
      { day: 5, price: 14, number: 52, direction: BUY, fee: 1.16, t: 34 },
      // 9.7 这个周末，持股 1507 股，含手续费成本 20.644，股价 13.38，盈利 -10947.49
      { day: 10, price: 15, number: 52, direction: SELL, fee: 1.19, t: 34 },
      { day: 12, price: 16, number: 66, direction: SELL, fee: 1.24, t: 33 },
      { day: 19, price: 15.9, number: 100, direction: BUY, fee: 1.3, t: 35 },
      { day: 20, price: 15.1, number: 100, direction: BUY, fee: 1.3, t: 36 },
      { day: 20, price: 15, number: 66, direction: BUY, fee: 1.2, t: 37 },
      { day: 20, price: 15.6, number: 100, direction: SELL, fee: 1.36, t: 36 },
      // 9.21 这个周末，持股 1555 股，含手续费成本 20.456，股价 15.5，盈利  -7706.38
      { day: 23, price: 16, number: 66, direction: SELL, fee: 1.24, t: 37 },
      { day: 26, price: 17, number: 62, direction: SELL, fee: 1.23, t: 32 },
      { day: 26, price: 17.555, number: 100, direction: SELL, fee: 1.37, t: 35 },
      { day: 26, price: 18, number: 60, direction: SELL, fee: 1.22, t: 31 },
      { day: 27, price: 17, number: 100, direction: BUY, fee: 1.3, t: 38 },
    ],
  },
  {
    month: "202410",
    trans: [
      { day: 1, price: 16, number: 100, direction: BUY, fee: 1.3, t: 39 },
      { day: 1, price: 15, number: 100, direction: BUY, fee: 1.3, t: 40 },
      { day: 8, price: 16, number: 70, direction: BUY, fee: 1.21 },
      { day: 9, price: 15.5, number: 60, direction: BUY, fee: 1.18 },
      { day: 23, price: 17.4, number: 50, direction: BUY, fee: 1.15, t: 41 },
      { day: 24, price: 18.42, number: 50, direction: SELL, fee: 1.19, t: 41 },
      { day: 24, price: 17.8, number: 50, direction: BUY, fee: 1.15 },
      { day: 25, price: 17.4, number: 50, direction: BUY, fee: 1.15 },
      { day: 25, price: 17, number: 50, direction: BUY, fee: 1.15, t: 42 },
      { day: 31, price: 18, number: 50, direction: BUY, fee: 1.15, t: 43 },
      { day: 31, price: 17, number: 55, direction: BUY, fee: 1.17 },
    ],
  },
  {
    month: "202411",
    trans: [
      { day: 1, price: 16.5, number: 40, direction: BUY, fee: 1.12 },
      { day: 4, price: 15.9, number: 12, direction: BUY, fee: 1.04 },
      { day: 5, price: 17.5, number: 50, direction: SELL, fee: 1.18 },
      { day: 5, price: 18.1, number: 50, direction: SELL, fee: 1.19, t: 42 },
      { day: 6, price: 19, number: 50, direction: SELL, fee: 1.19, t: 43 },
      { day: 11, price: 21.22, number: 100, direction: SELL, fee: 1.38 },
      { day: 11, price: 22, number: 50, direction: SELL, fee: 1.19 },
      { day: 11, price: 23, number: 50, direction: SELL, fee: 1.19 },
      { day: 11, price: 21.9, number: 50, direction: BUY, fee: 1.15, t: 44 },
      { day: 11, price: 22.7, number: 50, direction: SELL, fee: 1.19, t: 44 },
      { day: 11, price: 24, number: 100, direction: SELL, fee: 1.39, t: 40 },
      { day: 11, price: 25, number: 100, direction: SELL, fee: 1.39, t: 39 },
      { day: 11, price: 26, number: 100, direction: SELL, fee: 1.39, t: 38 },
      { day: 12, price: 23, number: 50, direction: BUY, fee: 1.15, t: 45 },
      { day: 13, price: 24, number: 50, direction: SELL, fee: 1.19, t: 45 },
      { day: 13, price: 23, number: 50, direction: BUY, fee: 1.15, t: 46 },
      { day: 13, price: 22, number: 50, direction: BUY, fee: 1.15, t: 47 },
      { day: 14, price: 21, number: 50, direction: BUY, fee: 1.15, t: 48 },
      { day: 18, price: 20, number: 50, direction: BUY, fee: 1.15, t: 49 },
      { day: 18, price: 19, number: 50, direction: BUY, fee: 1.15, t: 50 },
      { day: 18, price: 20, number: 50, direction: SELL, fee: 1.19, t: 50 },
      { day: 18, price: 21, number: 50, direction: SELL, fee: 1.19, t: 49 },
      { day: 18, price: 20, number: 50, direction: BUY, fee: 1.15, t: 51 },
      { day: 18, price: 19, number: 50, direction: BUY, fee: 1.15, t: 52 },
      { day: 18, price: 18, number: 50, direction: BUY, fee: 1.15, t: 53 },
      { day: 19, price: 19, number: 50, direction: SELL, fee: 1.19, t: 53 },
      { day: 19, price: 20, number: 50, direction: SELL, fee: 1.19, t: 52 },
      { day: 20, price: 21, number: 50, direction: SELL, fee: 1.19, t: 51 },
      { day: 20, price: 22, number: 50, direction: SELL, fee: 1.19, t: 54 },
      { day: 20, price: 21, number: 50, direction: BUY, fee: 1.15, t: 54 },
      { day: 20, price: 22, number: 50, direction: SELL, fee: 1.19, t: 48 },
      { day: 20, price: 23, number: 50, direction: SELL, fee: 1.19, t: 47 },
      { day: 20, price: 24, number: 50, direction: SELL, fee: 1.19, t: 46 },
      { day: 21, price: 25.3, number: 50, direction: SELL, fee: 1.20, t: 55 },
      { day: 21, price: 22.7, number: 50, direction: BUY, fee: 1.15, t: 55 },
      { day: 21, price: 24, number: 50, direction: SELL, fee: 1.19 },
      { day: 22, price: 25.5, number: 50, direction: SELL, fee: 1.20 },
      { day: 22, price: 26.5, number: 50, direction: SELL, fee: 1.20 },
      { day: 25, price: 25, number: 50, direction: BUY, fee: 1.15, t: 56 },
      { day: 25, price: 26, number: 50, direction: SELL, fee: 1.20, t: 56 },
      { day: 25, price: 28, number: 50, direction: SELL, fee: 1.20, t: 57 },
      { day: 25, price: 27, number: 50, direction: BUY, fee: 1.15, t: 57 },
      { day: 29, price: 29, number: 100, direction: SELL, fee: 1.40, },
      { day: 29, price: 30, number: 104, direction: SELL, fee: 1.42 },
      { day: 29, price: 29, number: 50, direction: BUY, fee: 1.15 },
      { day: 29, price: 28, number: 50, direction: BUY, fee: 1.15 },
      { day: 29, price: 27, number: 50, direction: BUY, fee: 1.15, t: 58 },
    ],
  },
  {
    month: "202412",
    trans: [
      { day: 1, price: 28.34, number: 50, direction: SELL, fee: 1.20, t: 58 },
      { day: 2, price: 27, number: 50, direction: BUY, fee: 0.51, t: 59, desc: '5HKD 平台费抵用' },
      { day: 2, price: 26, number: 50, direction: BUY, fee: 1.15, t: 60 },
      { day: 2, price: 25, number: 50, direction: BUY, fee: 1.15, t: 61 },
      { day: 2, price: 24, number: 50, direction: BUY, fee: 1.15, t: 62 },
      { day: 2, price: 25, number: 50, direction: SELL, fee: 1.19, t: 62 },
      { day: 2, price: 26, number: 50, direction: SELL, fee: 0.56, t: 61, desc: '5 HKD 平台费抵用' },
      { day: 3, price: 25, number: 50, direction: BUY, fee: 1.15, t: 63 },
      // 以上数据经校验与 LongBridge 无差
      { day: 4, price: 26, number: 50, direction: SELL, fee: 1.20, t: 63 },
      { day: 4, price: 27.55, number: 50, direction: SELL, fee: 1.20, t: 60 },
      { day: 4, price: 28, number: 50, direction: SELL, fee: 1.20, t: 59 },
      { day: 5, price: 27, number: 50, direction: BUY, fee: 1.15, t: 64 },
      { day: 5, price: 28, number: 50, direction: SELL, fee: 1.20, t: 64 },
      { day: 5, price: 27, number: 50, direction: BUY, fee: 1.15 },
      { day: 5, price: 26, number: 50, direction: BUY, fee: 1.15 },
      { day: 5, price: 25, number: 50, direction: BUY, fee: 1.15, t: 65 },
      { day: 6, price: 26, number: 50, direction: SELL, fee: 1.20, t: 65 },
      { day: 9, price: 25, number: 50, direction: BUY, fee: 0.51, desc: '5 HKD 抵扣' },
      { day: 9, price: 24, number: 50, direction: BUY, fee: 1.15, t: 66 },
      { day: 10, price: 23, number: 50, direction: BUY, fee: 1.15, t: 67 },
      { day: 11, price: 24, number: 50, direction: SELL, fee: 0.55, t: 67, desc: '5 HKD 折扣' },
      { day: 11, price: 23, number: 50, direction: BUY, fee: 1.15, t: 68 },
      { day: 12, price: 24, number: 50, direction: SELL, fee: 1.19, t: 68 },
      { day: 12, price: 23, number: 50, direction: BUY, fee: 1.15, t: 69 },
      // 以上数据经校验与 LongBridge 无差
      { day: 15, price: 24.1, number: 50, direction: SELL, fee: 1.19, t: 69 },
      { day: 16, price: 25, number: 50, direction: SELL, fee: 0.55, t: 66, desc: '5 HKD 抵扣' },
      { day: 18, price: 24, number: 50, direction: BUY, fee: 0.51, t: '', desc: '5 HKD 抵扣' },
      { day: 18, price: 23.5, number: 50, direction: BUY, fee: 1.15 },
      { day: 18, price: 23, number: 50, direction: BUY, fee: 1.15 },
      { day: 18, price: 22.4, number: 50, direction: BUY, fee: 1.15, t: 120 },
      { day: 18, price: 22, number: 50, direction: BUY, fee: 1.15, t: 120 },
      { day: 19, price: 21.5, number: 60, direction: BUY, fee: 1.18, t: 113 },
      { day: 19, price: 21, number: 60, direction: BUY, fee: 1.18, t: 113 },
      { day: 19, price: 20.5, number: 60, direction: BUY, fee: 1.18, t: 70 },
      { day: 19, price: 20, number: 80, direction: BUY, fee: 1.24, t: 70 },
      { day: 20, price: 19.1, number: 80, direction: BUY, fee: 1.24, t: 71 },
      { day: 20, price: 20.2, number: 80, direction: SELL, fee: 1.29, t: 71 },
      // 以上数据经过校验与 LongBridge 无差
    ]
  }, {
    month: '202501',
    trans: [
      { day: 13, price: 17, number: 100, direction: BUY, fee: 0.66, t: 72, desc: '5 HKD 抵扣' },
      { day: 14, price: 18, number: 50, direction: SELL, fee: 0.55, t: 73, desc: '5 HKD 抵扣' },
      { day: 14, price: 17, number: 50, direction: BUY, fee: 0.51, t: 73, desc: '5 HKD 抵扣' },
      { day: 15, price: 18, number: 50, direction: SELL, fee: 1.19, t: 72 },
      { day: 17, price: 19, number: 50, direction: SELL, fee: 1.19, t: 72 },
      { day: 24, price: 21.1, number: 50, direction: SELL, fee: 1.19, t: 74 },
      { day: 26, price: 19, number: 50, direction: BUY, fee: 1.15, t: 74 },
      { day: 27, price: 18, number: 50, direction: BUY, fee: 1.15, t: 75 },
      { day: 30, price: 19, number: 50, direction: SELL, fee: 1.19, t: 75 },
    ]
  }, {
    month: '202502',
    trans: [
      { day: 7, price: 17, number: 150, direction: BUY, fee: 1.45, t: 76 },
      { day: 13, price: 15.92, number: 50, direction: BUY, fee: 1.15, t: 77 },
      { day: 14, price: 17, number: 50, direction: SELL, fee: 1.18, t: 77 },
      { day: 18, price: 16, number: 50, direction: BUY, fee: 1.15, t: 78 },
      { day: 21, price: 15, number: 50, direction: BUY, fee: 1.15, t: 79 },
      { day: 24, price: 14, number: 100, direction: BUY, fee: 0.66, t: 80 },
      { day: 25, price: 13, number: 69, direction: BUY, fee: 1.21, t: 81 },
      { day: 25, price: 12.45, number: 16, direction: BUY, fee: 1.05, t: 81 },
      { day: 27, price: 14, number: 85, direction: SELL, fee: 1.30, t: 81 },
      { day: 27, price: 12.70, number: 90, direction: BUY, fee: 1.27, t: 82 },
      { day: 28, price: 14, number: 90, direction: SELL, fee: 1.32, t: 82 },
    ]
  }, {
    month: '202503',
    trans: [
      { day: 2, price: 15.65, number: 100, direction: SELL, fee: 1.36, t: 80 },
      { day: 3, price: 14, number: 100, direction: BUY, fee: 0.66, t: 83 },
      { day: 5, price: 15, number: 100, direction: SELL, fee: 1.36, t: 83 },
      { day: 6, price: 14, number: 100, direction: BUY, fee: 1.30, t: 84 },
      { day: 7, price: 15, number: 100, direction: SELL, fee: 1.36, t: 84 },
      { day: 7, price: 16, number: 50, direction: SELL, fee: 1.18, t: 79 },
      { day: 9, price: 15, number: 50, direction: BUY, fee: 1.15, t: 85 },
      { day: 10, price: 14, number: 100, direction: BUY, fee: 1.30, t: 86 },
      { day: 10, price: 13, number: 95, direction: BUY, fee: 1.29, t: 87 },
      { day: 11, price: 12.8, number: 30, direction: BUY, fee: 0.45, t: 87, desc: '5 HKD 抵扣' },
      { day: 24, price: 14, number: 125, direction: SELL, fee: 0.81, t: 87 },
      { day: 28, price: 12.9, number: 100, direction: BUY, fee: 0.66, t: 88 },
      { day: 30, price: 11.8, number: 83, direction: BUY, fee: 0.61, t: 89 },
    ]
  }, {
    month: '202504',
    trans: [
      { day: 8, price: 9.9368, number: 100, direction: BUY, fee: 0.66, t: 90 },
      { day: 9, price: 11.8, number: 100, direction: SELL, fee: 0.71, t: 90 },
      // 以上数据经过校验与 LongBridge 无差
      { day: 14, price: 13, number: 83, direction: SELL, fee: 0.65, t: 89 },
      { day: 22, price: 14, number: 100, direction: SELL, fee: 0.72, t: 88 },
    ]
  }, {
    month: '202505',
    trans: [
      { day: 6, price: 12.95, number: 100, direction: BUY, fee: 0.66, t: 91 },
      { day: 8, price: 14.05, number: 100, direction: SELL, fee: 0.72, t: 91 },
      { day: 9, price: 15, number: 100, direction: SELL, fee: 0.72, t: 86 },
      { day: 9, price: 16, number: 50, direction: SELL, fee: 0.54, t: 85 },
      { day: 9, price: 15, number: 50, direction: BUY, fee: 1.15, t: 92 },
      { day: 12, price: 16.5, number: 50, direction: SELL, fee: 1.18, t: 92 },
      { day: 21, price: 17, number: 50, direction: SELL, fee: 0.53, t: 78 },
      { day: 21, price: 16, number: 50, direction: BUY, fee: 0.52, t: 93 },
      { day: 22, price: 17, number: 50, direction: SELL, fee: 0.53, t: 93 },
      { day: 22, price: 16, number: 50, direction: BUY, fee: 0.52, t: 94 },
      { day: 23, price: 14.9, number: 50, direction: BUY, fee: 1.15, t: 95 },
      { day: 27, price: 16, number: 50, direction: SELL, fee: 1.16, t: 95 },
      { day: 28, price: 15, number: 50, direction: BUY, fee: 1.15, t: 96 },
    ],
  }, {
    month: '202506',
    trans: [
      { day: 2, price: 14, number: 50, direction: BUY, fee: 1.15, t: 97 },
      { day: 3, price: 15, number: 50, direction: SELL, fee: 0.53, t: 97 },
      { day: 6, price: 16, number: 50, direction: SELL, fee: 1.16, t: 96 },
      { day: 13, price: 15, number: 50, direction: BUY, fee: 0.52, t: 98 },
      { day: 23, price: 13.85, number: 50, direction: BUY, fee: 0.52, t: 99 },
      { day: 24, price: 15, number: 50, direction: SELL, fee: 0.53, t: 99 },
    ]
  }, {
    month: '202507',
    trans: [
      { day: 1, price: 16, number: 50, direction: SELL, fee: 0.53, t: 98 },
      { day: 2, price: 17, number: 50, direction: SELL, fee: 1.16, t: 94 },
      { day: 3, price: 18, number: 50, direction: SELL, fee: 1.16, t: 76 },
      { day: 7, price: 16.5, number: 50, direction: BUY, fee: 1.15, t: 100 },
      { day: 9, price: 18, number: 50, direction: SELL, fee: 1.16, t: 100 },
      { day: 10, price: 19, number: 50, direction: SELL, fee: 1.16, t: 76 },
      { day: 14, price: 20, number: 50, direction: SELL, fee: 1.16, t: 76 },
      { day: 14, price: 21.02, number: 100, direction: SELL, fee: 0, t: 70, desc: '100 * 21.02 = 2102.00 USD' },
      { day: 14, price: 21.025, number: 40, direction: SELL, fee: 0.81, t: 70, desc: '40 * 21.025 = 841.00 USD' },
      { day: 14, price: 19.9, number: 50, direction: BUY, fee: 1.15, t: 112 },
      { day: 15, price: 18.8, number: 50, direction: BUY, fee: 0.52, t: 101 },
      { day: 16, price: 20, number: 50, direction: SELL, fee: 1.16, t: 101 },
      { day: 21, price: 19, number: 50, direction: BUY, fee: 1.15, t: 102 },
      { day: 23, price: 17.485, number: 50, direction: BUY, fee: 1.15, t: 103 },
      { day: 23, price: 17, number: 50, direction: BUY, fee: 1.15, t: 104 },
    ]
  }, {
    month: '202508',
    trans: [
      { day: 1, price: 15.5, number: 50, direction: BUY, fee: 0.52, t: 105 },
      { day: 14, price: 15, number: 50, direction: BUY, fee: 1.16, t: 106 },
      { day: 18, price: 16, number: 50, direction: SELL, fee: 1.17, t: 106 },
      { day: 20, price: 15, number: 50, direction: BUY, fee: 1.16, t: 107 },
      { day: 22, price: 16.03, number: 50, direction: SELL, fee: 1.17, t: 107 },
    ]
  }, {
    month: '202509',
    trans: [
      { day: 5, price: 14.8, number: 50, direction: BUY, fee: 1.16, t: 108 },
      { day: 9, price: 16, number: 50, direction: SELL, fee: 1.17, t: 108 },
      { day: 16, price: 17, number: 50, direction: SELL, fee: 1.17, t: 105 },
      { day: 18, price: 18, number: 50, direction: SELL, fee: 1.17, t: 104 },
      { day: 18, price: 19, number: 50, direction: SELL, fee: 1.17, t: 103 },
      { day: 25, price: 16.8, number: 100, direction: BUY, fee: 1.31, t: 109 },
      { day: 25, price: 15.9, number: 50, direction: BUY, fee: 1.16, t: 110 },
      { day: 29, price: 17, number: 50, direction: SELL, fee: 1.17, t: 110 },
      { day: 29, price: 18, number: 50, direction: SELL, fee: 1.17, t: 109 },
    ]
  }, {
    month: '202510',
    trans: [
      { day: 1, price: 19.1, number: 50, direction: SELL, fee: 0.53, t: 109 },
      { day: 6, price: 20, number: 50, direction: SELL, fee: 1.17, t: 102 },
      { day: 9, price: 19.47, number: 200, direction: SELL, fee: 1.64, t: 117 },
      { day: 9, price: 19.62, number: 200, direction: SELL, fee: 1.64, t: 116 },
      { day: 9, price: 19.77, number: 200, direction: SELL, fee: 1.64, t: 111 },
      { day: 9, price: 19.60, number: 200, direction: BUY, fee: 1.61, t: 111 },
      { day: 9, price: 19.92, number: 200, direction: SELL, fee: 1.64, t: 115 },
      { day: 10, price: 21, number: 50, direction: SELL, fee: 1.17, t: 112 },
      { day: 10, price: 22, number: 120, direction: SELL, fee: 1.39, t: 113 },
      { day: 10, price: 21.4, number: 200, direction: SELL, fee: 1.64, t: 114 },
      { day: 10, price: 21.1, number: 200, direction: BUY, fee: 1.61, t: 114 },
      { day: 10, price: 21, number: 50, direction: BUY, fee: 1.16, t: 121 },
      { day: 10, price: 20, number: 50, direction: BUY, fee: 1.16, t: 122 },
      { day: 10, price: 19.55, number: 200, direction: BUY, fee: 1.61, t: 115 },
      { day: 10, price: 19.3, number: 200, direction: BUY, fee: 1.61, t: 116 },
      { day: 10, price: 19.1, number: 200, direction: BUY, fee: 1.61, t: 117 },
      { day: 14, price: 19.41, number: 200, direction: SELL, fee: 1.00, t: 118 },
      { day: 14, price: 19.05, number: 200, direction: BUY, fee: 0.97, t: 118 },
      { day: 14, price: 19.9, number: 200, direction: SELL, fee: 1.64, t: 127 },
      { day: 14, price: 20.9, number: 200, direction: SELL, fee: 1.64, t: 122 },
      { day: 14, price: 21.9, number: 200, direction: SELL, fee: 1.64, t: 121 },
      { day: 14, price: 22.4, number: 200, direction: SELL, fee: 1.64, t: 119 },
      { day: 14, price: 22.3, number: 200, direction: BUY, fee: 1.61, t: 119 },
      { day: 15, price: 23, number: 100, direction: SELL, fee: 1.33, t: 120 },
      { day: 16, price: 22, number: 50, direction: BUY, fee: 1.16 },
      { day: 16, price: 21, number: 150, direction: BUY, fee: 1.46, t: 121 },
      { day: 16, price: 20, number: 150, direction: BUY, fee: 1.46, t: 122 },
      { day: 16, price: 20, number: 150, direction: BUY, fee: 1.46, t: 123, desc: '多委托了一单' },
      { day: 16, price: 20.4, number: 150, direction: SELL, fee: 1.48, t: 123, desc: '一发现就把多委托的赶紧卖了' },
      { day: 20, price: 21, number: 50, direction: SELL, fee: 1.17, t: 125 },
      { day: 20, price: 22, number: 50, direction: SELL, fee: 1.17, t: 124 },
      { day: 20, price: 21, number: 50, direction: BUY, fee: 1.16, t: 124 },
      { day: 21, price: 19.9, number: 50, direction: BUY, fee: 1.16, t: 125 },
      { day: 22, price: 19, number: 100, direction: BUY, fee: 0.67, t: 126 },
      { day: 24, price: 20, number: 100, direction: SELL, fee: 0.69, t: 126 },
      { day: 28, price: 18.8, number: 100, direction: BUY, fee: 0.67, t: 127 },
      { day: 30, price: 18, number: 100, direction: BUY, fee: 1.31, t: 127 },
    ]
  }, {
    month: '202511',
    trans: [
      { day: 4, price: 17, number: 50, direction: BUY, fee: 1.16 },
      { day: 6, price: 15.97, number: 50, direction: BUY, fee: 0 },
      { day: 7, price: 15, number: 100, direction: BUY, fee: 0 },
    ]
  }
];

export {
  currentPrice,
  data,
};
