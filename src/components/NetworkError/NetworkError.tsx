import './styles/NetworkError.scss'
import { memo } from 'react'
// import { web3SDK, isMetaMaskInstalled, connectWallet } from '../../common/contract/Web3Index'
import { useTranslation } from 'react-i18next'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'

const NetworkError = (props: any) => {
  const { t }:any = useTranslation()
  const { isConnected } = useAccount()
 
  const network = {
    title: 'Wallet not connected',
    contentText: 'Please keep the internet connected and connect to your wallet to continue.',
    btnText: 'Connect Wallet'
  }
  if (isConnected) return <></>
  return (
    <div className="network-error">
      <div className="content">
        <h1 className="content-title">{network.title}</h1>
        <p className='content-text'>
          {network.contentText}
        </p>
        <ConnectButton label={network.btnText} showBalance={false} />
      </div>
    </div>
  )
}

export default memo(NetworkError)