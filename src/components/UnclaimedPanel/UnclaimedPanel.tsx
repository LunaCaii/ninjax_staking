import { memo, useEffect, useState } from 'react'
import './styles/UnclaimedPanel.scss'
import { useTranslation } from 'react-i18next'
import usdtIcon from '../../assets/images/icon-usdt.svg'
import ethIcon from '../../assets/images/icon-eth.svg'
import { UnclaimedCollapse } from '../UnclaimedCollapse'

const UnclaimedPanel = (props: any) => {
  const { t }:any = useTranslation()

  let list: any = []
  Array(10).fill(1).map((item: any, index: any) => {
    console.log(item, index)
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
      </div>
      <div className='defalut-mask'></div>
    </div>
  )
}

export default memo(UnclaimedPanel)