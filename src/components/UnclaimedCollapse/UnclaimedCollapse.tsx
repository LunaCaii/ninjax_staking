import { memo, useEffect, useState } from 'react'
import './styles/UnclaimedCollapse.scss'
import { useTranslation } from 'react-i18next'
import { web3SDK } from '../../contract/index'


const UnclaimedCollapse = (props: any) => {
  const { t }:any = useTranslation()
  const [isOpen, setIsOpen] = useState(props.index < 2 ? true : false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClaim = () => {
    props.handleClaim(props)
  }

  return (
    <div className={`list-table isOpen-${String(isOpen)}`}  key={`up-${props.epoch}`}>
      <div className='list-tr thead' onClick={toggleOpen}>
        <div className='width-left'>
          <div className='width-td1 styles2'>
            <span className='title'>Epoch-{props.epoch}</span>
            <span className='table-ffbf6e-18 tag-sort'># {props.epoch}</span>
          </div>
          {/* <div className='width-td2'>
            <span className='table-ffbf6e-18 money'>$ {props.totalMoney}</span>
          </div> */}
        </div>
        <div className='width-right styles2'>
          <div className='width-td3'>
            <span className='table-ffffff-16'>Epoch Rewards: </span>
            <span className='table-ffffff-16 money color-ffbf6e'>{web3SDK.fromWei(props.epochRewardAmount)}</span>
            <span className='table-ffffff-16 color-ffbf6e'> {props.tokenSymbol}</span>
          </div>
          <span className='icon-arrow'></span>
        </div>
      </div>
      <div className='list-detail'>
        {/*  <div className='list-box'>
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
        </div> */}
        <div className='list-box styles2'>
          <div className='list-tr item'>
            <div className='width-all'>
              <div className='width-td1 styles2-son'>
                <span className='table-ffffff-16'>My Rewards</span>
              </div>
              <div className='width-td2 styles2-son'>
                <span className='table-ffffff-16'>Token</span>
              </div>
              <div className='width-td2 styles2-son'>
                <span className='table-ffffff-16'>Amount</span>
              </div>
            </div>
          </div>
          <div className='list-tr item'>
            <div className='width-all'>
              <div className='width-td1 styles2-son'>
                <span className='table-ffffff-16'>&nbsp;</span>
              </div>
              <div className='width-td2 styles2-son'>
                <span className='table-ffffff-16 color-ffbf6e'>{props.tokenSymbol}</span>
              </div>
              <div className='width-td2 styles2-son'>
                <span className='table-ffffff-16 color-ffbf6e'>{web3SDK.fromWei(props.rewardAmount)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='box-right'>
          <button className={`table-btn-ffbf6e btn-claim ${props.claimed.toString() === 'true' ? 'disabled' : ''}`} onClick={handleClaim}>Claim</button>
        </div> */}
      </div>
    </div>
  )
}

export default memo(UnclaimedCollapse)