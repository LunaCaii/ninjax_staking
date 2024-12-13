import Web3SDK from './Web3SDK'
const {
  REACT_APP_CHAIN_ID,
  REACT_APP_CHAIN_NAME,
  REACT_APP_CHAIN_RPC,
  REACT_APP_CHAIN_MAIN_SYMBOL,
} = process.env

/**
 * Check whether to inject ethereum object, used to determine whether to install Metamask
 * @returns result Boolean
 */
export const isMetaMaskInstalled = (): boolean => {
  const { ethereum } = window
  return Boolean(ethereum && ethereum.isMetaMask)
}

/**
 * Initialize the web3 instance
 */
export const web3SDK = new Web3SDK(window.ethereum)

/**
 * Connect wallet account to get information
 * @returns
 */
export const connectWallet = (): Promise<Array<string>> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        window?.ethereum?.request({
          method: 'eth_requestAccounts',
        })
      )
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * wallet account signature
 * @param nonce string
 * @returns result string
 */
export const personalSign = (nonce: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    window.ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .then(async ([account]: Array<string>) => {
        try {
          const result = await window?.ethereum?.request({
            method: 'personal_sign',
            params: [nonce, account],
          })
          resolve(result)
        } catch (err) {
          console.error(err)
          reject(err)
        }
      })
  })
}

export const isMatchChainId = (): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      try {
        const chainID = window.ethereum.chainId
        if (typeof chainID === 'string') {
          resolve(Number(chainID) === Number(REACT_APP_CHAIN_ID))
        }

        if (typeof chainID === 'number') {
          resolve(chainID.toString(10) === REACT_APP_CHAIN_ID)
        }
      } catch (error) {
        reject(error)
      }
    }, 100);
  })
}

export const switch2Network = async () => {
  if (!isMetaMaskInstalled()) {
    window.open('https://metamask.io/download')
    return
  }
  const hexChainID = '0x' + Number(REACT_APP_CHAIN_ID).toString(16)
  try {
    await window?.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexChainID }],
    })
    window.location.reload()
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await window?.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: hexChainID,
              chainName: REACT_APP_CHAIN_NAME,
              rpcUrls: [REACT_APP_CHAIN_RPC],
              nativeCurrency: {
                name: REACT_APP_CHAIN_MAIN_SYMBOL,
                symbol: REACT_APP_CHAIN_MAIN_SYMBOL,
                decimals: 18,
              },
            },
          ],
        })
        window.location.reload()
      } catch (addError) {
        // handle "add" error
      }
    }
  }
}

export const onAccountChange = (cb: Function) => {
  try {
    window?.ethereum?.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length) cb(accounts[0])
      else cb(null)
    })
  } catch (err) { }
}

export const onChainChange = (cb: Function) => {
  try {
    window?.ethereum?.on('chainChanged', (chainID: string) => {
      if (chainID) cb(chainID)
      else cb(null)
    })
  } catch (err) {
    console.warn(err)
  }
}
