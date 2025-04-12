const SELL = 0;
const BUY = 1;
const direction = {
  SELL: 0,
  BUY: 1,
};
const deepTradeData = [
  { date: '2025.2.24', digest: 'GbtZH6sWcvpsPJPtR1Z58TQUff3y253H6my9sdKzkn8r', direction: BUY, deep: 10300.034878, sui: 1500.000141, gas: 0.020188604 },
  { date: '2025.2.25', digest: 'CAkvqUt1AWMQDndcvu6yvTGkWHSnPB3i9Mt97L7ft1CG', direction: BUY, deep: 3593.238095, sui: 500.000011, gas: 0.035215102 },
  { date: '2025.2.26', digest: 'GntASenaq8WVQLPKUjhe9yLs1tYqTCKYJ6w7BjtH2TYR', direction: BUY, deep: 3615.408791, sui: 500.000011, gas: 0.012512876 },
  { date: '2025.2.26', digest: 'F9R9jYaSeaYS2jaLNij5x3Tn95SQdBG6XCELkwK8wR99', direction: BUY, deep: 5846.648507, sui: 796.992668, gas: 0.01174646 },
  { date: '2025.3.2', digest: '6Q6AphNXsuj1JShJeoX6mLW4CuSgcKrzApjTcEcwBFa1', direction: SELL, deep: 6000.000098, sui: 965.417151, gas: 0.016136456, t: '1' },
  { date: '2025.3.3', digest: 'GQw5oGbke1LgYKuqytPNNHHj7EBAwqkiCYXmKS7JbkDy', direction: SELL, deep: 6019.684257, sui: 889.000022, gas: 0.014325372, t: '1' },
  { date: '2025.3.9', digest: '6ZKp98vKjpU3uDPdLRiJsjV2diVLiNZSSdSAKzDQvTC9', direction: BUY, deep: 10435.308309, sui: 999.148636, gas: 0.027615338 },
  { date: '2025.3.9', digest: '6foSejarYvrYgJZ5sjrpexE1s6meFzMoyTZ4vmiNgSJ7', direction: SELL, deep: 1982.652359, sui: 176.441557, gas: 0.002788424 },
  { date: '2025.3.9', digest: 'GknnQzSHdA9RsQr3w77e1W4Ea2NY9ua7XyTEeYjpYySb', direction: BUY, deep: 12068.811925, sui: 999.9, gas: 0.012357888 },
  { date: '2025.3.11', digest: 'AnQDSMjmFtWKwg5eskPFd7tYVM4T49iHNdnZf9qJGctE', direction: BUY, deep: 3850.565822, sui: 300, gas: 0.000754548, desc: '300u -> 140sui', t: '2' },
  { date: '2025.3.15', digest: '5wnBPNhd5wwrK57hmZSwGpZ3YzhnnXkhPfvWC8AYGHki', direction: SELL, deep: 3850.000101, sui: 372.217585, gas: 0.014967876, t: '2' },
  { date: '2025.3.15', digest: 'gCoLtWCRq1bAEQwThX8affHjgLMXziBr3oMLQqYdsrk', direction: BUY, deep: 5000.000168, sui: 503.867496, gas: 0.018530508, t: '3' },
  { date: '2025.3.16', digest: '8kkoV3jdBJmrWtCNwZ1HZWzicHAaed9nmRmiKbSYUaW6', direction: BUY, deep: 5029.394461, sui: 450.000019, gas: 0.046028446, t: '3' },
  { date: '2025.3.18', digest: 'CwcUcU5PsdXvBNKLaG96o6JGiooHy8wxBiRTR6yQmb6N', direction: SELL, deep: 5005.291945, sui: 405.000015, gas: -0.020102078, t: '4' },
  { date: '2025.3.22', digest: 'FoUnTyowe4ZBMM7bngFTYftcsGrzaFrz8Ri1FvHvn3QZ', direction: BUY, deep: 5000.000156, sui: 431.972515, gas: 0.018496724, t: '4' },
  { date: '2025.3.24', digest: '7wP1QCFtkMgPWeFFbgEc3xQ2R2GWnMCEo1oSE7zU3iLp', direction: BUY, deep: 5000.000184, sui: 450.424348, gas: 0.01741838, t: '5' },
  { date: '2025.3.28', digest: 'DJw8x2W6sajWruSsLx3Z7Bu1R4smWKD1oXr6M5gMkFES', direction: SELL, deep: 5026.301448, sui: 400.000013, gas: 0.046275354, t: '5' },
  { date: '2025.3.29', digest: 'BsEWtVVDhmbr96vGUZpWFRZVoC4iWfkAQL5vfTSfHu3i', direction: BUY, deep: 7154.84655, sui: 500.000013, gas: 0.015108752 },
  { date: '2025.3.31', digest: '6ysQ1D7pSvvyXcdZybN1sqh2wbpZ1ZgRAZyvdUZX38Ft', direction: SELL, deep: 8357.230611, sui: 500.000038, gas: -0.224597815, t: '6' },
  { date: '2025.4.1', digest: 'BktN6dHLvDnFzTKPNyjiH5TVTzfUhtNYqGd3Rd2mSTDK', direction: BUY, deep: 8357.000484, sui: 576.42769, gas: 0.02500304, t: '6' },
  { date: '2025.4.3', digest: '4LTb6JzSi4M3BECKQLFrD6NtU79MQAc1WnMFus8ZRHBG', direction: SELL, deep: 8503.521521, sui: 500.000029, gas: -0.009194036, t: '10' },
  { date: '2025.4.6', digest: '2ioNfjkRkzKvsm1mLE3jbJ6Aefn4JN1xJf6Vj28FLGK7', direction: BUY, deep: 8804.695563, sui: 500.000022, gas: -0.228967228, t: '9' },
  { date: '2025.4.6', digest: '9PJucePjzR5zBb3FuayS4KdVo4zJNPJoaPt5Wy1yQYFD', direction: SELL, deep: 9475.531756, sui: 500.000024, gas: 0.014483164, t: '8' },
  { date: '2025.4.7', digest: '7yAf8h6RpyjLQh4nwvksANJKBaeAAAYX65b6FDBKEyh3', direction: BUY, deep: 5356.647047, sui: 268.692098, gas: 0.015470936, t: '7' },
  { date: '2025.4.9', digest: 'ZzHYxdTvZdo9pc5F7Efde4sKro3Uhw59n4B82XfNCut', direction: SELL, deep: 5356.000258, sui: 305.919651, gas: 0.02170046, t: '7' },
];

export {
  direction,
  deepTradeData,
};