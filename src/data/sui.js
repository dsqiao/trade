const SELL = 0;
const BUY = 1;
const direction = {
  SELL: 0,
  BUY: 1,
}
const suiTradeData = [
  { digest: 'AKjgSJtp3m6EmWv4QMyn7RqV1vqdntRBNZ9JahVNcASW', direction: SELL, sui: 1000.006227092, usdc: 4346, t: '1' },
  { digest: 'EFvBDYsRq5xuHbBCib126Tsqn3Dsosd4EQ8Mykw3aBgJ', direction: BUY, sui: 1007.311626443, usdc: 4300, t: '1' },
  { digest: 'DjLNFJ3geif2oQTfTpeAJShqu3T5urwjLkdXiXP68ugv', direction: SELL, sui: 1000.004184896, usdc: 4275.0276, t: '2' },
  { digest: 'Fd18VVTChDFSw6ysv2RfT4bsvWYZk7f6azBest97CVh2', direction: BUY, sui: 1005.400903906, usdc: 4269.735, t: '2' },
  { digest: '4HBt2CEy3wCNSmZnjh8T1t1LADqaAEMvzRrSXGWKJUcV', direction: BUY, sui: 11.983510807, usdc: 50, t: '3' },
  { digest: '8PRNsvqP9LpeFaZdEZxkX9pku2yYzrqJq1u4SEe3sME7', direction: SELL, sui: 11.983422768, usdc: 50.758854, t: '3' },
  { digest: 'BbeonZNQ7WnbHFU4z8z6JCFb1iND2uvUmgk3wdvLkvPD', direction: SELL, sui: 300.011030724, usdc: 1297.143905, t: '7' },
  { digest: 'Czpk3DHnZFeNn8XawXuQmFTJ4isuCEKfCmRuFdC3jBP8', direction: SELL, sui: 300.006073364, usdc: 1310.140771, t: '4' },
  { digest: '5q4z2pxCX6hUqxq2NgwHXxc6YDnge1WLHfSNoP3Gtm4Y', direction: BUY, sui: 300.941942388, usdc: 1300, t: '4' },
  { digest: 'GGAqmBsW3v81FM63xwbVUPm2xMsw3DkJU4cEvXDmmZpN', direction: SELL, sui: 300.015812732, usdc: 1306.891448, t: '6' },
  { digest: '2zDfZ3aNk8oTcmpoUfSK6x6UMb3V2ZhtQL6gs74VbJaw', direction: SELL, sui: 300.005240752, usdc: 1329.63248, t: '5' },
  { digest: '4td7oaamTtb6AtTumHdkqnn3C4E5itZY8Th9XGY9MdNY', direction: BUY, sui: 299.586900332, usdc: 1320, t: '5' },
  { digest: '4y7cqSRU1R5agz2ds7EroArpw8odpEJrAj4EYsA9wkRa', direction: BUY, sui: 300.064195511, usdc: 1299.613, t: '6' },
  { digest: 'B7NXSet4bWZbg6i7mr955mqESbk8ws51tPxoxEghUE2D', direction: BUY, sui: 300.425557383, usdc: 1290, t: '7' },
  { digest: 'A663WaK9e8PngeEMTKpNryNf3QBtTDfD3YeJjJaagEDN', direction: SELL, sui: 300.004989224, usdc: 1304.614388, t: '8' },
  { digest: '5VSYWvgWxFt8edS13UCxbG7K5uUJQYECs5kmVyMzpFWH', direction: BUY, sui: 300.300497912, usdc: 1285, t: '8' },
  { digest: '44nfHBTskudzgxpmTk6Wo2gYHtUye56YpTbvTddyuB8F', direction: BUY, sui: 23.623625283, usdc: 100, t: '9' },
  { digest: 'BpTk7w3BhJQJeELQqL1fMRak8mvPxQgpio2QBAK5r3se', direction: SELL, sui: 23.710794148, usdc: 101.484083, t: '9' },
  { digest: 'Hjdi6a5Froj1QbRyFSHSwddyHbNzmkYfmBK3uH8cq5oh', direction: SELL, sui: 300.00243176, usdc: 1296.2426, t: '10' },
  { digest: 'H7nANjAawSnYfeNDG2Eh4fgFZnTmNoHqx4kLUVteVjmu', direction: BUY, sui: 297.592281089, usdc: 1275, t: '10' },
  { digest: 'FopUrAS5c5ND5n9NFsARRQ3L51mncv7qaLCHX2QJEJTu', direction: SELL, sui: 300.005060924, usdc: 1310.573766, t: '11' },
  { digest: 'GuBBaXFgKz35L2GkHzW2MwhMv4cv6m2HAKGMArQnFAGq', direction: BUY, sui: 300.119651092, usdc: 1299.6472, t: '11' },
]

export {
  direction,
  suiTradeData,
}