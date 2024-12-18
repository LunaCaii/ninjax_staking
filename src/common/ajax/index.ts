import { request } from "./request";
/**
 *
 * @param params {
 ** "epoch": 0,
 ** "rewardAmount": "string",
 ** "tokenSymbol": "string",
 ** "tokenAddress": "string",
 ** "mainNet": true
 * }
 * @returns Promise
 */
export const fetchEpochRewardCreate = <T>(params: any) => {
  return request.post<T>("/epochReward/create", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 *
 * @param params {
 *  txHash: string,
 *  userAddress: string,
 *  claimIndex: string
 * }
 * @returns Promise
 */
export const fetchClaimedList = <T>(params: any) => {
  return request.post<T>("/staking/claimed/list", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * 
 * @param params {
 *   txHash: string, 
 *   userAddress: string,
 *   type: Number 1.质押 0.解除质押. <0或不传该参数.全部
 * }
 * @returns Promise
 */
export const fetchStakingList = <T>(params: any) => {
  return request.post<T>("/staking/list", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 *
 * @param params {userAddress: string}
 * @returns Promise
 */
export const fetchRewardByUserAddress = <T>(params: any) => {
  return request.get<T>("/reward/userAddress", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 *
 * @param params {userAddress: string}
 * @returns Promise
 */
export const fetchRewardTotal = <T>(params: any) => {
  return request.get<T>("/reward/total", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 *
 * @param params {
 * userAddress: string
 * key: string
 * sign: string
 * }
 * @returns Promise
 */
export const fetchRewardClaim = <T>(params: any) => {
  return request.post<T>("/reward/claim", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
