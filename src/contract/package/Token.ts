import { web3SDK } from '../index'
import ERC20ABI from '../abi/ERC20ABI'

const tokenInfo = async (tokenAddress: string): Promise<any> => {
    const tokenContractObj = await web3SDK.createContractObj(ERC20ABI, tokenAddress as string)
    const decimals = await tokenContractObj.methods.decimals().call()
    const symbol = await tokenContractObj.methods.symbol().call()

    return {
        symbol,
        decimals,
        tokenAddress
    }
}

export type TokenTypes = {
    tokenInfo: (tokenAddress: string) => Promise<any>
}

const exportObj = {
    tokenInfo
}

export default exportObj 