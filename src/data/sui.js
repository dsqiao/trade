const SuiToUsdc = 0;
const UsdcToSui = 1;
const direction = {
  SuiToUsdc: 0,
  UsdcToSui: 1,
}
const SELL = SuiToUsdc
const suiTradeData = [
  { digest: 'AKjgSJtp3m6EmWv4QMyn7RqV1vqdntRBNZ9JahVNcASW', direction: SuiToUsdc, sui: 1000.006227092, usdc: 4346},
  { digest: 'EFvBDYsRq5xuHbBCib126Tsqn3Dsosd4EQ8Mykw3aBgJ', direction: UsdcToSui, sui: 1007.311626443, usdc: 4300 },
  { digest: 'DjLNFJ3geif2oQTfTpeAJShqu3T5urwjLkdXiXP68ugv', direction: SuiToUsdc, sui: 1000.004184896, usdc: 4275.0276 },
  { digest: 'Fd18VVTChDFSw6ysv2RfT4bsvWYZk7f6azBest97CVh2', direction: UsdcToSui, sui: 1005.400903906, usdc: 4269.735 },
  { digest: '4HBt2CEy3wCNSmZnjh8T1t1LADqaAEMvzRrSXGWKJUcV', direction: UsdcToSui, sui: 11.983510807, usdc: 50 },
  { digest: '8PRNsvqP9LpeFaZdEZxkX9pku2yYzrqJq1u4SEe3sME7', direction: SuiToUsdc, sui: 11.983422768, usdc: 50.758854 },
  { digest: 'BbeonZNQ7WnbHFU4z8z6JCFb1iND2uvUmgk3wdvLkvPD', direction: SELL, sui: 300.011030724, usdc: 1297.14390 },
]

export {
  direction,
  suiTradeData,
}