import { memo, useRef, useEffect, useState, useCallback } from 'react'
import './styles/WithdrawalActivityPanel.scss'
import { useTranslation } from 'react-i18next'
import { Loading, CountDown, Toast } from 'react-vant'
import { useAccount } from 'wagmi'
import { fetchStakingList } from '../../common/ajax/index'
import { Pagination } from '../Pagination'
import NullSvg from '../../assets/images/icon-null.svg'
import ninjaxLogoSvg from '../../assets/images/ninjax-logo.png'
import { web3SDK } from '../../contract/index'
import eventBus from '../../common/utils/EventBus'
import { Replay } from '@react-vant/icons'

const WithdrawalActivityPanel = (props: any) => {
  const { t }:any = useTranslation()
  const scrollRef = useRef(null);
  const [hideElement, setHideElement] = useState(false);
  const [loading, setLoading] = useState(false)
  let { address, status, isConnected, connector } = useAccount()
  const [data, setData] = useState<any>([])
  // const [tabType, setTabType] = useState('pending')
  const [tokenInfo, setTokenInfo] = useState<any>({})
  const [blockNumber, setBlockNumber] = useState<number>(0)
  // const changeTab = (type: string) => {
  //   setTabType(type)
  // }
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      // 当滚动到底部时，隐藏元素
      setHideElement(scrollHeight - scrollTop - clientHeight <= 1); // 留一个像素的边距
    }
  };
  const handleClaim = async (item: any) => {
    if (Number(item.unlockBlock) - Number(blockNumber) > 0) {
      return false
    } else {
      try {
        const result: any = await props.claimIndex(item.id)
        Toast('解锁成功')
      } catch(e) {
        Toast('解锁失败')
        console.log('----handleClaim异常', e)
      }
    }
  }
  const queryList = async () => {
    setLoading(true)
    try {
      const {code, data, message, success}:any = await fetchStakingList({
        userAddress: address,
        type: 0,
        pageNumber: current,
        pageSize: pageSize
      })
      const {content, totalElements, ...other} = data
      if (success && code === 200) {
        setData(content || [])
        setTotal(totalElements)
      } else {
        setData([])
        setTotal(0)
      }
    } catch(e) {
      setData([])
      setTotal(0)
      console.log('---查询获取质押/解质押记录异常', e)
    } finally {
      setLoading(false)
    }
  }
  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)
  const handleChange = (pageNum: any) => {
    console.log('点击调用后当前页码', pageNum)
    setCurrent(pageNum)
  }
  const reloadInit = () => {
    setCurrent(1)
    initPage()
  }
  const initPage = async() => {
    // Query Token name && Token Details
    const tokenResult: any = await web3SDK.Token.tokenInfo(await web3SDK.StakingPool.stakingToken())
    setTokenInfo(tokenResult)
    // query staking list
    queryList()
    setBlockNumber(Number(await web3SDK.getBlockNumber()))
  }
  useEffect(() => {
    initPage()
    eventBus.on('reload-init', reloadInit)
    // scroll
    const element: any = scrollRef.current
    element.addEventListener('scroll', handleScroll)
    return () => {
      element.removeEventListener('scroll', handleScroll);
      eventBus.off('reload-init', reloadInit)
    };
  }, []);
  return (
    <>
      <div className='com-panel withdraw-activity'>
        <div className='box-title'>
          <h2>Withdrawal Activity</h2>
          {/* <div className='box-switch'>
            <div className={`switch-item ${tabType === 'pending' ? 'active' : ''}`} onClick={() => changeTab('pending')}>Pending</div>
            <div className={`switch-item ${tabType === 'close' ? 'active' : ''}`} onClick={() => changeTab('close')}>Close</div>
          </div> */}
          <div className='box-reload' onClick={reloadInit}>
            <Replay fontSize={26} />Reload
          </div>
        </div>
        <div ref={scrollRef} className='list-container'>
          { 
            loading ? <Loading className='cm-loading' size="24px" vertical>
              Loading...
            </Loading> :
            data.length > 0 ?
            data.map((item: any) => {
              return <div className='list-each-item' key={`ac-${item.id}`}>
                <div className='com-staking-item-box table-line'>
                  <div className='logo-name'>
                    <div className='logo'>
                      <img src={ninjaxLogoSvg} alt='' width={36} />
                    </div>
                    <div className='name'>{tokenInfo.symbol}</div>
                  </div>
                  <div className='label-value'>
                    <p className='value'>{web3SDK.fromWei(item.amount)}</p>
                    <p className='label'>Request Amount</p>
                  </div>
                  {/* <div className='label-value'>
                    <p className='value'>{item.type === 1 ? 'Stake' : 'UnStake'}</p>
                    <p className='label'>Transcation Type</p>
                  </div> */}
                  <div className='label-value'>
                    
                  <div className="value">
                    <i className="icon-time"></i>
                    {Number(item.unlockBlock) - Number(blockNumber) > 0 ? (
                      <CountDown
                        time={(Number(item.unlockBlock) - Number(blockNumber)) * 5 * 1000}
                        format="DD d HH h mm m ss s"
                      />
                    ) : (
                      'Now'
                    )}
                  </div>
                    <p className='label'>Claim Time</p>
                  </div>
                  <div className='btn-claim'>
                    <button className={`table-btn-ffdd85 click ${Number(item.unlockBlock) - Number(blockNumber) > 0 ? 'disabled' : ''}`} onClick={() => handleClaim(item)}>Claim</button>
                  </div>
                </div>
              </div>
            }) : <div className='null-data'>
              <img src={NullSvg} alt=''  width={300}/>
              <p>No Data</p>
            </div>
          }
          {hideElement ? <></> : <div className='defalut-mask'></div>}
        </div>
      </div>
      { total > 0 ? 
        <Pagination 
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={handleChange}
        pageType={'withdrawActivityPanel'}
        /> : <></>
      }
    </>
  )
}

export default memo(WithdrawalActivityPanel)