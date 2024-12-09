import React, { memo } from 'react'
import './react-i18next-config'
import 'reset-css'
import './assets/styles/common.scss'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { Routes } from './components/Routes'
import { BrowserRouter } from 'react-router-dom'
import { initStore } from './common/store/store'
import reportWebVitals from './reportWebVitals'

import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { config, getLanguage } from './core/config'
console.log('Show Config info ---', config, getLanguage())


const queryClient = new QueryClient()
const Entry = memo(() => {
  // const darkMode = useDarkMode()
  const connectVal = window.localStorage.getItem('connect')
  console.log('connectVal', !!connectVal)
  return (
    <WagmiProvider config={config} reconnectOnMount={!!connectVal}>
      <QueryClientProvider client={queryClient} >
        <RainbowKitProvider locale={getLanguage()} theme={lightTheme()} initialChain={179}>
          <>
            {/* <React.StrictMode> */}
              <Provider store={initStore()}>
                <BrowserRouter>
                  <Routes />
                </BrowserRouter>
              </Provider>
            {/* </React.StrictMode> */}
          </>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
})


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Entry />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()