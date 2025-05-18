import { SuiClient } from '@mysten/sui/client';
import { isValidTransactionDigest } from '@mysten/sui/utils';
/**
 * 
 * @param {string} txDigest 交易哈希
 * @param {string} network 网络，可选值 'mainnet' | 'testnet' | 'devnet'
 * @returns 
 */
async function getTransactionTime(txDigest, network = 'mainnet') {
  // 验证交易哈希格式
  if (!isValidTransactionDigest(txDigest)) {
    throw new Error(`Invalid transaction digest format: ${txDigest}`);
  }

  // 配置网络端点
  const rpcEndpoints = {
    mainnet: 'https://fullnode.mainnet.sui.io',
    testnet: 'https://fullnode.testnet.sui.io',
    devnet: 'https://fullnode.devnet.sui.io'
  };

  // 创建客户端
  const client = new SuiClient({ url: rpcEndpoints[network] });

  try {
    // 获取交易详情
    const txDetails = await client.getTransactionBlock({
      digest: txDigest,
      options: {
        showEffects: false,
        showEvents: false,
        showInput: false,
        showRawInput: false,
        showObjectChanges: false,
        showBalanceChanges: false,
      },
    });

    if (!txDetails.timestampMs) {
      throw new Error('Transaction timestamp not available');
    }

    const timestampMs = Number(txDetails.timestampMs);
    const transactionDate = new Date(timestampMs);
    return {
      txDigest,
      timestampMs,
      isoString: transactionDate.toISOString(),
      localString: transactionDate.toString(),
      network,
    };
  } catch (error) {
    console.error(`Error fetching transaction ${txDigest}:`, error);
    throw new Error(`Failed to get transaction time: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function toLocalTime(timestamp) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // 24 小时制
  };
  return  new Date(timestamp).toLocaleString('zh-CN', options);
}
function getDayOfWeek(year, month, day) {
  // 创建 Date 对象时，月份是从 0（1月）开始计算的，所以需要减 1
  const date = new Date(year, month - 1, day);
  const daysOfWeek = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ];
  return daysOfWeek[date.getDay()];
}
function jumpOverview(digest) {
  window.open(`https://suivision.xyz/txblock/${digest}?tab=Overview`);
};
function jumpChanges(digest) {
  window.open(`https://suivision.xyz/txblock/${digest}?tab=Changes`);
};
export { 
  getDayOfWeek,
  getTransactionTime,
  toLocalTime,
  jumpOverview,
  jumpChanges, 
};