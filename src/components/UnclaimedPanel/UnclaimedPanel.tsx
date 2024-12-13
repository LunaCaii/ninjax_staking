import { memo, useRef, useEffect, useState } from 'react'
import './styles/UnclaimedPanel.scss'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import usdtIcon from '../../assets/images/icon-usdt.svg'
import ethIcon from '../../assets/images/icon-eth.svg'
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
  
  fetchRewardByUserAddress({
    userAddress: address// '0xc38c63baf07505160d1292b1b9fa4955333e609b'
  }).then((res: any) => {
    console.log(res)
  }).catch((error: any) => {
    console.log(error)
  })
  let list: any = []
  Array(10).fill(1).map((item: any, index: any) => {
    list.push({
      id: index+1,
      title: `Epoch-${index+1}`,
      orderBy: index+1,
      totalMoney: 2000,
      list: [
        {
          imageUrl: usdtIcon,
          name: 'USDT',
          money: 1000
        },
        {
          imageUrl: ethIcon,
          name: 'ETH',
          money: 1000
        }
      ]
    })
  })
  const data = list;

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      // 当滚动到底部时，隐藏元素
      setHideElement(scrollHeight - scrollTop - clientHeight <= 1); // 留一个像素的边距
    }
  };

  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(21)
  const handleChange = (pageNum: any) => {
    console.log('点击调用后当前页码', pageNum)
    setCurrent(pageNum)
  }

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
                index: index
              }} key={`cc-${item.id}`} />
            })
          }
        </div>
        {hideElement ? <></> : <div className='defalut-mask'></div>}
      </div>
      <Pagination 
       current={current}
       pageSize={pageSize}
       total={total}
       onChange={handleChange}
       />
    </>
  )
}

export default memo(UnclaimedPanel)