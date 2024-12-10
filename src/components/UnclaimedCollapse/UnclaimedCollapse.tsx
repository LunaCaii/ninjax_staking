import { memo, useEffect, useState } from 'react'
import './styles/UnclaimedCollapse.scss'
import { useTranslation } from 'react-i18next'

const UnclaimedCollapse = (props: any) => {
  const { t }:any = useTranslation()
  const [isOpen, setIsOpen] = useState(props.index < 2 ? true : false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`list-table isOpen-${String(isOpen)}`}  key={`up-${props.id}`}>
      <div className='list-tr thead' onClick={toggleOpen}>
        <div className='width-left'>
          <div className='width-td1'>
            <span className='title'>{props.title}</span>
            <span className='table-ffbf6e-18 tag-sort'># {props.orderBy}</span>
          </div>
          <div className='width-td2'>
            <span className='table-ffbf6e-18 money'>$ {props.totalMoney}</span>
          </div>
        </div>
        <div className='width-right'>
          <span className='icon-arrow'></span>
        </div>
      </div>
      <div className='list-detail'>
        <div className='list-box'>
          {
            props.list.map((sonItem: any, sonIndex: any) => {
              return <div className='list-tr item' key={`son-${sonIndex}`}>
                <div className='width-all'>
                  <div className='width-td1'>
                    <div className='td-logo'><img src={sonItem.imageUrl} alt='' /></div>
                    <span className='table-ffffff-16 name'>{sonItem.name}</span>
                  </div>
                  <div className='width-td2'>
                    <span className='table-ffffff-16 money'>$ {sonItem.money}</span>
                  </div>
                </div>
              </div>
            })
          }
        </div>
        <div className='box-right'>
          <button className='table-btn-ffbf6e btn-claim'>Claim</button>
        </div>
      </div>
    </div>
  )
}

export default memo(UnclaimedCollapse)