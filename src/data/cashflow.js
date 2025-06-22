import { BUY, SELL } from "./const";

const PLATFORM = {
  OKX: 0,
  BN: 1,
  AC: 2,
};
const cashflow = [ {
  month: '202307',
  record: [
    { day: 16, unitPrice: 7.16, num: 10, platform: PLATFORM.OKX, direction: BUY },
    { day: 16, unitPrice: 7.16, num: 50, platform: PLATFORM.OKX, direction: BUY },
    { day: 17, unitPrice: 7.14, num: 40, platform: PLATFORM.OKX, direction: BUY },
    { day: 17, unitPrice: 7.14, num: 100, platform: PLATFORM.OKX, direction: BUY },
    { day: 17, unitPrice: 7.05, num: 10, platform: PLATFORM.OKX, direction: SELL },
  ]
}, {
  month: '202308',
  record: [
    { day: 4, unitPrice: 7.2, num: 100, platform: PLATFORM.OKX, direction: BUY },
    { day: 17, unitPrice: 7.38, num: 100, platform: PLATFORM.OKX, direction: BUY },
    { day: 18, unitPrice: 7.38, num: 100, platform: PLATFORM.OKX, direction: BUY },
    { day: 22, unitPrice: 7.34, num: 100, platform: PLATFORM.OKX, direction: BUY },
    { day: 22, unitPrice: 7.34, num: 100, platform: PLATFORM.OKX, direction: BUY },
  ]
}, {
  month: '202309',
  record: [
    { day: 4, unitPrice: 7.35, num: 200, platform: PLATFORM.OKX, direction: BUY },
  ],
}, {
  month: '202310',
  record: [
    { day: 22, unitPrice: 7.34, num: 41.77, platform: PLATFORM.OKX, direction: SELL, desc: '退圈' },
  ],
}, {
  month: '202311',
  record: [
    { day: 5, unitPrice: 7.31, num: 3.01, platform: PLATFORM.OKX, direction: SELL, desc: '反了 3U 手续费' },
  ],
}, {
  month: '202312',
  record: [
    { day: 17, unitPrice: 7.24, num: 200, platform: PLATFORM.OKX, direction: BUY },
    { day: 24, unitPrice: 7.21, num: 200, platform: PLATFORM.OKX, direction: BUY },
  ]
}, {
  month: '202401',
  record: [
    { day: 5, unitPrice: 7.22, num: 200, platform: PLATFORM.OKX, direction: BUY },
    { day: 6, unitPrice: 7.22, num: 200, platform: PLATFORM.OKX, direction: BUY },
    { day: 6, unitPrice: 7.21, num: 200, platform: PLATFORM.OKX, direction: BUY },
    { day: 7, unitPrice: 7.19, num: 300, platform: PLATFORM.AC, direction: BUY, desc: 'cpk/figureair bn收款 | wx转账 2157' },
    { day: 10, unitPrice: 7.20, num: 200, platform: PLATFORM.BN, direction: BUY },
    { day: 10, unitPrice: 7.20, num: 200, platform: PLATFORM.BN, direction: BUY },
    { day: 11, unitPrice: 7.19, num: 90, platform: PLATFORM.BN, direction: BUY },
    { day: 11, unitPrice: 7.19, num: 100, platform: PLATFORM.AC, direction: BUY, desc: 'cpk/figureair bn收款 | wx转账 719' },
    { day: 12, unitPrice: 7.19, num: 100, platform: PLATFORM.AC, direction: BUY, desc: 'cpk/figureair bn收款 | wx转账 719' },
    { day: 14, unitPrice: 7.20, num: 210, platform: PLATFORM.BN, direction: BUY },
    { day: 16, unitPrice: 7.18, num: 200, platform: PLATFORM.OKX, direction: BUY },
    { day: 25, unitPrice: 7.23, num: 200, platform: PLATFORM.BN, direction: BUY },
    { day: 28, unitPrice: 7.21, num: 200, platform: PLATFORM.BN, direction: BUY },
    { day: 29, unitPrice: 7.21, num: 100, platform: PLATFORM.BN, direction: BUY },
  ]
}, {
  month: '202402',
  record: [
    { day: 5, unitPrice: 7.16, num: 300, platform: PLATFORM.BN, direction: BUY, desc: '支付宝小荷包' },
    { day: 8, unitPrice: 7.16, num: 300, platform: PLATFORM.BN, direction: BUY },
    { day: 19, unitPrice: 7.16, num: 400, platform: PLATFORM.AC, direction: BUY, desc: '宋秀莲/User-08e7a, bn 收款 | 中国银行转账 2864' },
    { day: 28, unitPrice: 7.20, num: 200, platform: PLATFORM.AC, direction: SELL, desc: 'cpk/figureair bn 转账 | wx收款 1440', }
  ]
}, {
  month: '202403',
  record: [
    { day: 1, unitPrice: 7.39, num: 45.22, platform: PLATFORM.OKX, direction: SELL, desc: 'OKX出, 凑整' },
    { day: 2, unitPrice: 7.35, num: 100, platform: PLATFORM.BN, direction: SELL, desc: '庆祝回本 所有U回流至BN 太多了 出一点' },
    { day: 5, unitPrice: 7.40, num: 100, platform: PLATFORM.BN, direction: SELL, desc: '转到境外还钱' },
  ]
}, {
  month: '202405',
  record: [
    { day: 1, unitPrice: 7.38, num: 200, platform: PLATFORM.BN, direction: BUY },
    { day: 3, unitPrice: 7.36, num: 500, platform: PLATFORM.BN, direction: BUY },
    { day: 3, unitPrice: 7.32, num: 500, platform: PLATFORM.BN, direction: BUY },
    { day: 12, unitPrice: 7.25, num: 500, platform: PLATFORM.BN, direction: BUY },
    { day: 12, unitPrice: 7.26, num: 5, platform: PLATFORM.OKX, direction: BUY },
    { day: 12, unitPrice: 7.26, num: 275, platform: PLATFORM.OKX, direction: BUY },
    { day: 12, unitPrice: 7.27, num: 220, platform: PLATFORM.OKX, direction: BUY },
    { day: 13, unitPrice: 7.26, num: 500, platform: PLATFORM.OKX, direction: BUY },
    { day: 15, unitPrice: 7.25, num: 200, platform: PLATFORM.OKX, direction: BUY },
  ]
}, {
  month: '202406',
  record: [
    { day: 1, unitPrice: 7.20, num: 24.4, platform: PLATFORM.BN, direction: SELL, desc: '卖点 sui 还信用卡' },
    { day: 5, unitPrice: 7.22, num: 500, platform: PLATFORM.BN, direction: BUY },
    { day: 6, unitPrice: 7.21, num: 500, platform: PLATFORM.BN, direction: BUY },
    { day: 7, unitPrice: 7.21, num: 600, platform: PLATFORM.BN, direction: BUY },
    { day: 9, unitPrice: 7.25, num: 10, platform: PLATFORM.BN, direction: BUY },
  ]
}, {
  month: '202407',
  record: [
    { day: 4, unitPrice: 7.2, num: 500, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa, bn 转账 | 中国银行转账 3600' },
    { day: 5, unitPrice: 7.35, num: 300, platform: PLATFORM.BN, direction: BUY },
    { day: 8, unitPrice: 7.33, num: 400, platform: PLATFORM.OKX, direction: BUY },
    { day: 19, unitPrice: 7.26, num: 300, platform: PLATFORM.OKX, direction: BUY },
    { day: 22, unitPrice: 7.2, num: 700, platform: PLATFORM.AC, direction: BUY, desc: '宋秀莲/thunder691, bn 转账 | 招行转账 5040' }
  ]
}, {
  month: '202409',
  record: [
    { day: 17, unitPrice: 7.08, num: 100, platform: PLATFORM.OKX, direction: BUY },
    { day: 17, unitPrice: 7.09, num: 100, platform: PLATFORM.BN, direction: BUY },
    { day: 20, unitPrice: 7.08, num: 100, platform: PLATFORM.OKX, direction: BUY },
    { day: 21, unitPrice: 6.94, num: 500, platform: PLATFORM.OKX, direction: BUY },
  ]
}, {
  month: '202410',
  record: [
    { day: 2, unitPrice: 7, num: 200, platform: PLATFORM.OKX, direction: BUY },
    { day: 5, unitPrice: 7, num: 200, platform: PLATFORM.OKX, direction: BUY },
    { day: 6, unitPrice: 6.98, num: 100, platform: PLATFORM.OKX, direction: BUY },
    { day: 17, unitPrice: 7.02, num: 300, platform: PLATFORM.OKX, direction: BUY },
    { day: 18, unitPrice: 7.05, num: 200, platform: PLATFORM.OKX, direction: BUY },
    { day: 21, unitPrice: 7.08, num: 200, platform: PLATFORM.OKX, direction: BUY },
    { day: 23, unitPrice: 7.09, num: 100, platform: PLATFORM.OKX, direction: BUY },
    { day: 26, unitPrice: 7.05, num: 1001, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa, bn 转账 | 招行转账 7057.05' },
    { day: 28, unitPrice: 7, num: 1000, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa, bn 转账 | 招行转账 7000' },
    { day: 29, unitPrice: 7.05, num: 700, platform: PLATFORM.AC, direction: BUY, desc: '宋秀莲/thunder691, bn 转账 | 招行转账 4935' },
    // { }
  ]
}, {
  month: '202411',
  record: [
    { day: 13, unitPrice: 7.2, num: 1200, platform: PLATFORM.AC, direction: BUY, desc: 'Leo okx 充值 1200 | wx转账 8640' },
    { day: 14, unitPrice: 7.1, num: 100, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa bn 转账 | wx转账710' },
    { day: 25, unitPrice: 7.15, num: 500, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa bn 转账 | 招行转账 3575' },
    { day: 27, unitPrice: 7.15, num: 260, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa bn 转账 | wx转账 1859' },
  ]
}, {
  month: '202412',
  record: [
    { day: 5, unitPrice: 7.23, num: 100, platform: PLATFORM.BN, direction: BUY },
    { day: 14, unitPrice: 7.25, num: 200, platform: PLATFORM.OKX, direction: BUY },
    { day: 14, unitPrice: 7.25, num: 700, platform: PLATFORM.OKX, direction: BUY },
    { day: 20, unitPrice: 7.30, num: 200, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa bn转账 | wx 转账 1460' },
    { day: 29, unitPrice: 7.27, num: 500, platform: PLATFORM.OKX, direction: BUY },
    { day: 31, unitPrice: 7.25, num: 200, platform: PLATFORM.OKX, direction: BUY },
  ]
}, {
  month: '202501',
  record: [
    { day: 1, unitPrice: 7.15, num: 200, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账 | wx 转账 1430' },
    { day: 5, unitPrice: 7.24, num: 300, platform: PLATFORM.OKX, direction: BUY },
    { day: 13, unitPrice: 7.26, num: 300, platform: PLATFORM.OKX, direction: BUY },
    { day: 14, unitPrice: 7.30, num: 300, platform: PLATFORM.OKX, direction: BUY },
    { day: 14, unitPrice: 7.20, num: 100, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|wx转账 720' },
    { day: 19, unitPrice: 7.35, num: 500, platform: PLATFORM.OKX, direction: BUY, desc: '3675 冲 TRUMP 啊！' },
    { day: 24, unitPrice: 7.28, num: 300, platform: PLATFORM.OKX, direction: BUY, },
    { day: 25, unitPrice: 7.26, num: 300, platform: PLATFORM.OKX, direction: BUY },
    { day: 27, unitPrice: 7.3, num: 300, platform: PLATFORM.OKX, direction: BUY },
    { day: 27, unitPrice: 7.31, num: 500, platform: PLATFORM.OKX, direction: BUY },
    { day: 31, unitPrice: 7.33, num: 500, platform: PLATFORM.OKX, direction: BUY },
  ]
}, {
  month: '202502',
  record: [
    { day: 2, unitPrice: 7.25, num: 390, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|wx转账 2827.5' },
    { day: 10, unitPrice: 7.32, num: 6000, platform: PLATFORM.AC, direction: BUY, desc: 'Leo okx 转账|wx 转账 43920' },
    { day: 11, unitPrice: 7.32, num: 2600, platform: PLATFORM.AC, direction: BUY, desc: 'Leo okx 转账|wx 转账 19032' },
    { day: 12, unitPrice: 7.3, num: 700, platform: PLATFORM.AC, direction: BUY, desc: '宋秀莲 BN 转账|招商银行 5110' },
    { day: 17, unitPrice: 7.32, num: 200, platform: PLATFORM.OKX, direction: BUY },
    { day: 24, unitPrice: 7.30, num: 100, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|wx转账 730' },
  ]
}, {
  month: '202503',
  record: [
    { day: 3, unitPrice: 7.25, num: 1000, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|招商银行 7250' },
    { day: 9, unitPrice: 7.35, num: 1000, platform: PLATFORM.BN, direction: BUY },
    { day: 9, unitPrice: 7.25, num: 100, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|wx转账 725' },
    { day: 9, unitPrice: 7.4, num: 1000, platform: PLATFORM.BN, direction: BUY },
    { day: 11, unitPrice: 7.36, num: 300, platform: PLATFORM.AC, direction: BUY, desc: 'Leo/微信 2208, 300也是钱' },
    { day: 17, unitPrice: 7.2, num: 300, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/wx 2160' },
  ]
}, {
  month: '202504',
  record: [
    { day: 4, unitPrice: 7.28, num: 1000, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|wx转账 7280' },
    { day: 18, unitPrice: 7.28, num: 1000, platform: PLATFORM.AC, direction: BUY, desc: '微信 Leo okx|wx 7280' },
  ]
}, {
  month: '202505',
  record: [
    { day: 8, unitPrice: 7.22, num: 501, platform: PLATFORM.AC, direction: BUY, desc: '张锴/微信 3610' },
    { day: 27, unitPrice: 7.18, num: 1000, platform: PLATFORM.AC, direction: BUY, desc: 'Leo/微信 7180' },
  ]
}, {
  month: '202506',
  record: [
    { day: 4, unitPrice: 7.15, num: 600, platform: PLATFORM.OKX, direction: BUY },
    { day: 5, unitPrice: 7.13, num: 3000, platform: PLATFORM.AC, direction: BUY, desc: 'Leo/微信 21390' },
    { day: 22, unitPrice: 7.18, num: 1000, platform: PLATFORM.AC, direction: BUY, desc: 'Leo/微信 7180' },
  ]
} ];

export {
  cashflow,
};