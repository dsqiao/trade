import { BUY, SELL } from "../const";

const deepTradeData = [
  { date: '2025.3.9', digest: 'GbtZH6sWcvpsPJPtR1Z58TQUff3y253H6my9sdKzkn8r', direction: BUY, deep: 13739.661339, sui: 500.000004248, gas: 0.01943382, t: '15' },
  { date: '2025.3.9', digest: 'CAkvqUt1AWMQDndcvu6yvTGkWHSnPB3i9Mt97L7ft1CG', direction: BUY, deep: 14012.660319, sui: 500, gas: 0.00352034, t: '14' },
  { date: '2025.3.11', digest: 'GntASenaq8WVQLPKUjhe9yLs1tYqTCKYJ6w7BjtH2TYR', direction: BUY, deep: 15057.522011, sui: 500.000000002, gas: 0.015839532, t: '1' },
  { date: '2025.3.11', digest: 'F9R9jYaSeaYS2jaLNij5x3Tn95SQdBG6XCELkwK8wR99', direction: BUY, deep: 15698.087528, sui: 500.000000002, gas: 0.024860168, t: '2' },
  { date: '2025.3.12', digest: '6Q6AphNXsuj1JShJeoX6mLW4CuSgcKrzApjTcEcwBFa1', direction: SELL, deep: 15000.00073, sui: 552.604131908, gas: 0.018902, t: '2' },
  { date: '2025.3.13', digest: 'GQw5oGbke1LgYKuqytPNNHHj7EBAwqkiCYXmKS7JbkDy', direction: SELL, deep: 13000.000316, sui: 513.006263213, gas: 0.02019666, t: '1' },
  { date: '2025.3.20', digest: '6ZKp98vKjpU3uDPdLRiJsjV2diVLiNZSSdSAKzDQvTC9', direction: BUY, deep: 14860.222211, sui: 500.000003753, gas: -0.063492445, t: '3' },
  { date: '2025.3.22', digest: '6foSejarYvrYgJZ5sjrpexE1s6meFzMoyTZ4vmiNgSJ7', direction: SELL, deep: 14850.000498, sui: 527.476780029, gas: 0.019566132, t: '3' },
  { date: '2025.3.27', digest: 'GknnQzSHdA9RsQr3w77e1W4Ea2NY9ua7XyTEeYjpYySb', direction: BUY, deep: 15032.834743, sui: 500, gas: 0.0113386, t: '13' },
  { date: '2025.3.27', digest: 'AnQDSMjmFtWKwg5eskPFd7tYVM4T49iHNdnZf9qJGctE', direction: BUY, deep: 16206.75274, sui: 500.000005169, gas: 0.021700742, t: '4'},
  { date: '2025.3.27', digest: '5wnBPNhd5wwrK57hmZSwGpZ3YzhnnXkhPfvWC8AYGHki', direction: SELL, deep: 16200.000392, sui: 510.261767093, gas: 0.031571004, t: '4' },
  { date: '2025.3.27', digest: 'gCoLtWCRq1bAEQwThX8affHjgLMXziBr3oMLQqYdsrk', direction: BUY, deep: 16224.420798, sui: 500.000004528, gas: 0.013224336, t: '12' },
  { date: '2025.3.27', digest: '8kkoV3jdBJmrWtCNwZ1HZWzicHAaed9nmRmiKbSYUaW6', direction: BUY, deep: 17165.887611, sui: 500.000004096, gas: 0.01790474, t: '5' },
  { date: '2025.3.27', digest: 'CwcUcU5PsdXvBNKLaG96o6JGiooHy8wxBiRTR6yQmb6N', direction: SELL, deep: 17165.000697, sui: 511.971553611, gas: 0.022024884, t: '5' },
  { date: '2025.3.28', digest: 'FoUnTyowe4ZBMM7bngFTYftcsGrzaFrz8Ri1FvHvn3QZ', direction: BUY, deep: 17131.6122, sui: 500.000006247, gas: 0.021727177, t: '11' },
  { date: '2025.3.31', digest: '7wP1QCFtkMgPWeFFbgEc3xQ2R2GWnMCEo1oSE7zU3iLp', direction: BUY, deep: 18358.886112, sui: 500.000004781, gas: -0.013911185, t: '6' },
  { date: '2025.4.1', digest: 'DJw8x2W6sajWruSsLx3Z7Bu1R4smWKD1oXr6M5gMkFES', direction: SELL, deep: 18358.001124, sui: 524.943169401, gas: 0.021922512, t: '6' },
  { date: '2025.4.3', digest: 'BsEWtVVDhmbr96vGUZpWFRZVoC4iWfkAQL5vfTSfHu3i', direction: BUY, deep: 19106.282154, sui: 500.000004345, gas: 0.020866523, t: '7' },
  { date: '2025.4.4', digest: '6ysQ1D7pSvvyXcdZybN1sqh2wbpZ1ZgRAZyvdUZX38Ft', direction: SELL, deep: 19106.001702, sui: 523.272830243, gas: 0.026798172, t: '7' },
  { date: '2025.4.4', digest: 'BktN6dHLvDnFzTKPNyjiH5TVTzfUhtNYqGd3Rd2mSTDK', direction: BUY, deep: 19125.392768, sui: 500.000009552, gas: 0.024510496, t: '8' },
  { date: '2025.4.5', digest: '4LTb6JzSi4M3BECKQLFrD6NtU79MQAc1WnMFus8ZRHBG', direction: SELL, deep: 19125.000927, sui: 528.089425619, gas: 0.022014624, t: '8' },
  { date: '2025.4.5', digest: '2ioNfjkRkzKvsm1mLE3jbJ6Aefn4JN1xJf6Vj28FLGK7', direction: BUY, deep: 19153.379847, sui: 500.000008878, gas: 0.023589802,t : '9' },
  { date: '2025.4.6', digest: '9PJucePjzR5zBb3FuayS4KdVo4zJNPJoaPt5Wy1yQYFD', direction: SELL, deep: 19153.000901, sui: 520.341991563, gas: 0.019969768, t: '9' },
  { date: '2025.4.9', digest: '7yAf8h6RpyjLQh4nwvksANJKBaeAAAYX65b6FDBKEyh3', direction: BUY, deep: 20210.839814, sui: 500.000004443, gas: 0.02276208, t: '10' },
  { date: '2025.4.9', digest: 'ZzHYxdTvZdo9pc5F7Efde4sKro3Uhw59n4B82XfNCut', direction: SELL, deep: 20210.002105, sui: 513.286644839, gas: 0.02227424, t: '10' },
  { date: '2025.4.12', digest: 'BkviQnpfuPWeEA8C9drwV3m2U8Lg4JRkADVsiJQfsacA', direction: SELL, deep: 17131.00069, sui: 528.194978312, gas: 0.02227424, t: '11' },
  { date: '2025.4.15', digest: 'DZUfRQxzcZFsRjJcTTYqzrFw28BbKFZpNhgUoEdrkxEK', direction: SELL, deep: 16000.000926, sui: 571.023310004, gas: 0.02227424, t: '12'},
  { date: '2025.4.16', digest: '83ekhc5iY6PXqJMm8ka64dTpc3SMPqdE9KewgcwVZs5', direction: SELL, deep: 15000.000897, sui: 614.153882866, gas: 0.026080244, t: '13'},
  { date: '2025.4.22', digest: '3gu8PHhQHDqExHDe5hUh7BA7g5Ri2ChaJVhpyhSyvqq3', direction: SELL, deep: 14000.000336, sui: 928.283900135, gas: 0.081698914, t: '14'},
  { date: '2025.4.22', digest: 'GbDSEJwDvJBtUzwGhNXWhQPjcy8QjfxQJsnNFyKenRSm', direction: SELL, deep: 13000.000491, sui: 739.709583809, gas: 0.028807044, t: '15'},
];

export {
  deepTradeData,
};