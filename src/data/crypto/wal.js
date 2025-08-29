import { BUY, SELL } from "../const";

const data = [
  { timestamp: 1749067961237, digest: '2fafnYvCvLJ4Jk3Mwd3wXrV89GPkQZp2VPQhU6Yai1rw', direction: BUY, u: 1600, coin: 3271.396772113, fee: 0.024718334, t: 2 },
  { timestamp: 1749151291457, digest: '4Vg1Nx6L5uexqwJEuzrgQCsexxbaYr67hnF9RKoZYGvK', direction: BUY, u: 500, coin: 1041.108858943, fee: -0.007583076, t: 1 },
  { timestamp: 1749467069432, digest: 'EDuFUxXWMSVFfQ1BE8jRyqtK6t22hsL4XF5cdH3wgtpZ', direction: SELL, u: 527.292184, coin: 1040.000170777, fee: 0.004465584, t: 1 }, 
  { timestamp: 1749482914870, digest: 'HwZKX3435px23TeftNjnYASoVke7dWbDjvuwJDTDFv2p', direction: SELL, u: 513.260825, coin: 1000.000109388, fee: 0.009163586 + 0.006226796, t: 2 },
  { timestamp: 1749490827477, digest: 'S9ARVTgduffuCHDga1mWjNcEpYaes1Txo4Fu3uwSfAb', direction: SELL, u: 520.07366, coin: 1000, fee: 0.007741288 + 0.004241068, t: 2 },
  { timestamp: 1749498416782, digest: '5nCvKR1VzT1ciZXKwC3oG1XcPzJgunNdJ4cWw2Nm5W9q', direction: SELL, u: 684.457692, coin: 1304.039575128, fee: 0.006370236 + 0.006226796, t: 2, des: '清仓' },
  // 清仓
  { timestamp: 1749845127315, digest: 'ErtJWmpLAekjGFo78mGB3pFuxQ6Dj3Jx7psdmzESWCrq', direction: BUY, u: 1399.884601, coin: 2992.329463626, fee: 0.016065832 },
  { timestamp: 1750183281618, digest: 'Co2QCa8GRkXLLghY9pTACV6udhtEsQ1n9C12rYF4QKLL', direction: BUY, u: 1499.99168, coin: 3397.159655836, fee: 0.009904804 },
  { timestamp: 1750438374701, digest: '7qBjif3iWff3VPcyJyNqRsPF2pmTL2PzoHKFCPxLc3dA', direction: BUY, u: 1000, coin: 2395.763730833, fee: 0.01447757 },
  { timestamp: 1750517823329, digest: 'Hy4tTmEjB4cHt4KbiCRm7jG9AAm2qKSZ4zYyeRDf6GkX', direction: BUY, u: 1000, coin: 2459.91256625, fee: 0.022225155, t: 5 },
  { timestamp: 1750992013846, digest: '4uxhP98B6E6JCdusqcsEU77wcnvBU7D7wzzYbTHiY1aV', direction: BUY, u: 1000, coin: 2632.349830954, fee: 0.025691967, t: 5 },
  { timestamp: 1752815514290, digest: '2pAeaLKWbrksxhgjaMeSTkJbm75doDfaXX4qv5q2Jpm8', direction: SELL, u: 2394.042201, coin: 5000, fee: 0.002866152, t: 5 },
  { timestamp: 1753550000944, digest: '3968FwyYGZnUxby3m5FS76w9PV7eBE5EGthpWtARcufA', direction: SELL, u: 1973.29374, coin: 3999.999999997, fee: 0.004172232, t: 6 },
  { timestamp: 1753727857592, digest: '8ZD8zKsrdPUxrV9rxksLETUXXN2VPVBNUNXA8CLTjXD2', direction: BUY, u: 1790, coin: 4015.98847966, fee: 0.012919484, t: 6 },
  { timestamp: 1754018827024, digest: '6fcqEqNG7GBS7Y9nrHVcwCkiEQhp4LQ3L3mQZGaqTrzg', direction: BUY, u: 1500, coin: 3790.69699822, fee: 0.006581554, t: 4 },
  { timestamp: 1754212316246, digest: 'GEzw5Md4ZycwXwBwzkdjXKosVAENtgzzMf4g9V1xcyU8', direction: BUY, u: 800.000002, coin: 2117.125470731, fee: 0.008322442, t: 3 },
  { timestamp: 1754816259755, digest: 'F1QJhSbGoxG7wxvWt9LRLLyVFiwsEHvCkKBoYJaBVsQs', direction: SELL, u: 866.066375, coin: 2116.999999999, fee: 0.00772774, t: 3 },
  { timestamp: 1755081040626, digest: 'EjERHva39SZpadqriDda9gPmYCKreYfuD7DSxaNQz6ST', direction: SELL, u: 1757.137527, coin: 3790, fee: 0.017376594, t: 4 },
  { timestamp: 1755101340822, digest: 'EYLLSPGi3xLMp3FnFLCd8w6eX4swJhMGgfzipBuFYM2t', direction: BUY, u: 500, coin: 1105.431174484, fee: 0.015533092, t: 7 },
  { timestamp: 1755138682213, digest: 'CoaVaaKVJ4EsPCuSGSJsXg3nJVWRJjJABeFbnZsMQUaD', direction: SELL, u: 512.356225, coin: 1105, fee: 0, t: 7 }, // astros
  { timestamp: 1756455508079, digest: '8vogD8XbUo6CcjCt8HpST9CHd421Lo1M2tT5phj8hP7k', direction: BUY, u: 1000, coin: 2566.770641954, fee: 0.017763035 },
];

export {
  data,
};