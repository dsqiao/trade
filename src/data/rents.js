const data = [
  { month: '2023-04', mount: 4160, desc: '押金' },
  { month: '2023-05', mount: 1969, desc: '5月租金' },
  { month: '2023-06', mount: 2306.50, desc: '5月水电+6月租金' },
  { month: '2023-07', mount: 2300.50, desc: '6月水电+7月租金' },
  { month: '2023-08', mount: 2302, desc: '7月水电+8月租金' },
  { month: '2023-09', mount: 2321.50, desc: '8月水电+9月租金' },
  { month: '2023-10', mount: 2268.46, desc: '9月水电+10月租金' },
  { month: '2023-11', mount: 2116, desc: '10月水电+11月租金' },
  { month: '2023-12', mount: 2101, desc: '11月水电+12月租金' },
  { month: '2024-01', mount: 2147.50, desc: '' },
  { month: '2024-02', mount: 2131, desc: '' },
  { month: '2024-03', mount: 2194, desc: '' },
  { month: '2024-04', mount: 2125, desc: '' },
  { month: '2024-05', mount: 2078.50, desc: '' },
  { month: '2024-06', mount: 2057.50, desc: '' },
  { month: '2024-07', mount: 2025.50, desc: '' },
  { month: '2024-08', mount: 1978, desc: '' },
  { month: '2024-09', mount: 2074.50, desc: '' },
  { month: '2024-10', mount: 2012, desc: '' },
  { month: '2024-11', mount: 1992, desc: '' },
  { month: '2024-12', mount: 1991, desc: '宁波银行信用卡' },
  { month: '2025-01', mount: 1999, desc: '' },
  { month: '2025-02', mount: 2005, desc: '' },
  { month: '2025-03', mount: 1977, desc: '' },
  { month: '2025-04', mount: 2006, desc: '' },
  { month: '2025-05', mount: 1998, desc: '' },
  { month: '2025-06', mount: 1985, desc: '' },
  { month: '2025-07', mount: 1933, desc: '' },
  { month: '2025-08', mount: 1903, desc: '' },
  { month: '2025-09', mount: 1912, desc: '' },
  { month: '2025-10', mount: 1914, desc: '' },
];

// 2023年4月到2024年9月的租金总计：  30500.00
let sum = 0;
data.forEach(item => {
  sum += item.mount;
});
console.log('总计：', sum.toFixed(3));

export {
  data
};