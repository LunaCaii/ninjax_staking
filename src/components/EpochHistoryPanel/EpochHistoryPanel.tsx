import { memo, useRef, useEffect, useState } from 'react'
import './styles/EpochHistoryPanel.scss'
import { useTranslation } from 'react-i18next'
import { Loading } from 'react-vant'
import { 
  useAccount, 
  // useSendTransaction,
  // useSignMessage
} from 'wagmi'
import { Pagination } from '../Pagination'
import NullSvg from '../../assets/images/icon-null.svg'
import { web3SDK } from '../../contract/index'
import { fetchRewardByUserAddress } from '../../common/ajax/index'

const EpochHistoryPanel = (props: any) => {
  const { t }:any = useTranslation()
  const scrollRef = useRef(null);
  const [hideElement, setHideElement] = useState(false);
  const [loading, setLoading] = useState(false)
  let { address, status, isConnected, connector } = useAccount()
  const [data, setData] = useState<any>([])
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      // 当滚动到底部时，隐藏元素
      setHideElement(scrollHeight - scrollTop - clientHeight <= 1); // 留一个像素的边距
    }
  };

  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)
  const handleChange = (pageNum: any) => {
    console.log('点击调用后当前页码', pageNum)
    setCurrent(pageNum)
  }
  // const reloadInitPage = () => {
  //   setCurrent(1)
  //   initPage()
  // }
  const initPage = () => {
    setLoading(true)
    fetchRewardByUserAddress({
      userAddress: address,
      pageNumber: current,
      pageSize: pageSize
    }).then(({success, code, message, data}: any) => {
      const {content, totalElements, ...other} = data
      setLoading(false)
      setData(content || [])
      setTotal(totalElements)
    }).catch((error: any) => {
      setLoading(false)
      setData([])
      setTotal(0)
      console.log(error)
    })
  }
  useEffect(() => {
    initPage()
    // scroll
    const element: any = scrollRef.current
    element.addEventListener('scroll', handleScroll)
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className='com-panel epoch-history'>
        <h2>Epoch History</h2>
        <div ref={scrollRef} className='list-container'>
        {
          loading ? <Loading className='cm-loading' size="24px" vertical>
            Loading...
          </Loading> : total > 0 ?
          data.map((item: any) => {
            return <div className='list-table'  key={`ep-${item.epoch}`}>
              <div className='list-tr thead'>
                <div className='width-left'>
                  <div className='width-td1'>
                    <span className='title'>Epoch-{item.epoch}</span>
                    <span className='table-ffbf6e-18 tag-sort'># {item.epoch}</span>
                  </div>
                </div>
              </div>
              <div className='list-detail'>
                <div className='list-box-column'>
                  {/* <div className='width-td4 left'>
                    <div className='info'>No</div>
                    <div className='label'>Out of range?</div>
                  </div>
                  <div className='line'></div> */}
                  <div className='width-td4 center'>
                    <div className='info'>{web3SDK.fromWei(item.lp)}</div>
                    <div className='label'>Total LP</div>
                  </div>
                  <div className='line'></div>
                  <div className='width-td4 right'>
                    <div className='info'>{web3SDK.fromWei(item.rewardAmount)}</div>
                    <div className='label'>Rewards</div>
                  </div>
                </div>
              </div>
            </div>
          }) : <div className='null-data'>
            <img src={NullSvg} alt=''  width={300}/>
            <p>No Data</p>
          </div>
        }
        </div>
        {hideElement ? <></> : <div className='defalut-mask'></div>}
      </div>
      { total > 0 ? 
        <Pagination 
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={handleChange}
        pageType={'uclaimedPanel'}
        /> : <></>
      }
    </>
  )
}

export default memo(EpochHistoryPanel)