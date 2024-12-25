import { memo, useState, useEffect, useCallback } from 'react'
import './styles/StakingPage.scss'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import ninjaxLogoSvg from '../../assets/images/ninjax-logo.png'
import StakingFormPanel from '../StakingFormPanel/StakingFormPanel'
import WithdrawalActivityPanel from '../WithdrawalActivityPanel/WithdrawalActivityPanel'
import eventBus from '../../common/utils/EventBus'
import BigNumber from 'bignumber.js'
import { toDisplay, toPercent } from '../../core/config'

const StakingPage = (props: any) => {
  const { t }: any = useTranslation()
  const { address }: any = useAccount()
  const [tokenInfo, setTokenInfo] = useState<any>({})
  const [apr, setApr] = useState(0)
  const [pendingReward, setPendingReward] = useState(0)
  const [totalStakedAmount, setTotalStakedAmount] = useState(0)
  // const [myStake, setMyStake] = useState(0)
  const [userInfo, setUserInfo] = useState({ amount: '0' })
  // const [totalReward, setTotalReward] = useState(0)

  const handleHarvest = () => {

  }

  const initPage = useCallback(async () => {
    // Query Token name && Token Details
    const tokenResult: any = await props.tokenInfo(await props.stakingToken())
    setTokenInfo(tokenResult)
    // Pending Rewards
    const pendingRewardVal = await props.pendingReward()
    setPendingReward(props.fromWei(pendingRewardVal))

    const _totalStakedAmount = props.fromWei(await props.stakedAmount())
    setTotalStakedAmount(_totalStakedAmount)

    const rewardPerBlock = props.fromWei(await props.rewardPerBlock())

    const blockAmountForYear = (365 * 24 * 60 * 60) / 5
    const apr = BigNumber(blockAmountForYear)
      .multipliedBy(rewardPerBlock)
      .div(_totalStakedAmount)
    setApr(apr.toNumber())
    // Liquidity
    // const totalRewardVal = await props.totalReward()
    // setTotalReward(props.fromWei(totalRewardVal))
    // console.log('----4', totalRewardVal)

    setUserInfo(await props.userInfo())
  }, [])

  useEffect(() => {
    initPage()
    eventBus.on('reload-init', initPage)
    return () => {
      eventBus.off('reload-init', initPage)
    }
  }, [])
  return (
    <div className="page-staking">
      <div className="son-panel staking common-width">
        <h1>STAKING</h1>
        <p className="son-notice">
          Stake {tokenInfo.symbol} to earn additional {tokenInfo.symbol} yield.
        </p>
        <div className="son-group staking">
          <div className="com-staking-item-box">
            <div className="logo-name">
              <div className="logo">
                <img src={`https://raw.githubusercontent.com/metabitLab/assets/main/blockchains/tabi/assets/${props?.initialData?.stakingToken}/logo.png`} alt="" width={50} />
              </div>
              <div className="name">{tokenInfo.symbol}</div>
            </div>
            <div className="label-value">
              <p className="value">
                {toDisplay(pendingReward)} {tokenInfo.symbol}
              </p>
              <p className="label">Pending Rewards</p>
            </div>
            {/* <div className="harvest-btn">
              <button className={`harvest table-btn-ffbf6e ${pendingReward > 0 ? '' : 'disabled'}`} onClick={handleHarvest}>Harvest</button>
            </div> */}
          </div>
          <div className="line-h"></div>
          <div className="com-staking-item-box">
            <div className="label-value">
              <p className="value">
                {props.fromWei(userInfo.amount)} {tokenInfo.symbol}
              </p>
              <p className="label">My Stake</p>
            </div>
            <div className="label-value">
              <p className="value orange-text">
                {toPercent(apr, 2)}
              </p>
              <p className="label">APR</p>
            </div>
            <div className="label-value">
              <p className="value">{totalStakedAmount}</p>
              <p className="label">Total Staked</p>
            </div>
          </div>
        </div>
      </div>
      <div className="body-staking">
        <div className="table-panel">
          <div className="table-panel-item staking-from">
            <StakingFormPanel {...props} />
          </div>
          <div className="table-panel-item staking-activity">
            <WithdrawalActivityPanel {...props} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(StakingPage)
