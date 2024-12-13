import { memo, useRef, useEffect, useState } from 'react'
import './styles/WithdrawalActivityPanel.scss'
import { useTranslation } from 'react-i18next'
import ninjaxSvg from '../../assets/images/ninjax-logo.svg'
import { Loading } from 'react-vant'

const WithdrawalActivityPanel = (props: any) => {
  const { t }:any = useTranslation()
  const scrollRef = useRef(null);
  const [hideElement, setHideElement] = useState(false);
  const [loading, setLoading] = useState(true)

  const [tabType, setTabType] = useState('pending')
  const changeTab = (type: string) => {
    setTabType(type)
  }

  let list: any = []
  Array(10).fill(1).map((item: any, index: any) => {
    list.push({
      id: index + 1,
      imageUrl: ninjaxSvg,
      name: `NINJAX-${index}`,
      requestAmount: 10.2,
      claimTime: 'In 5d 2h'
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
    <div className='com-panel withdraw-activity'>
      <div className='box-title'>
        <h2>Withdrawal Activity</h2>
        <div className='box-switch'>
          <div className={`switch-item ${tabType === 'pending' ? 'active' : ''}`} onClick={() => changeTab('pending')}>Pending</div>
          <div className={`switch-item ${tabType === 'close' ? 'active' : ''}`} onClick={() => changeTab('close')}>Close</div>
        </div>
      </div>
      <div ref={scrollRef} className='list-container'>
        { 
          loading ? <Loading className='cm-loading' size="24px" vertical>
            Loading...
          </Loading> :
          data.map((item: any) => {
            return <div className='list-each-item' key={`ac-${item.id}`}>
              <div className='com-staking-item-box table-line'>
                <div className='logo-name'>
                  <div className='logo'>
                    <img src={item.imageUrl} alt='' />
                  </div>
                  <div className='name'>{item.name}</div>
                </div>
                <div className='label-value'>
                  <p className='value'>{item.requestAmount}</p>
                  <p className='label'>Request Amount</p>
                </div>
                <div className='label-value'>
                  <p className='value'><i className='icon-time'></i><span className='text-time'>{item.claimTime || '--'}</span></p>
                  <p className='label'>Claim Time</p>
                </div>
                <div className='btn-claim'>
                  <button className={`table-btn-ffdd85 click`}>Claim</button>
                </div>
              </div>
            </div>
          })
        }
        {hideElement ? <></> : <div className='defalut-mask'></div>}
      </div>
    </div>
  )
}

export default memo(WithdrawalActivityPanel)