import { memo, useRef, useEffect, useState } from 'react'
import './styles/UnclaimedPanel.scss'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { UnclaimedCollapse } from '../UnclaimedCollapse'
import { Loading } from 'react-vant'
import { Pagination } from '../Pagination'
import { fetchRewardByUserAddress } from '../../common/ajax/index'

const UnclaimedPanel = (props: any) => {
  const { t }:any = useTranslation()
  const scrollRef = useRef(null);
  const [hideElement, setHideElement] = useState(false);
  const [loading, setLoading] = useState(false)
  const { address, status, isConnected } = useAccount()
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
  const handleClaimClick = ({handleClaim, ...other}: any) => {
    console.log('当前claim点击事件', other)
  }

  const initPage = () => {
    setLoading(true)
    fetchRewardByUserAddress({
      userAddress: '0xc38c63baf07505160d1292b1b9fa4955333e609b',
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
  }, [])
  useEffect(() => {
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
            </Loading> : 
            data.map((item: any, index: any) => {
              return <UnclaimedCollapse {...{
                ...item,
                index: index + 1,
                handleClaim: handleClaimClick
              }} key={`cc-${item.epoch}`} />
            })
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