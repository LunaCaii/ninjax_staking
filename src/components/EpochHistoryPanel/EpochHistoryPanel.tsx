import { memo, useRef, useEffect, useState } from 'react'
import './styles/EpochHistoryPanel.scss'
import { useTranslation } from 'react-i18next'
import usdtIcon from '../../assets/images/icon-usdt.svg'
import ethIcon from '../../assets/images/icon-eth.svg'
import { Loading } from 'react-vant'

const EpochHistoryPanel = (props: any) => {
  const { t }:any = useTranslation()
  const scrollRef = useRef(null);
  const [hideElement, setHideElement] = useState(false);
  const [loading, setLoading] = useState(false)

  let list: any = []
  // eslint-disable-next-line array-callback-return
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

  useEffect(() => {
    const element: any = scrollRef.current
    element.addEventListener('scroll', handleScroll)
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='com-panel epoch-history'>
      <h2>Epoch History</h2>
      <div ref={scrollRef} className='list-container'>
      {
        loading ? <Loading className='cm-loading' size="24px" vertical>
          Loading...
        </Loading> : 
        data.map((item: any) => {
          return <div className='list-table'  key={`ep-${item.id}`}>
            <div className='list-tr thead'>
              <div className='width-left'>
                <div className='width-td1'>
                  <span className='title'>{item.title}</span>
                  <span className='table-ffbf6e-18 tag-sort'># {item.orderBy}</span>
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
                  <div className='info'>100,000</div>
                  <div className='label'>Total LP</div>
                </div>
                <div className='line'></div>
                <div className='width-td4 right'>
                  <div className='info'>200</div>
                  <div className='label'>Rewards</div>
                </div>
              </div>
            </div>
          </div>
        })
      }
      </div>
      {hideElement ? <></> : <div className='defalut-mask'></div>}
    </div>
  )
}

export default memo(EpochHistoryPanel)