// 各币种「当前价」的兜底值（fallback）
// 正常展示用 Binance 实时行情（见 src/utils/cryptoPrice.js）；
// 仅当实时接口取不到时（如网络受限）才回退到这里的值。
// 无需频繁维护，留一个大致价格即可。
export const currentPrice = {
  ETH: 0,
  SUI: 0,
};
