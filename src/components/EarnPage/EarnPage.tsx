import { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './styles/EarnPage.scss'
import { UnclaimedPanel } from '../UnclaimedPanel'
import { EpochHistoryPanel } from '../EpochHistoryPanel'

const EarnPage = (props: any) => {
  const { t }:any = useTranslation()

  return (
    <div className='page-earn'>
      <div className='son-panel earn common-width'>
        <h1>Earn</h1>
        <ul className='son-group earn'>
          <li className='son-group-li earn'>
            <h2>Total Amount Earned</h2>
            <p>$1,018,404,140.16</p>
          </li>
          <li className='son-group-li earn'>
            <h2>Current Epoch Earnings</h2>
            <p>$1,403,809,350.729</p>
          </li>
          <li className='son-group-li earn'>
            <h2>My TVL</h2>
            <p>$1,403,809,350.729</p>
          </li>
        </ul>
      </div>
      <div className='body-earn'>
        <div className='table-panel'>
          <div className='table-panel-item earn-unclaimed'>
            <UnclaimedPanel/>
          </div>
          <div className='table-panel-item earn-epoch'>
            <EpochHistoryPanel/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(EarnPage)