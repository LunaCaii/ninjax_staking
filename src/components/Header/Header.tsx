import { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Header.scss'
import { useTranslation } from 'react-i18next'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi'
import NetworkError from '../NetworkError/NetworkError';
import Routers from '../Routes/routerMap'
import { useRouteName } from '../../common/utils/format'

const Header = (props: any) => {
  const navigate = useNavigate()
  const { t }:any = useTranslation()
  const routeName = useRouteName(Routers)

  const { connectors, disconnect } = useDisconnect()
  const { address, status, isConnected } = useAccount()
  
  return (
    <div className='com-header'>
      <div className='hd-logo'></div>
      <ul className='hd-menus'>
        <li className={`hd-menu hd-menu-style-css ${window.location.pathname === ('/') ? 'active' : ''}`}
        onClick={() => navigate('/')}>SWAP</li>
        <li className={`hd-menu hd-menu-style-css ${window.location.pathname.includes('/pools') ? 'active' : ''}`}
        onClick={() => navigate('/pools')}>POOLS</li>
        <li className={`hd-menu hd-menu-style-css ${window.location.pathname.includes('/liquidity') ? 'active' : ''}`}
        onClick={() => navigate('/liquidity')}>LIQUIDITY</li>
        <li className={`hd-menu hd-menu-style-css ${window.location.pathname.includes('/earn') ? 'active' : ''}`}
        onClick={() => navigate('/earn')}>EARN</li>
        <li className={`hd-menu hd-menu-style-css ${window.location.pathname.includes('/staking') ? 'active' : ''}`}
        onClick={() => navigate('/staking')}>STAKING</li>
      </ul>
      <div className='hd-connects'>
        <ConnectButton accountStatus="address"/>
      </div>
      {/* { routeName === 'notFound' ? <></> : <NetworkError /> } */}
    </div>
  )
}

export default memo(Header)