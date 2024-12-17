import { memo, useRef, useEffect, useState } from 'react'
import './styles/UnclaimedPanel.scss'
import { useTranslation } from 'react-i18next'
import { 
  useAccount, 
  // useSendTransaction,
  useSignMessage
} from 'wagmi'
import { UnclaimedCollapse } from '../UnclaimedCollapse'
import { Loading, Empty } from 'react-vant'
import { Pagination } from '../Pagination'
import { fetchRewardByUserAddress, fetchRewardClaim } from '../../common/ajax/index'

const UnclaimedPanel = (props: any) => {
  const { t }:any = useTranslation()
  const { signMessageAsync } = useSignMessage()
  // const { sendTransactionAsync } = useSendTransaction()
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

  const handleClaimClick = async ({handleClaim, ...other}: any) => {
    console.log('当前claim点击事件', other)
    // 签名
    const key = String(Math.random())
    const sign: any = await signMessageAsync({ account: address, message: `${key}`, connector: connector})
    // 调用接口
    fetchRewardClaim({
      userAddress: address,
      key: key,
      sign: sign
    }).then((res: any) => {
      console.log(res)
      reloadInitPage()
    }).catch((error: any) => {})
  }

  const reloadInitPage = () => {
    setCurrent(1)
    initPage()
  }
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
      <div className='com-panel unclaimed-panel'>
        <h2>You have unclaimed Rewards</h2>
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
            }) : <Empty image="search" description="查询无结果"/>
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

export default memo(UnclaimedPanel)