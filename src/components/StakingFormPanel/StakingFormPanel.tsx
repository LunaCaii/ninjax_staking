import { memo, useState } from 'react'
import './styles/StakingFormPanel.scss'
import { useTranslation } from 'react-i18next'
import { useAccount, useBalance } from 'wagmi'

const StakingFormPanel = (props: any) => {
  const { t }: any = useTranslation()
  const { address }: any = useAccount()
  const [tabType, setTabType] = useState('stake')
  const changeTab = (type: string) => {
    setTabType(type)
  }

  const stakingTokenBalance = useBalance({
    address,
    token: props?.initialData?.stakingToken,
  })

  return (
    <div className="com-panel panel-form">
      <div className="form-tabs">
        <div
          className={`form-tab ${tabType === 'stake' ? 'active' : ''}`}
          onClick={() => changeTab('stake')}
        >
          Stake
        </div>
        <div
          className={`form-tab ${tabType === 'unstake' ? 'active' : ''}`}
          onClick={() => changeTab('unstake')}
        >
          Unstake
        </div>
      </div>
      {tabType === 'stake' ? (
        <>
          <div className="panel-input group-l-f">
            <div className="div-input">
              <input className="input-ninjax" placeholder="Available" />
            </div>
            <div className="div-other">
              <p className="text-balace">
                {!!props?.initialData?.stakingToken
                  ? props.fromWei(stakingTokenBalance.data?.value)
                  : '~'}{' '}
                {stakingTokenBalance.data?.symbol}
              </p>
              {/* <p className="text-fee">≈$8888.00</p> */}
            </div>
          </div>
          <div className="panel-input group-t-b">
            <p className="text-title">Amount</p>
            <div className="div-input-box">
              <div className="div-input">
                <input className="input-amount" placeholder="0.0" />
              </div>
              <div className="btn-to-max">Max</div>
            </div>
          </div>
          <div className="btn-all">
            <button className="table-btn-ffbf6e size-all">Stake</button>
          </div>
          <p className="text-error">* You can unstake after 7 days.</p>
        </>
      ) : (
        <>
          <div className="panel-input group-l-f">
            <div className="div-input">
              <input className="input-ninjax" placeholder="Available" />
            </div>
            <div className="div-other">
              <p className="text-balace">122 NINJAX</p>
              <p className="text-fee">≈$8888.00</p>
            </div>
          </div>
          <div className="panel-input group-t-b">
            <p className="text-title">Amount</p>
            <div className="div-input-box">
              <div className="div-input">
                <input className="input-amount" placeholder="0.0" />
              </div>
              <div className="btn-to-max">Max</div>
            </div>
          </div>
          <div className="btn-all">
            <button className="table-btn-ffbf6e size-all">Unstake</button>
          </div>
          <p className="text-error">* You can unstake after 7 days.</p>
        </>
      )}
    </div>
  )
}

export default memo(StakingFormPanel)
