const data = [
  { month: '2023-04', amount: 4160, desc: '押金' },
  { month: '2023-05', amount: 1969, desc: '5月租金' },
  { month: '2023-06', amount: 2306.50, desc: '5月水电+6月租金' },
  { month: '2023-07', amount: 2300.50, desc: '6月水电+7月租金' },
  { month: '2023-08', amount: 2302, desc: '7月水电+8月租金' },
  { month: '2023-09', amount: 2321.50, desc: '8月水电+9月租金' },
  { month: '2023-10', amount: 2268.46, desc: '9月水电+10月租金' },
  { month: '2023-11', amount: 2116, desc: '10月水电+11月租金' },
  { month: '2023-12', amount: 2101, desc: '11月水电+12月租金' },
  { month: '2024-01', amount: 2147.50, desc: '' },
  { month: '2024-02', amount: 2131, desc: '' },
  { month: '2024-03', amount: 2194, desc: '' },
  { month: '2024-04', amount: 2125, desc: '' },
  { month: '2024-05', amount: 2078.50, desc: '' },
  { month: '2024-06', amount: 2057.50, desc: '' },
  { month: '2024-07', amount: 2025.50, desc: '' },
  { month: '2024-08', amount: 1978, desc: '' },
  { month: '2024-09', amount: 2074.50, desc: '' },
  { month: '2024-10', amount: 2012, desc: '' },
  { month: '2024-11', amount: 1992, desc: '' },
  { month: '2024-12', amount: 1991, desc: '宁波银行信用卡' },
  { month: '2025-01', amount: 1999, desc: '' },
  { month: '2025-02', amount: 2005, desc: '' },
  { month: '2025-03', amount: 1977, desc: '' },
  { month: '2025-04', amount: 2006, desc: '' },
  { month: '2025-05', amount: 1998, desc: '' },
  { month: '2025-06', amount: 1985, desc: '' },
  { month: '2025-07', amount: 1933, desc: '' },
  { month: '2025-08', amount: 1903, desc: '' },
  { month: '2025-09', amount: 1912, desc: '' },
  { month: '2025-10', amount: 1914, desc: '' },
];

const data2 = [
  { month: '2024-09', amount: 2484.92, desc: '企鹅公寓押金' },
];

let sum = 0;
data.forEach(item => sum += item.amount);
data2.forEach(item => sum += item.amount);
console.log('总计：', sum.toFixed(3));

export {
  data
};

// node src/data/rents.js