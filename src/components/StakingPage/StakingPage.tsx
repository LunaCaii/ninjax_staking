import { memo, useState, useEffect, useCallback } from 'react'
import './styles/StakingPage.scss'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import ninjaxLogoSvg from '../../assets/images/ninjax-logo.svg'
import StakingFormPanel from '../StakingFormPanel/StakingFormPanel'
import WithdrawalActivityPanel from '../WithdrawalActivityPanel/WithdrawalActivityPanel'

const StakingPage = (props: any) => {
  const { t }: any = useTranslation()
  const { address }: any = useAccount()
  const [tokenInfo, setTokenInfo] = useState<any>({})
  const [pendingReward, setPendingReward] = useState(0)
  const [myStake, setMyStake] = useState(0)
  const [totalReward, setTotalReward] = useState(0)
  const initPage = useCallback(async () => {
    // Query Token name && Token Details
    const tokenResult: any = await props.tokenInfo(await props.stakingToken())
    setTokenInfo(tokenResult)
    console.log('------', tokenResult)
    // Pending Rewards
    const pendingRewardVal = await props.pendingReward()
    setPendingReward(props.fromWei(pendingRewardVal))
    console.log('----2', pendingRewardVal)
    // My Stake
    const myStakeVal = await props.stakedAmount()
    setMyStake(props.fromWei(myStakeVal))
    console.log('----3', myStakeVal)
    // Liquidity
    const totalRewardVal = await props.totalReward()
    setTotalReward(props.fromWei(totalRewardVal))
    console.log('----4', totalRewardVal)
  }, [])

  useEffect(() => {
    initPage()
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
                <img src={ninjaxLogoSvg} alt="" />
              </div>
              <div className="name">{tokenInfo.symbol}</div>
            </div>
            <div className="label-value">
              <p className="value">{pendingReward} {tokenInfo.symbol}</p>
              <p className="label">Pending Rewards</p>
            </div>
            <div className="harvest-btn">
              <button className="harvest table-btn-ffbf6e">Harvest</button>
            </div>
          </div>
          <div className="line-h"></div>
          <div className="com-staking-item-box">
            <div className="label-value">
              <p className="value">{myStake} {tokenInfo.symbol}</p>
              <p className="label">My Stake</p>
            </div>
            <div className="label-value">
              <p className="value orange-text">{ (myStake / totalReward) * 100}%</p>
              <p className="label">APR</p>
            </div>
            <div className="label-value">
              <p className="value">$ {totalReward}</p>
              <p className="label">Liquidity</p>
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
            <WithdrawalActivityPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(StakingPage)
