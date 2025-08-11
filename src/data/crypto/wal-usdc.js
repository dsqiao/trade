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
  { date: '2025.6.18', digest: 'Co2QCa8GRkXLLghY9pTACV6udhtEsQ1n9C12rYF4QKLL', direction: BUY, usdc: 1499.99168, wal: 3397.159655836, gas: 0.009904804 },
  { date: '2025.6.21', digest: '7qBjif3iWff3VPcyJyNqRsPF2pmTL2PzoHKFCPxLc3dA', direction: BUY, usdc: 1000, wal: 2395.763730833, gas: 0.01447757 },
  { date: '2025.6.21', digest: 'Hy4tTmEjB4cHt4KbiCRm7jG9AAm2qKSZ4zYyeRDf6GkX', direction: BUY, usdc: 1000, wal: 2459.91256625, gas: 0.022225155 },
  { date: '2025.6.27', digest: '4uxhP98B6E6JCdusqcsEU77wcnvBU7D7wzzYbTHiY1aV', direction: BUY, usdc: 1000, wal: 2632.349830954, gas: 0.025691967 },
  { date: '2025.7.18', digest: '2pAeaLKWbrksxhgjaMeSTkJbm75doDfaXX4qv5q2Jpm8', direction: SELL, usdc: 2394.042201, wal: 5000, gas: 0.002866152 },
  { date: '2025.7.26', digest: '3968FwyYGZnUxby3m5FS76w9PV7eBE5EGthpWtARcufA', direction: SELL, usdc: 1973.29374, wal: 3999.999999997, gas: 0.004172232 },
  { date: '2025.7.29', digest: '8ZD8zKsrdPUxrV9rxksLETUXXN2VPVBNUNXA8CLTjXD2', direction: BUY, usdc: 1790, wal: 4015.98847966, gas: 0.012919484 },
  { date: '2025.8.1', digest: '6fcqEqNG7GBS7Y9nrHVcwCkiEQhp4LQ3L3mQZGaqTrzg', direction: BUY, usdc: 1500, wal: 3790.69699822, gas: 0.006581554 },
  { date: '2025.8.3', digest: 'GEzw5Md4ZycwXwBwzkdjXKosVAENtgzzMf4g9V1xcyU8', direction: BUY, usdc: 800.000002, wal: 2117.125470731, gas: 0.008322442 },
  { date: '2025.8.10', digest: 'F1QJhSbGoxG7wxvWt9LRLLyVFiwsEHvCkKBoYJaBVsQs', direction: SELL, usdc: 866.066375, wal: 2116.999999999, gas: 0.00772774 },
];

export {
  walTradeData
};