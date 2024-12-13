import { memo, useState, useEffect, useCallback } from 'react'
import './styles/StakingPage.scss'
import { useTranslation } from 'react-i18next'
import ninjaxLogoSvg from '../../assets/images/ninjax-logo.svg'
import StakingFormPanel from '../StakingFormPanel/StakingFormPanel'
import WithdrawalActivityPanel from '../WithdrawalActivityPanel/WithdrawalActivityPanel'

const StakingPage = (props: any) => {
  const { t }: any = useTranslation()
  const _fetch = useCallback(async () => {
    const tokenInfo = await props.tokenInfo(await props.stakingToken())
    console.log('------', tokenInfo)
  }, [])

  useEffect(() => {
    _fetch()
  }, [])

  return (
    <div className="page-staking">
      <div className="son-panel staking common-width">
        <h1>STAKING</h1>
        <p className="son-notice">
          Stake NINJAX to earn additional NINJAX yield.
        </p>
        <div className="son-group staking">
          <div className="com-staking-item-box">
            <div className="logo-name">
              <div className="logo">
                <img src={ninjaxLogoSvg} alt="" />
              </div>
              <div className="name">NINJAX</div>
            </div>
            <div className="label-value">
              <p className="value">0 NINJAX</p>
              <p className="label">Pending Rewards</p>
            </div>
            <div className="harvest-btn">
              <button className="harvest table-btn-ffbf6e">Harvest</button>
            </div>
          </div>
          <div className="line-h"></div>
          <div className="com-staking-item-box">
            <div className="label-value">
              <p className="value">0 NINJAX</p>
              <p className="label">My Stake</p>
            </div>
            <div className="label-value">
              <p className="value orange-text">4.6%</p>
              <p className="label">APR</p>
            </div>
            <div className="label-value">
              <p className="value">$123,123.7</p>
              <p className="label">Liquidity</p>
            </div>
          </div>
        </div>
      </div>
      <div className="body-staking">
        <div className="table-panel">
          <div className="table-panel-item staking-from">
            <StakingFormPanel />
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
