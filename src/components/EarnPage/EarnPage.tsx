import { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './styles/EarnPage.scss'
import { Loading } from 'react-vant'
import { CountUp } from 'use-count-up';
import { UnclaimedPanel } from '../UnclaimedPanel'
import { EpochHistoryPanel } from '../EpochHistoryPanel'

const EarnPage = (props: any) => {
  const { t }:any = useTranslation()
  const [loading, setLoading] = useState(false)

  return (
    <div className='page-earn'>
      <div className='son-panel earn common-width'>
        <h1>Earn</h1>
        <ul className='son-group earn'>
          <li className='son-group-li earn'>
            <h2>Total Amount Earned</h2>
            <p>{loading ? <Loading className='cm-loading inline' size="24px">Loading...</Loading>: <>$<CountUp isCounting thousandsSeparator={','} end={1018404140.16}  updateInterval={0.05} duration={0.5}/></>}</p>
          </li>
          <li className='son-group-li earn'>
            <h2>Current Epoch Earnings</h2>
            <p>{loading ? <Loading className='cm-loading inline' size="24px">Loading...</Loading>: <>$<CountUp isCounting thousandsSeparator={','} end={1403809350.729} updateInterval={0.05} duration={0.5}/></>}</p>
          </li>
          <li className='son-group-li earn'>
            <h2>My TVL</h2>
            <p>{loading ? <Loading className='cm-loading inline' size="24px">Loading...</Loading>: <><CountUp isCounting thousandsSeparator={','} end={1403809350.729} updateInterval={0.05} duration={0.5}/></>}</p>
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