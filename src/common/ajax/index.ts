import { request } from './request'
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
    return request.post<T>('/epochReward/create', params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/**
 * 
 * @param params {userAddress: string}
 * @returns Promise
 */
export const fetchRewardByUserAddress = <T>(params: any) => {
  return request.get<T>('/reward/userAddress', params, {
      headers: {
          'Content-Type': 'application/json'
      }
  })
}

