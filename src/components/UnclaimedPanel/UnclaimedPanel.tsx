import { memo, useEffect, useState } from 'react'
import './styles/UnclaimedPanel.scss'
import { useTranslation } from 'react-i18next'
import usdtIcon from '../../assets/images/icon-usdt.svg'
import ethIcon from '../../assets/images/icon-eth.svg'
import { UnclaimedCollapse } from '../UnclaimedCollapse'

const UnclaimedPanel = (props: any) => {
  const { t }:any = useTranslation()

  const data = [
    {
      id: 1,
      title: 'Epoch-1',
      orderBy: 1,
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
    },
    {
      id: 2,
      title: 'Epoch-2',
      orderBy: 2,
      totalMoney: 3000,
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
    },
    {
      id: 3,
      title: 'Epoch-3',
      orderBy: 3,
      totalMoney: 300,
      list: [
        {
          imageUrl: usdtIcon,
          name: 'USDT',
          money: 100
        },
        {
          imageUrl: ethIcon,
          name: 'ETH',
          money: 200
        }
      ]
    }
  ]

  return (
    <div className='com-panel unclaimed-panel'>
      <h2>You have unclaimed Rewards</h2>
      <div className='list-container'>
        { data.map((item: any, index: any) => {
          return <UnclaimedCollapse {...{
            ...item,
            index: index
          }} key={`cc-${item.id}`} />
        })
      }
        <div className='defalut-mask'></div>
      </div>
    </div>
  )
}

export default memo(UnclaimedPanel)