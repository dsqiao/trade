// 子账号专用常量

// 出入金方向
const DEPOSIT = 0; // 入金（充值）
const WITHDRAW = 1; // 出金（提款）

// 币种
const CCY = {
  HKD: 'HKD', // 港币
  USD: 'USD', // 美元
};

// 港币/美元 参考汇率（1 美元 = ? 港币），用于资产总额折算，按需调整
const HKD_PER_USD = 7.85;

export {
  DEPOSIT,
  WITHDRAW,
  CCY,
  HKD_PER_USD,
};
