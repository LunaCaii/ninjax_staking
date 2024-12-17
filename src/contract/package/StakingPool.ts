import { web3SDK } from '../index'
import {
    REACT_APP_STAKING_POOL,
} from '../config'
import ERC20ABI from '../abi/ERC20ABI'
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
 * 查询stakedAmount
 * @returns 
 */
const stakedAmount = async (): Promise<string> => {
    const [from] = await web3SDK.getAccount()
    return await (await contractObj()).methods.stakedAmount(from).call()
}

/**
 * 查询totalReward
 * @returns 
 */
const totalReward = async (): Promise<string> => {
    const [from] = await web3SDK.getAccount()
    return await (await contractObj()).methods.totalReward(from).call()
}

/**
 * 查询质押的Token
 * @returns 
 */
const stakingToken = async (): Promise<string> => await (await contractObj()).methods.stakingToken().call()

/**
 * 查询解锁具体信息
 * @returns 
 */
const userUnstakeInfo = async (index: string | number): Promise<string> => {
    const [from] = await web3SDK.getAccount()
    return await (await contractObj()).methods.userUnstakeInfo(from, index).call()
}

const allowanceStakingPool = async (): Promise<string> => {
    const [from] = await web3SDK.getAccount()
    const _stakingToken = await stakingToken()
    const tokenContractObj = await web3SDK.createContractObj(ERC20ABI, _stakingToken as string)
    return await tokenContractObj.methods.allowance(from, REACT_APP_STAKING_POOL).call()
}

const approveStakingPool = async (): Promise<any> => {
    const [from] = await web3SDK.getAccount()
    const _stakingToken = await stakingToken()
    const tokenContractObj = await web3SDK.createContractObj(ERC20ABI, _stakingToken as string)
    const gasPrice = await web3SDK.getGasPrice()
    const gas = await tokenContractObj.methods.approve(REACT_APP_STAKING_POOL, web3SDK.max).estimateGas({ from })
    return await tokenContractObj.methods.approve(REACT_APP_STAKING_POOL, web3SDK.max).send({ from, gas, gasPrice })
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
    stakingToken: () => Promise<string>
    pendingReward: () => Promise<string>
    stake: (_amount: string) => Promise<any>
    unstake: (_amount: string) => Promise<any>
    claimIndex: (index: string | number) => Promise<any>
    userUnstakeInfo: (index: string | number) => Promise<any>
    allowanceStakingPool: () => Promise<string>,
    approveStakingPool: () => Promise<any>,
    pendingClaim:() => Promise<any>,
    stakedAmount:() => Promise<any>,
    totalReward:() => Promise<any>
}

const exportObj = {
    stake,
    unstake,
    claimIndex,
    stakingToken,
    pendingClaim,
    pendingReward,
    userUnstakeInfo,
    allowanceStakingPool,
    approveStakingPool,
    stakedAmount,
    totalReward
}

export default exportObj 