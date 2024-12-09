import { memo, useEffect, useState } from 'react'
import './styles/WithdrawalActivityPanel.scss'
import { useTranslation } from 'react-i18next'
import ninjaxSvg from '../../assets/images/ninjax-logo.svg'

const WithdrawalActivityPanel = (props: any) => {
  const { t }:any = useTranslation()
  const [tabType, setTabType] = useState('pending')
  const changeTab = (type: string) => {
    setTabType(type)
  }
  const data = [
    {
      id: 1,
      imageUrl: ninjaxSvg,
      name: 'NINJAX',
      requestAmount: 10.2,
      claimTime: 'In 5d 2h'
    },
    {
      id: 2,
      imageUrl: ninjaxSvg,
      name: 'NINJAX',
      requestAmount: 8.2,
      claimTime: ''
    }
  ]

  return (
    <div className='com-panel withdraw-activity'>
      <div className='box-title'>
        <h2>Withdrawal Activity</h2>
        <div className='box-switch'>
          <div className={`switch-item ${tabType === 'pending' ? 'active' : ''}`} onClick={() => changeTab('pending')}>Pending</div>
          <div className={`switch-item ${tabType === 'close' ? 'active' : ''}`} onClick={() => changeTab('close')}>Close</div>
        </div>
      </div>
      <div className='list-container'>
        { 
          data.map((item: any) => {
            return <div className='list-each-item'>
              <div className='com-staking-item-box'>
                <div className='logo-name'>
                  <div className='logo'>
                    <img src={ninjaxSvg} alt='' />
                  </div>
                  <div className='name'>NINJAX</div>
                </div>
                <div className='label-value'>
                  <p className='value'>10.2</p>
                  <p className='label'>Request Amount</p>
                </div>
                <div className='label-value'>
                  <p className='value'>- -</p>
                  <p className='label'>Claim Time</p>
                </div>
                <div className='harvest-btn'>
                  <button className='harvest table-btn-ffbf6e'>Harvest</button>
                </div>
              </div>
            </div>
          })
        }
        <div className='defalut-mask'></div>
      </div>
      
    </div>
  )
}

export default memo(WithdrawalActivityPanel)