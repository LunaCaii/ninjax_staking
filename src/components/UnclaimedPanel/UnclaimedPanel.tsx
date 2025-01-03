import { memo, useRef, useEffect, useState } from 'react'
import './styles/UnclaimedPanel.scss'
import { useTranslation } from 'react-i18next'
import { 
  useAccount, 
  // useSendTransaction,
  useSignMessage
} from 'wagmi'
import { UnclaimedCollapse } from '../UnclaimedCollapse'
import { Loading, Overlay } from 'react-vant'
import { Pagination } from '../Pagination'
import { fetchRewardByUserAddress, fetchRewardCheckClaimable, fetchRewardClaim } from '../../common/ajax/index'
import NullSvg from '../../assets/images/icon-null.svg'

const UnclaimedPanel = (props: any) => {
  const { t }:any = useTranslation()
  const { signMessageAsync } = useSignMessage()
  // const { sendTransactionAsync } = useSendTransaction()
  const scrollRef = useRef(null);
  const [hideElement, setHideElement] = useState(false);
  const [loading, setLoading] = useState(false)
  const [fullLoading, setFullLoading] = useState(false)
  let { address, status, isConnected, connector } = useAccount()
  const [data, setData] = useState<any>([])
  const [claimIsAllowClick, setClaimIsAllowClick] = useState(false)
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      // Hide the element when scrolling to the bottom
      setHideElement(scrollHeight - scrollTop - clientHeight <= 1); // 留一个像素的边距
    }
  };

  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)
  const handleChange = (pageNum: any) => {
    // console.log('Click to call the current page number', pageNum)
    setCurrent(pageNum)
  }

  const handleClaimClick = async ({handleClaim, ...other}: any) => {
    try {
      if (handleClaim === undefined) {
        if (!claimIsAllowClick) {
          return
        }
      }
      setFullLoading(true)
      console.log('Current claim click event', other)
      // 签名
      const key = String(Math.random())
      const sign: any = await signMessageAsync({ account: address, message: `${key}`, connector: connector})
      // 调用接口
      await fetchRewardClaim({
        userAddress: address,
        key: key,
        sign: sign
      }).then((res: any) => {
        console.log(res)
        reloadInitPage()
      }).catch((error: any) => {})
    } catch(e) {} finally {
      setFullLoading(false)
    }
  }

  const reloadInitPage = () => {
    setCurrent(1)
    initPage()
  }
  const initPage = async () => {
    setLoading(true)
    try {
      await fetchRewardByUserAddress({
        userAddress: address,
        pageNumber: current,
        pageSize: pageSize
      }).then(({success, code, message, data}: any) => {
        const {content, totalElements, ...other} = data
        setData(content || [])
        setTotal(totalElements)
      }).catch((error: any) => {
        setData([])
        setTotal(0)
        console.log(error)
      })
      await fetchRewardCheckClaimable({
        userAddress: address
      }).then((res: any) => {
        setClaimIsAllowClick(res.data)
      })
    } catch(e) {} finally {
      setLoading(false)
    }
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
      <div className='com-panel unclaimed-panel'>
        <div className='box-title'>
          <h2>You have unclaimed Rewards</h2>
          {
          total > 0 ?
            <button className={`table-btn-ffbf6e btn-claim ${claimIsAllowClick ? '' : 'disabled'}`} onClick={handleClaimClick}>Claim All</button> : <></>
          }
        </div>
        <div ref={scrollRef} className='list-container'>
          {
            loading ? <Loading className='cm-loading' size="24px" vertical>
              Loading...
            </Loading> : total > 0 ?
              data.map((item: any, index: any) => {
              return <UnclaimedCollapse {...{
                ...item,
                index: index + 1,
                handleClaim: handleClaimClick
              }} key={`cc-${item.epoch}`} />
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
      <Overlay visible={fullLoading}  style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Loading className='cm-loading inline' size="24px">Loading...</Loading>
      </Overlay>
    </>
  )
}

export default memo(UnclaimedPanel)