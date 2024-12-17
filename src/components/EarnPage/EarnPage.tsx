import { memo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './styles/EarnPage.scss'
import { Loading } from 'react-vant'
import { CountUp } from 'use-count-up';
import { useAccount } from 'wagmi'
import { UnclaimedPanel } from '../UnclaimedPanel'
import { EpochHistoryPanel } from '../EpochHistoryPanel'
import { fetchRewardTotal } from '../../common/ajax/index'
import { web3SDK } from '../../contract/index'

const EarnPage = (props: any) => {
  const { t }:any = useTranslation()
  const { address, status, isConnected } = useAccount()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    totalAmountEarned: '0',
    tvl: '0'
  })

  const initPage = () => {
    setLoading(true)
    fetchRewardTotal({
      userAddress: '0xc38c63baf07505160d1292b1b9fa4955333e609b'
    }).then(({success, code, message, data}: any) => {
      setLoading(false)
      setData(data)
    }).catch((error: any) => {
      setLoading(false)
      setData({
        totalAmountEarned: '0',
        tvl: '0'
      })
      console.log(error)
    })
  }
  useEffect(() => {
    initPage()
  }, [])
  return (
    <div className='page-earn'>
      <div className='son-panel earn common-width'>
        <h1>Earn</h1>
        <ul className='son-group earn'>
          <li className='son-group-li earn'>
            <h2>Total Amount Earned</h2>
            <p>{loading ? <Loading className='cm-loading inline' size="24px">Loading...</Loading>: <>$ <CountUp isCounting thousandsSeparator={','} end={Number(web3SDK.fromWei(data.totalAmountEarned))}  updateInterval={0.05} duration={0.5}/></>}</p>
          </li>
          {/* <li className='son-group-li earn'>
            <h2>Current Epoch Earnings</h2>
            <p>{loading ? <Loading className='cm-loading inline' size="24px">Loading...</Loading>: <>$ <CountUp isCounting thousandsSeparator={','} end={1403809350.729} updateInterval={0.05} duration={0.5}/></>}</p>
          </li> */}
          <li className='son-group-li earn'>
            <h2>My TVL</h2>
            <p>{loading ? <Loading className='cm-loading inline' size="24px">Loading...</Loading>: <>$ <CountUp isCounting thousandsSeparator={','} end={Number(web3SDK.fromWei(data.tvl))} updateInterval={0.05} duration={0.5}/></>}</p>
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