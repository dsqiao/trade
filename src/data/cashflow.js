import { BUY, SELL } from "./const";

const PLATFORM = {
  OKX: 0,
  BN: 1,
  AC: 2,
};
const cashflow = [ {
  month: '202307',
  record: [
    { day: 16, num: 10, cny: 71.6, platform: PLATFORM.OKX, direction: BUY },
    { day: 16, num: 50, cny: 358, platform: PLATFORM.OKX, direction: BUY },
    { day: 17, num: 40, cny: 285.6, platform: PLATFORM.OKX, direction: BUY },
    { day: 17, num: 100, cny: 714, platform: PLATFORM.OKX, direction: BUY },
    { day: 17, num: 10, cny: 70.5, platform: PLATFORM.OKX, direction: SELL },
  ]
}, {
  month: '202308',
  record: [
    { day: 4, num: 100, cny: 720, platform: PLATFORM.OKX, direction: BUY },
    { day: 17, num: 100, cny: 738, platform: PLATFORM.OKX, direction: BUY },
    { day: 18, num: 100, cny: 738, platform: PLATFORM.OKX, direction: BUY },
    { day: 22, num: 100, cny: 734, platform: PLATFORM.OKX, direction: BUY },
    { day: 22, num: 100, cny: 734, platform: PLATFORM.OKX, direction: BUY },
  ]
}, {
  month: '202309',
  record: [
    { day: 4, num: 200, cny: 1470, platform: PLATFORM.OKX, direction: BUY },
  ],
}, {
  month: '202310',
  record: [
    { day: 22, num: 41.77, cny: 306.59, platform: PLATFORM.OKX, direction: SELL, desc: '退圈' },
  ],
}, {
  month: '202311',
  record: [
    { day: 5, num: 3.01, cny: 22, platform: PLATFORM.OKX, direction: SELL, desc: '反了 3U 手续费' },
  ],
}, {
  month: '202312',
  record: [
    { day: 17, num: 200, cny: 1448, platform: PLATFORM.OKX, direction: BUY },
    { day: 24, num: 200, cny: 1442, platform: PLATFORM.OKX, direction: BUY },
  ]
}, {
  month: '202401',
  record: [
    { day: 5, num: 200, cny: 1444, platform: PLATFORM.OKX, direction: BUY },
    { day: 6, num: 200, cny: 1444, platform: PLATFORM.OKX, direction: BUY },
    { day: 6, num: 200, cny: 1442, platform: PLATFORM.OKX, direction: BUY },
    { day: 7, num: 300, cny: 2157, platform: PLATFORM.AC, direction: BUY, desc: 'cpk/figureair bn收款 | wx转账 2157' },
    { day: 10, num: 200, cny: 1440, platform: PLATFORM.BN, direction: BUY },
    { day: 10, num: 200, cny: 1440, platform: PLATFORM.BN, direction: BUY },
    { day: 11, num: 90, cny: 647.10, platform: PLATFORM.BN, direction: BUY },
    { day: 11, num: 100, cny: 719, platform: PLATFORM.AC, direction: BUY, desc: 'cpk/figureair bn收款 | wx转账 719' },
    { day: 12, num: 100, cny: 719, platform: PLATFORM.AC, direction: BUY, desc: 'cpk/figureair bn收款 | wx转账 719' },
    { day: 14, num: 210, cny: 1512, platform: PLATFORM.BN, direction: BUY },
    { day: 16, num: 200, cny: 1436, platform: PLATFORM.OKX, direction: BUY },
    { day: 25, num: 200, cny: 1446, platform: PLATFORM.BN, direction: BUY },
    { day: 28, num: 200, cny: 1442, platform: PLATFORM.BN, direction: BUY },
    { day: 29, num: 100, cny: 721, platform: PLATFORM.BN, direction: BUY },
  ]
}, {
  month: '202402',
  record: [
    { day: 5, num: 300, cny: 2148, platform: PLATFORM.BN, direction: BUY, desc: '支付宝小荷包' },
    { day: 8, num: 300, cny: 2148, platform: PLATFORM.BN, direction: BUY },
    { day: 19, num: 400, cny: 2864, platform: PLATFORM.AC, direction: BUY, desc: '宋秀莲/User-08e7a, bn 收款 | 中国银行转账 2864' },
    { day: 28, num: 200, cny: 1440, platform: PLATFORM.AC, direction: SELL, desc: 'cpk/figureair bn 转账 | wx收款 1440', }
  ]
}, {
  month: '202403',
  record: [
    { day: 1, num: 45.22, cny: 334.17, platform: PLATFORM.OKX, direction: SELL, desc: 'OKX出, 凑整' },
    { day: 2, num: 100, cny: 735, platform: PLATFORM.BN, direction: SELL, desc: '庆祝回本 所有U回流至BN 太多了 出一点' },
    { day: 5, num: 100, cny: 740, platform: PLATFORM.BN, direction: SELL, desc: '转到境外还钱' },
  ]
}, {
  month: '202405',
  record: [
    { day: 1, num: 200, cny: 1476, platform: PLATFORM.BN, direction: BUY },
    { day: 3, num: 500, cny: 3680, platform: PLATFORM.BN, direction: BUY },
    { day: 3, num: 500, cny: 3660, platform: PLATFORM.BN, direction: BUY },
    { day: 12, num: 500, cny: 3625, platform: PLATFORM.BN, direction: BUY },
    { day: 12, num: 5, cny: 36.3, platform: PLATFORM.OKX, direction: BUY },
    { day: 12, num: 275, cny: 1996.5, platform: PLATFORM.OKX, direction: BUY },
    { day: 12, num: 220, cny: 1599.4, platform: PLATFORM.OKX, direction: BUY },
    { day: 13, num: 500, cny: 3630, platform: PLATFORM.OKX, direction: BUY },
    { day: 15, num: 200, cny: 1450, platform: PLATFORM.OKX, direction: BUY },
  ]
}, {
  month: '202406',
  record: [
    { day: 1, num: 24.4, cny: 175.68, platform: PLATFORM.BN, direction: SELL, desc: '卖点 sui 还信用卡' },
    { day: 5, num: 500, cny: 3610, platform: PLATFORM.BN, direction: BUY },
    { day: 6, num: 500, cny: 3605, platform: PLATFORM.BN, direction: BUY },
    { day: 7, num: 600, cny: 4326, platform: PLATFORM.BN, direction: BUY },
    { day: 9, num: 10, cny: 72.5, platform: PLATFORM.BN, direction: BUY },
  ]
}, {
  month: '202407',
  record: [
    { day: 4, num: 500, cny: 3600, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa, bn 转账 | 中国银行转账 3600' },
    { day: 5, num: 300, cny: 2205, platform: PLATFORM.BN, direction: BUY },
    { day: 8, num: 400, cny: 2932, platform: PLATFORM.OKX, direction: BUY },
    { day: 19, num: 300, cny: 2178, platform: PLATFORM.OKX, direction: BUY },
    { day: 22, num: 700, cny: 5040, platform: PLATFORM.AC, direction: BUY, desc: '宋秀莲/thunder691, bn 转账 | 招行转账 5040' }
  ]
}, {
  month: '202409',
  record: [
    { day: 17, num: 100, cny: 708, platform: PLATFORM.OKX, direction: BUY },
    { day: 17, num: 100, cny: 709, platform: PLATFORM.BN, direction: BUY },
    { day: 20, num: 100, cny: 708, platform: PLATFORM.OKX, direction: BUY },
    { day: 21, num: 500, cny: 3470, platform: PLATFORM.OKX, direction: BUY },
  ]
}, {
  month: '202410',
  record: [
    { day: 2, num: 200, cny: 1400, platform: PLATFORM.OKX, direction: BUY },
    { day: 5, num: 200, cny: 1400, platform: PLATFORM.OKX, direction: BUY },
    { day: 6, num: 100, cny: 698, platform: PLATFORM.OKX, direction: BUY },
    { day: 17, num: 300, cny: 2106, platform: PLATFORM.OKX, direction: BUY },
    { day: 18, num: 200, cny: 1410, platform: PLATFORM.OKX, direction: BUY },
    { day: 21, num: 200, cny: 1416, platform: PLATFORM.OKX, direction: BUY },
    { day: 23, num: 100, cny: 709, platform: PLATFORM.OKX, direction: BUY },
    { day: 26, num: 1001, cny: 7057.05, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa, bn 转账 | 招行转账 7057.05' },
    { day: 28, num: 1000, cny: 7000, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa, bn 转账 | 招行转账 7000' },
    { day: 29, num: 700, cny: 4935, platform: PLATFORM.AC, direction: BUY, desc: '宋秀莲/thunder691, bn 转账 | 招行转账 4935' },
  ]
}, {
  month: '202411',
  record: [
    { day: 13, num: 1200, cny: 8640, platform: PLATFORM.AC, direction: BUY, desc: 'Leo okx 充值 1200 | wx转账 8640' },
    { day: 14, num: 100, cny: 710, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa bn 转账 | wx转账710' },
    { day: 25, num: 500, cny: 3575, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa bn 转账 | 招行转账 3575' },
    { day: 27, num: 260, cny: 1859, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa bn 转账 | wx转账 1859' },
  ]
}, {
  month: '202412',
  record: [
    { day: 5, num: 100, cny: 723, platform: PLATFORM.BN, direction: BUY },
    { day: 14, num: 200, cny: 1450, platform: PLATFORM.OKX, direction: BUY },
    { day: 14, num: 700, cny: 5075, platform: PLATFORM.OKX, direction: BUY },
    { day: 20, num: 200, cny: 1460, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/User-880fa bn转账 | wx 转账 1460' },
    { day: 29, num: 500, cny: 3635, platform: PLATFORM.OKX, direction: BUY },
    { day: 31, num: 200, cny: 1450, platform: PLATFORM.OKX, direction: BUY },
  ]
}, {
  month: '202501',
  record: [
    { day: 1, num: 200, cny: 1430, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账 | wx 转账 1430' },
    { day: 5, num: 300, cny: 2172, platform: PLATFORM.OKX, direction: BUY },
    { day: 13, num: 300, cny: 2178, platform: PLATFORM.OKX, direction: BUY },
    { day: 14, num: 300, cny: 2190, platform: PLATFORM.OKX, direction: BUY },
    { day: 14, num: 100, cny: 720, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|wx转账 720' },
    { day: 19, num: 500, cny: 3675, platform: PLATFORM.OKX, direction: BUY, desc: '3675 冲 TRUMP 啊！' },
    { day: 24, num: 300, cny: 2184, platform: PLATFORM.OKX, direction: BUY, },
    { day: 25, num: 300, cny: 2178, platform: PLATFORM.OKX, direction: BUY },
    { day: 27, num: 300, cny: 2190, platform: PLATFORM.OKX, direction: BUY },
    { day: 27, num: 500, cny: 3655, platform: PLATFORM.OKX, direction: BUY },
    { day: 31, num: 500, cny: 3665, platform: PLATFORM.OKX, direction: BUY },
  ]
}, {
  month: '202502',
  record: [
    { day: 2, num: 390, cny: 2827.5, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|wx转账 2827.5' },
    { day: 10, num: 6000, cny: 43920, platform: PLATFORM.AC, direction: BUY, desc: 'Leo okx 转账|wx 转账 43920' },
    { day: 11, num: 2600, cny: 19032, platform: PLATFORM.AC, direction: BUY, desc: 'Leo okx 转账|wx 转账 19032' },
    { day: 12, num: 700, cny: 5110, platform: PLATFORM.AC, direction: BUY, desc: '宋秀莲 BN 转账|招商银行 5110' },
    { day: 17, num: 200, cny: 1464, platform: PLATFORM.OKX, direction: BUY },
    { day: 24, num: 100, cny: 730, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|wx转账 730' },
  ]
}, {
  month: '202503',
  record: [
    { day: 3, num: 1000, cny: 7250, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|招商银行 7250' },
    { day: 9, num: 1000, cny: 7350, platform: PLATFORM.BN, direction: BUY },
    { day: 9, num: 100, cny: 725, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|wx转账 725' },
    { day: 10, num: 1000, cny: 7400, platform: PLATFORM.BN, direction: BUY },
    { day: 11, num: 300, cny: 2208, platform: PLATFORM.AC, direction: BUY, desc: 'Leo/微信 2208, 300也是钱' },
    { day: 17, num: 300, cny: 2160, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/wx 2160' },
  ]
}, {
  month: '202504',
  record: [
    { day: 4, num: 1000, cny: 7280, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|wx转账 7280' },
    { day: 18, num: 1000, cny: 7280, platform: PLATFORM.AC, direction: BUY, desc: '微信 Leo okx|wx 7280' },
  ]
}, {
  month: '202505',
  record: [
    { day: 8, num: 501, cny: 3610, platform: PLATFORM.AC, direction: BUY, desc: '张锴/微信 3610' },
    { day: 27, num: 1000, cny: 7180, platform: PLATFORM.AC, direction: BUY, desc: 'Leo/微信 7180' },
  ]
}, {
  month: '202506',
  record: [
    { day: 4, num: 600, cny: 4290, platform: PLATFORM.OKX, direction: BUY },
    { day: 5, num: 3000, cny: 21390, platform: PLATFORM.AC, direction: BUY, desc: 'Leo/微信 21390' },
    { day: 22, num: 1000, cny: 7180, platform: PLATFORM.AC, direction: BUY, desc: 'Leo/微信 7180' },
    { day: 23, num: 1000, cny: 7180, platform: PLATFORM.AC, direction: BUY, desc: 'Leo/微信 7180' },
  ]
}, {
  month: '202507',
  record: [
    { day: 5, num: 400, cny: 2840, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn转账|wx转账 2840' },
    { day: 8, num: 550, cny: 3905, platform: PLATFORM.AC, direction: BUY, desc: '张锴/微信3905' },
    { day: 11, num: 1000, cny: 7130, platform: PLATFORM.AC, direction: BUY, desc: 'Leo/微信 7130' },
    { day: 18, num: 85, cny: 600, platform: PLATFORM.AC, direction: BUY, desc: 'jyh/bn|微信 600cny', }
  ]
}, {
  month: '202508',
  record: [
    { day: 28, num: 906.1, cny: 6470, platform: PLATFORM.AC, direction: BUY, desc: '张锴/微信6470 cny' },
  ]
}, {
  month: '202509',
  record: [
    { day: 2, num: 124.5, cny: 887, platform: PLATFORM.AC, direction: BUY, desc: '张锴/微信 887 cny' },
    { day: 23, num: 1408, cny: 10000, platform: PLATFORM.AC, direction: BUY, desc: '宋秀莲/招行 10000 cny' },
  ]
}, {
  month: '202510',
  record: [
    { day: 5, num: 5000, cny: 35700, platform: PLATFORM.AC, direction: BUY, desc: 'Leo/微信 35700 cny' },
  ]
}, {
  month: '202511',
  record: [
    { day: 5, num: 1100, cny: 7865, platform: PLATFORM.OKX, direction: BUY, desc: '', },
    { day: 5, num: 1300, cny: 9321, platform: PLATFORM.BN, direction: BUY, desc: '' },
    { day: 16, num: 1000, cny: 7120, platform: PLATFORM.OKX, direction: BUY, desc: '' },
    { day: 21, num: 1000, cny: 7150, platform: PLATFORM.OKX, direction: BUY, desc: '' },
    { day: 21, num: 1000, cny: 7150, platform: PLATFORM.OKX, direction: BUY, desc: '' }
  ]
} ];

export {
  cashflow,
};