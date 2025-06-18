import { BUY, SELL } from "../const";

const walTradeData = [
  { date: '2025.6.4', digest: '2fafnYvCvLJ4Jk3Mwd3wXrV89GPkQZp2VPQhU6Yai1rw', direction: BUY, usdc: 1600, wal: 3271.396772113, gas: 0.024718334 },
  { date: '2025.6.5', digest: '4Vg1Nx6L5uexqwJEuzrgQCsexxbaYr67hnF9RKoZYGvK', direction: BUY, usdc: 500, wal: 1041.108858943, gas: -0.007583076 },
  { date: '2025.6.9', digest: 'EDuFUxXWMSVFfQ1BE8jRyqtK6t22hsL4XF5cdH3wgtpZ', direction: SELL, usdc: 527.292184, wal: 1040.000170777, gas: 0.004465584 }, 
  { date: '2025.6.9', digest: 'HwZKX3435px23TeftNjnYASoVke7dWbDjvuwJDTDFv2p', direction: SELL, usdc: 513.260825, wal: 1000.000109388, gas: 0.009163586 + 0.006226796 },
  { date: '2025.6.9', digest: 'S9ARVTgduffuCHDga1mWjNcEpYaes1Txo4Fu3uwSfAb', direction: SELL, usdc: 520.07366, wal: 1000, gas: 0.007741288 + 0.004241068 },
  { date: '2025.6.9', digest: '5nCvKR1VzT1ciZXKwC3oG1XcPzJgunNdJ4cWw2Nm5W9q', direction: SELL, usdc: 684.457692, wal: 1304.039575128, gas: 0.006370236 + 0.006226796 },
  // 清仓
  { date: '2025.6.13', digest: 'ErtJWmpLAekjGFo78mGB3pFuxQ6Dj3Jx7psdmzESWCrq', direction: BUY, usdc: 1399.884601, wal: 2992.329463626, gas: 0.016065832 },
  { date: '2025.6.18', digest: 'Co2QCa8GRkXLLghY9pTACV6udhtEsQ1n9C12rYF4QKLL', direction: BUY, usdc: 1499.99168, wal: 3397.159655836, gas: 0.009904804 }
];

export {
  walTradeData
};