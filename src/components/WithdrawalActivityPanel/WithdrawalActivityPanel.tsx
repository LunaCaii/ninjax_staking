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
    },
    {
      id: 3,
      imageUrl: ninjaxSvg,
      name: 'NINJAX',
      requestAmount: 8.2,
      claimTime: ''
    },
    {
      id: 4,
      imageUrl: ninjaxSvg,
      name: 'NINJAX',
      requestAmount: 8.2,
      claimTime: ''
    },
    {
      id: 5,
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
            return <div className='list-each-item' key={`ac-${item.id}`}>
              <div className='com-staking-item-box'>
                <div className='logo-name'>
                  <div className='logo'>
                    <img src={item.imageUrl} alt='' />
                  </div>
                  <div className='name'>{item.name}</div>
                </div>
                <div className='label-value'>
                  <p className='value'>{item.requestAmount}</p>
                  <p className='label'>Request Amount</p>
                </div>
                <div className='label-value'>
                  <p className='value'><i className='icon-time'></i><span className='text-time'>{item.claimTime || '--'}</span></p>
                  <p className='label'>Claim Time</p>
                </div>
                <div className='btn-claim'>
                  <button className='table-btn-ffdd85'>Claim</button>
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