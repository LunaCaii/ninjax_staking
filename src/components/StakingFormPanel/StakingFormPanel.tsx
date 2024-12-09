import { memo, useEffect, useState } from 'react'
import './styles/StakingFormPanel.scss'
import { useTranslation } from 'react-i18next'

const StakingFormPanel = (props: any) => {
  const { t }:any = useTranslation()
  const [tabType, setTabType] = useState('stake')
  const changeTab = (type: string) => {
    setTabType(type)
  }

  return (
    <div className='com-panel panel-form'>
      <div className='form-tabs'>
        <div className={`form-tab ${tabType === 'stake' ? 'active' : ''}`} onClick={() => changeTab('stake')}>Stake</div>
        <div className={`form-tab ${tabType === 'unstake' ? 'active' : ''}`} onClick={() => changeTab('unstake')}>Unstake</div>
      </div>
      <div className='panel-input group-l-f'>
        <div className='div-input'>
          <input  className='input-ninjax' placeholder='Available'/>
        </div>
        <div className='div-other'>
          <p className='text-balace'>122  NINJAX</p>
          <p className='text-fee'>≈$8888.00</p>
        </div>
      </div>
      <div className='panel-input group-t-b'>
        <p className='text-title'>Amount</p>
        <div className='div-input-box'>
          <div className='div-input'>
            <input  className='input-amount' placeholder='0.0'/>
          </div>
          <div className='btn-to-max'>Max</div>
        </div>
      </div>
      <div className='btn-all'>
        <button className='table-btn-ffbf6e size-all'>Stake</button>
      </div>
      <p className='text-error'>* You can unstake after 7 days.</p>
    </div>
  )
}

export default memo(StakingFormPanel)