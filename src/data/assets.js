const AssetName = {
  BINANCE: 'Binance',
  OKX: 'OKX',
  SUI: 'Sui Chain',
  SOLANA: 'Solana Chain',
  LONG_BRIDGE: 'Long Bridge',
  BOCHK: 'Bank of China, Hong Kong',
  BOC: 'Bank of China',
};

const AssetCurrency = {
  USD: 'usd',
  CNY: 'cny'
};

const AssetCategory = [
  { name: AssetName.BINANCE, currency: AssetCurrency.USD },
  { name: AssetName.OKX, currency: AssetCurrency.USD },
  { name: AssetName.BOCHK, currency: AssetCurrency.USD },
  { name: AssetName.SUI, currency: AssetCurrency.USD },
  { name: AssetName.SOLANA, currency: AssetCurrency.USD },
  { name: AssetName.LONG_BRIDGE, currency: AssetCurrency.USD },
  { name: AssetName.BOC, currency: AssetCurrency.CNY },
];
const data = [ {
  date: '2025-10-01 05:10',
  exchangeRate: 7.14,
  [AssetName.BINANCE]: 25685.5,
  [AssetName.SUI]: 79708.68,
  [AssetName.SOLANA]: 48.14,
  [AssetName.LONG_BRIDGE]: 77779.74,
  [AssetName.BOCHK]: 100.08,
  [AssetName.BOC]: 59266.69,
}, {
  date: '2025-10-02 04:11',
  exchangeRate: 7.14,
  [AssetName.BINANCE]: 26344.9,
  [AssetName.SUI]: 85777.25,
  [AssetName.SOLANA]: 50.29,
  [AssetName.LONG_BRIDGE]: 78425.03,
  [AssetName.BOCHK]: 100.08,
  [AssetName.BOC]: 59266.69,
}, {
  date: '2025-10-03 04:54',
  exchangeRate: 7.14,
  [AssetName.BINANCE]: 26398.36,
  [AssetName.SUI]: 88014.29,
  [AssetName.LONG_BRIDGE]: 79239.45,
  [AssetName.SOLANA]: 53.06,
  [AssetName.BOCHK]: 100.08,
  [AssetName.BOC]: 56238.63,
}, {
  date: '2025-10-04 04:03',
  exchangeRate: 7.14,
  [AssetName.BINANCE]: 26487.29,
  [AssetName.SUI]: 89894.50,
  [AssetName.LONG_BRIDGE]: 79238.07,
  [AssetName.SOLANA]: 53.05,
  [AssetName.BOCHK]: 100.08,
  [AssetName.BOC]: 56238.63,
}, {
  date: ' Sun 2025-10-05 05:46',
  exchangeRate: 7.14,
  [AssetName.BINANCE]: 26541.98,
  [AssetName.SOLANA]: 52.08,
  [AssetName.SUI]: 89172.22,
  [AssetName.LONG_BRIDGE]: 79273.50,
  [AssetName.BOCHK]: 100.08,
  [AssetName.BOC]: 56238.63,
} ];

for (const item of data) {
  let usdTotal = 0;
  let cnyTotal = 0;
  for (const asset of AssetCategory) {
    const name = asset.name;
    if (item[name]) { // 该资产留有余额
      if (asset.currency === AssetCurrency.USD) usdTotal += item[name];
      else if (asset.currency === AssetCurrency.CNY) cnyTotal += item[name];
    }
  }
  console.log(`${item.date} usd: ${usdTotal.toFixed(2)}, cny: ${cnyTotal.toFixed(2)}, total: ${(usdTotal * item.exchangeRate + cnyTotal).toFixed(2)}`);
}

export { data, AssetCategory, AssetCurrency, AssetName };
// node src/data/assets.js