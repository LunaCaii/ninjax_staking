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
 * Check pending rewards
 * @returns 
 */
const pendingReward = async (): Promise<string> => {
    const [from] = await web3SDK.getAccount()
    return await (await contractObj()).methods.pendingReward(from).call()
}

/**
 * Query Total StakedAmount
 * @returns 
 */
const stakedAmount = async (): Promise<string> => await (await contractObj()).methods.stakedAmount().call()

/**
 * Query the number of rewards for each block
 * @returns 
 */
const rewardPerBlock = async (): Promise<string> => await (await contractObj()).methods.rewardPerBlock().call()

/**
 * Query totalReward
 * @returns 
 */
const totalReward = async (): Promise<string> => {
    const [from] = await web3SDK.getAccount()
    return await (await contractObj()).methods.totalReward(from).call()
}

/**
 * Query the pledged tokens
 * @returns 
 */
const stakingToken = async (): Promise<string> => await (await contractObj()).methods.stakingToken().call()

/**
 * Query unlocking details
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
 * Query the unlocked unstaking amount
 * @returns 
 */
const pendingClaim = async (): Promise<string> => {
    const [from] = await web3SDK.getAccount()
    return await (await contractObj()).methods.pendingClaim(from).call()
}

const userInfo = async (): Promise<string> => {
    const [from] = await web3SDK.getAccount()
    return await (await contractObj()).methods.userInfo(from).call()
}

/**
 * Stake
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
 * Unstake
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
 * Receive designated unlock
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
    userInfo: () => Promise<any>
    stake: (_amount: string) => Promise<any>
    unstake: (_amount: string) => Promise<any>
    claimIndex: (index: string | number) => Promise<any>
    userUnstakeInfo: (index: string | number) => Promise<any>
    allowanceStakingPool: () => Promise<string>,
    approveStakingPool: () => Promise<any>,
    pendingClaim: () => Promise<any>,
    stakedAmount: () => Promise<string>,
    totalReward: () => Promise<any>
    rewardPerBlock: () => Promise<string>
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
    totalReward,
    userInfo,
    rewardPerBlock
}

export default exportObj 