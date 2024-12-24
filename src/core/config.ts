// import { http, createConfig } from 'wagmi'
import { getDefaultConfig, Chain, Locale } from '@rainbow-me/rainbowkit'
const {
  REACT_APP_CHAIN_ID,
  REACT_APP_CHAIN_NAME,
  REACT_APP_CHAIN_RPC,
  REACT_APP_CHAIN_MAIN_SYMBOL
} = process.env

const tabiChain = {
  id: Number(REACT_APP_CHAIN_ID),
  name: `${REACT_APP_CHAIN_NAME}`,
  iconUrl: 'https://testnetv2.tabiscan.com/favicon/favicon.ico',
  nativeCurrency: { name: `${REACT_APP_CHAIN_MAIN_SYMBOL}`, symbol: `${REACT_APP_CHAIN_MAIN_SYMBOL}`, decimals: 18 },
  rpcUrls: {
    default: { http: [`${REACT_APP_CHAIN_RPC}`] },
  }
} as const satisfies Chain;

export const config = getDefaultConfig({
  appName: 'ninjax_staking',
  projectId: '73123f0f99f61cd3ca63cff8b628a188',
  chains: [tabiChain],
  ssr: false,
})

export const getLanguage = (): Locale => {
  const str: any = window.localStorage.getItem('i18nextLng') || 'en'
  return str === 'cn' ? 'zh-CN' : 'en-US'
}

export const toPercent = (point: number | string, decimal: number = 4) => {
  if (isNaN(Number(point))) return '~'
  point = Number(Number(point) * 100).toString()
  let index = point.indexOf('.')
  if (index !== -1) {
    point = point.substring(0, decimal + index + 1)
  } else {
    point = point.substring(0)
  }
  return `${parseFloat(point).toFixed(decimal)} %`
}

export const toDisplay = (num: string | number | null, fixed: number = 2) => {
  if (Number(num) === 0) return 0
  if (!num || isNaN(Number(num))) return '~'
  num = num.toString()
  const index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, fixed + index + 1)
  } else {
    num = num.substring(0)
  }
  return Number(parseFloat(num).toFixed(fixed))
}

// export const config = createConfig({
//   chains: [tabiChain],
//   transports: {
//     [tabiChain.id]: http(),
//   },
// })