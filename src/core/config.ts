// import { http, createConfig } from 'wagmi'
import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit'
const {
  REACT_APP_CHAIN_ID,
  REACT_APP_CHAIN_NAME,
  REACT_APP_CHAIN_RPC,
  REACT_APP_CHAIN_MAIN_SYMBOL
} = process.env

const abeyChain = {
  id: Number(REACT_APP_CHAIN_ID),
  name: `${REACT_APP_CHAIN_NAME}`,
  iconUrl: 'https://abeyscan.com/assers/img/logo.0ecbc0d8.png',
  nativeCurrency: { name: `${REACT_APP_CHAIN_MAIN_SYMBOL}`, symbol: `${REACT_APP_CHAIN_MAIN_SYMBOL}`, decimals: 18 },
  rpcUrls: {
    default: { http: [`${REACT_APP_CHAIN_RPC}`] },
  }
} as const satisfies Chain;

export const config = getDefaultConfig({
  appName: 'interapp_frontend',
  projectId: '6ff288b9af4d3b7f0b7838342c3b4efd',
  chains: [abeyChain],
  ssr: false,
})

export const getLanguage: any = () => {
  // cn -- 中文； en -- 英文；
  const str: any = window.localStorage.getItem('i18nextLng') || 'en'
  return (str === 'cn' ? 'zh-CN' : 'en-US') || 'en-US'
}

// export const config = createConfig({
//   chains: [abeyChain],
//   transports: {
//     [abeyChain.id]: http(),
//   },
// })