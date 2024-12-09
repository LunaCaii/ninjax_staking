import { memo, useEffect, useState } from 'react'
import './styles/EpochHistoryPanel.scss'
import { useTranslation } from 'react-i18next'
import usdtIcon from '../../assets/images/icon-usdt.svg'
import ethIcon from '../../assets/images/icon-eth.svg'

const EpochHistoryPanel = (props: any) => {
  const { t }:any = useTranslation()

  const data = [
    {
      id: 1,
      title: 'Epoch-1',
      orderBy: 1,
      totalMoney: 2000,
      isOpen: true,
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
    },
    {
      id: 2,
      title: 'Epoch-2',
      orderBy: 2,
      totalMoney: 3000,
      isOpen: false,
      list: [
        {
          imageUrl: usdtIcon,
          name: 'USDT',
          money: 2000
        },
        {
          imageUrl: ethIcon,
          name: 'ETH',
          money: 1000
        }
      ]
    }
  ]

  const updateItemOpen = (changeItem: any, isOpen: Boolean) => {
  };

  return (
    <div className='com-panel epoch-history'>
      <h2>Epoch History</h2>
      <div className='list-container'>
        { data.map((item: any) => {
          return <div className='list-table'  key={`ep-${item.id}`}>
            <div className='list-tr thead'>
              <div className='width-left'>
                <div className='width-td1'>
                  <span className='title'>{item.title}-{String(item.isOpen)}</span>
                  <span className='table-ffbf6e-18 tag-sort'># {item.orderBy}</span>
                </div>
              </div>
            </div>
            <div className='list-detail'>
              <div className='list-box-column'>
                <div className='width-td4 left'>
                  <div className='info'>No</div>
                  <div className='label'>Out of range?</div>
                </div>
                <div className='line'></div>
                <div className='width-td4 center'>
                  <div className='info'>$100,000</div>
                  <div className='label'>Total LP</div>
                </div>
                <div className='line'></div>
                <div className='width-td4 right'>
                  <div className='info'>$200</div>
                  <div className='label'>Rewards</div>
                </div>
              </div>
            </div>
          </div>
        })
      }
        <div className='defalut-mask'></div>
      </div>
    </div>
  )
}

export default memo(EpochHistoryPanel)