const BUY = 0;
const SELL = 1;
const OTHER = 2;
const OPTION = 3; // 期权（卖出/买入 PUT/CALL 权益金）

// 网格单运行状态
const RUNNING = 'running';
const STOPPED = 'stopped';

// 期权行权状态（手动录入，展示在期权行的「状态」列）
// HOLDING   未到期：仍在存续期内，尚未到到期日
// EXPIRED   已到期未行权：到期作废，权益金全部落袋（卖方）/ 权益金全损（买方）
// EXERCISED 已到期已行权：到期被指派 / 主动行权
// CLOSED    到期前平仓：在到期日之前买回或卖出平仓离场
const OptionStatus = {
  HOLDING: '未到期',
  EXPIRED: '已到期未行权',
  EXERCISED: '已到期已行权',
  CLOSED: '到期前平仓',
};

export {
  BUY,
  SELL,
  OTHER,
  OPTION,
  RUNNING,
  STOPPED,
  OptionStatus,
};
