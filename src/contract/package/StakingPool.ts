import { web3SDK } from '../index'
import {
    REACT_APP_STAKING_POOL,
} from '../config'
import StakingPoolABI from '../abi/StakingPool'

const contractObj = async () =>
    await web3SDK.createContractObj(
        StakingPoolABI,
        REACT_APP_STAKING_POOL as string
    )

/**
 * 查询待领取奖励
 * @returns 
 */
const pendingReward = async (): Promise<string> => {
    const [from] = await web3SDK.getAccount()
    return await (await contractObj()).methods.pendingReward(from).call()
}

/**
 * 查询解锁具体信息
 * @returns 
 */
const userUnstakeInfo = async (index: string | number): Promise<string> => {
    const [from] = await web3SDK.getAccount()
    return await (await contractObj()).methods.userUnstakeInfo(from, index).call()
}

/**
 * 查询已解锁的解质押数量
 * @returns 
 */
const pendingClaim = async (): Promise<string> => {
    const [from] = await web3SDK.getAccount()
    return await (await contractObj()).methods.pendingClaim(from).call()
}

/**
 * 质押
 * @param amount 
 * @returns 
 */
const stake = async (_amount: string) => {
    const [from] = await web3SDK.getAccount()
    const amount = web3SDK.toWei(_amount)
    const gasPrice = await web3SDK.getGasPrice()
    const gas = await (await contractObj()).methods.stake(amount).estimateGas({ from })
    return await (await contractObj()).methods.stake(amount).send({
        from,
        gas,
        gasPrice
    })
}

/**
 * 解除质押
 * @param amount 
 * @returns 
 */
const unstake = async (_amount: string) => {
    const [from] = await web3SDK.getAccount()
    const amount = web3SDK.toWei(_amount)
    const gasPrice = await web3SDK.getGasPrice()
    const gas = await (await contractObj()).methods.unstake(amount).estimateGas({ from })
    return await (await contractObj()).methods.unstake(amount).send({
        from,
        gas,
        gasPrice
    })
}

/**
 * 领取指定解锁
 * @param index 
 * @returns 
 */
const claimIndex = async (index: string | number) => {
    const [from] = await web3SDK.getAccount()
    const gasPrice = await web3SDK.getGasPrice()
    const gas = await (await contractObj()).methods.claimIndex(index).estimateGas({ from })
    return await (await contractObj()).methods.claimIndex(index).send({
        from,
        gas,
        gasPrice
    })
}

export type StakingPoolTypes = {
    pendingReward: () => Promise<string>
    stake: (_amount: string) => Promise<any>
    unstake: (_amount: string) => Promise<any>
    claimIndex: (index: string | number) => Promise<any>
    userUnstakeInfo: (index: string | number) => Promise<any>
}

const exportObj = {
    stake,
    unstake,
    claimIndex,
    pendingReward,
    pendingClaim,
    userUnstakeInfo
}

export default exportObj 