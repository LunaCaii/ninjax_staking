import Web3Obj from 'web3'
import { EtherUnits } from 'web3-utils'
import { ContractAbi } from 'web3-types'
import BigNumber from 'bignumber.js'
import { isAddress } from 'web3-validator';
import ERC20ABI from './abi/ERC20ABI.json'

export default class Web3SDK {
  private web3: Web3Obj

  static max =
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

  constructor(priovider: any) {
    this.web3 = new Web3Obj(priovider)
  }

  // Base Func
  /**
   * Get the current authorized account address
   * @returns <string[address]>
   */
  getAccount = async (): Promise<string[]> => await this.web3.eth.getAccounts()

  /**
   * Get the balance of the main network currency of the account
   * @param address string
   * @returns amount(unit:wei)
   */
  getBalance = (address: string) => this.web3.eth.getBalance(address)

  getGasPrice = (): Promise<any> => this.web3.eth.getGasPrice()

  getBlockNumber = (): Promise<bigint> => this.web3.eth.getBlockNumber()

  isAddress = (address: string): boolean => isAddress(address.toLocaleLowerCase())

  fromWei = (val: string | bigint, unit: EtherUnits = 'ether'): string => {
    if (Number(val) === 0) return '0'
    if (!val || isNaN(Number(val))) return '~'
    return this.web3.utils.fromWei(val, unit)
  }

  fromWeiDecimal = (val: string, decimal: number | string = 18, isFix = false): string => {
    if (Number(val) === 0) return '0'
    if (!val || isNaN(Number(val))) return '~'
    return isFix
      ? new BigNumber(val).div(new BigNumber(Math.pow(10, Number(decimal)))).toFixed(Number(decimal), 1).toString()
      : new BigNumber(val).div(new BigNumber(Math.pow(10, Number(decimal)))).toString()
  }

  toWei = (val: string | bigint, unit: EtherUnits = 'ether'): string => {
    if (Number(val) === 0) return '0'
    if (!val || isNaN(Number(val))) return '~'
    return this.web3.utils.toWei(val, unit)
  }

  toHex = (val: string): string => {
    return this.web3.utils.toHex(val)
  }

  hexToNumber = (hexVal: any): any => {
    return this.web3.utils.hexToNumber(hexVal)
  }

  toWeiDecimal = (val: string, decimals: number | string = 18): string => {
    if (Number(val) === 0) return '0'
    if (!val || isNaN(Number(val))) return '~'
    return new BigNumber(10).pow(decimals).multipliedBy(new BigNumber(val)).toFixed(0, 1).toString()
  }
 
  sendTransaction = async (transaction: any) => this.web3.eth.sendTransaction(transaction)

  getTransactionCount = async (address: any) => this.web3.eth.getTransactionCount(address)
  
  estimateGas = async (transaction: any) => this.web3.eth.estimateGas(transaction)
  
  /**
   * Query the number of specified tokens
   * @param {string} token_contractAddress
   * @param {string} user_address
   * @returns
   */
  getCustomBalanceOf = async (
    token_contractAddress: string,
    user_address: string
  ) =>
    await new this.web3.eth.Contract(ERC20ABI, token_contractAddress).methods
      .balanceOf(user_address)
      .call()

  /**
   * Create contract object
   * @param ABI json abi
   * @param tokenContractAddr string
   * @returns
   */
  createContractObj = async (
    ABI: ContractAbi,
    tokenContractAddr: string
  ): Promise<any> => new this.web3.eth.Contract(ABI, tokenContractAddr)
  
  createERC20ContractObj = async (
    tokenContractAddr: string
  ): Promise<any> => new this.web3.eth.Contract(ERC20ABI, tokenContractAddr)
}