import Web3Obj from 'web3'
import { EtherUnits } from 'web3-utils'
import { ContractAbi } from 'web3-types'
import ERC20ABI from './abi/ERC20ABI'
import StakingPool, { StakingPoolTypes } from './package/StakingPool'
import Token, { TokenTypes } from './package/Token'


export default class Web3SDK {
  private web3: Web3Obj
  public max: string
  public StakingPool: StakingPoolTypes
  public Token: TokenTypes

  constructor(priovider: any) {
    this.web3 = new Web3Obj(priovider)
    this.StakingPool = StakingPool
    this.Token = Token
    this.max =
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
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

  getGasPrice = (): Promise<bigint> => this.web3.eth.getGasPrice()

  getBlockNumber = (): Promise<bigint> => this.web3.eth.getBlockNumber()

  fromWei = (val: string | bigint, unit: EtherUnits = 'ether'): string => {
    if (Number(val) === 0) return '0'
    if (!val || isNaN(Number(val))) return '~'
    return this.web3.utils.fromWei(val, unit)
  }

  toWei = (val: string | bigint, unit: EtherUnits = 'ether'): string => this.web3.utils.toWei(val, unit)

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
}
