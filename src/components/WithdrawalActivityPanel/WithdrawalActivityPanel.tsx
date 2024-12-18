import { memo, useRef, useEffect, useState, useCallback } from 'react'
import './styles/WithdrawalActivityPanel.scss'
import { useTranslation } from 'react-i18next'
import { Loading, CountDown } from 'react-vant'
import { useAccount } from 'wagmi'
import { fetchStakingList } from '../../common/ajax/index'
import NullSvg from '../../assets/images/icon-null.svg'
import ninjaxLogoSvg from '../../assets/images/ninjax-logo.png'
import { web3SDK } from '../../contract/index'

const WithdrawalActivityPanel = (props: any) => {
  const { t }:any = useTranslation()
  const scrollRef = useRef(null);
  const [hideElement, setHideElement] = useState(false);
  const [loading, setLoading] = useState(false)
  let { address, status, isConnected, connector } = useAccount()
  const [data, setData] = useState<any>([])
  // const [tabType, setTabType] = useState('pending')
  const [tokenInfo, setTokenInfo] = useState<any>({})
  const [blockNumber, setBlockNumber] = useState<any>()
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
  const queryList = async () => {
    setLoading(true)
    try {
      const {code, data, message, success}:any = await fetchStakingList({
        userAddress: address,
        type: -1
      })
      if (success && code === 200) {
        const _blockNumber: any = await web3SDK.getBlockNumber()
        setBlockNumber(web3SDK.fromWei(_blockNumber))
        // const _list = data.content.map((item: any) => {
        //   const _unlockBlock = item.unlockBlock || ''
        //   item.claimTime = 0
        // })
        setData(data.content || [])
      } else {
        setData([])
      }
    } catch(e) {
      setData([])
      console.log('---查询获取质押/解质押记录异常', e)
    } finally {
      setLoading(false)
    }
  }

  const initPage = async () => {
    // Query Token name && Token Details
    const tokenResult: any = await web3SDK.Token.tokenInfo(await web3SDK.StakingPool.stakingToken())
    setTokenInfo(tokenResult)
    // query staking list
    queryList()
  }

  useEffect(() => {
    initPage()
    const element: any = scrollRef.current
    element.addEventListener('scroll', handleScroll)
    return () => {
      element.removeEventListener('scroll', handleScroll);
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
                    <p className='value'><i className='icon-time'></i><CountDown time={30 * 60 * 60 * 1000} format="DD d HH h" /></p>
                    <p className='label'>Claim Time</p>
                  </div>
                  <div className='btn-claim'>
                    <button className={`table-btn-ffdd85 click `}>Claim</button>
                  </div>
                </div>
              </div>
            }) : <div className='null-data'>
              <img src={NullSvg} alt=''  width={300}/>
              <p>查询无结果</p>
            </div>
          }
          {hideElement ? <></> : <div className='defalut-mask'></div>}
        </div>
      </div>
    </>
  )
}

export default memo(WithdrawalActivityPanel)