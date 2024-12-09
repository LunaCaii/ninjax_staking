import { memo, useEffect, useState } from 'react'
import './styles/UnclaimedPanel.scss'
import { useTranslation } from 'react-i18next'
import usdtIcon from '../../assets/images/icon-usdt.svg'
import ethIcon from '../../assets/images/icon-eth.svg'

const UnclaimedPanel = (props: any) => {
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
    <div className='com-panel unclaimed-panel'>
      <h2>You have unclaimed Rewards</h2>
      <div className='list-container'>
        { data.map((item: any) => {
          return <div className={`list-table isOpen-${String(item.isOpen)}`}>
            <div className='list-tr thead'>
              <div className='width-left'>
                <div className='width-td1'>
                  <span className='title'>{item.title}-{String(item.isOpen)}</span>
                  <span className='table-ffbf6e-18 tag-sort'># {item.orderBy}</span>
                </div>
                <div className='width-td2'>
                  <span className='table-ffbf6e-18 money'>$ {item.totalMoney}</span>
                </div>
              </div>
              <div className='width-right'>
                <span className='icon-arrow' onClick={() => {
                  updateItemOpen(item, !item.isOpen)
                }}></span>
              </div>
            </div>
            <div className='list-detail'>
              <div className='list-box'>
                {
                  item.list.map((sonItem: any) => {
                    return <div className='list-tr item'>
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
        })
      }
        <div className='defalut-mask'></div>
      </div>
    </div>
  )
}

export default memo(UnclaimedPanel)