import { memo, useCallback, useEffect, useState } from 'react'
import './styles/StakingFormPanel.scss'
import { useTranslation } from 'react-i18next'
import { useAccount, useBalance } from 'wagmi'
import { Toast, Overlay, Loading } from 'react-vant'
import { web3SDK } from '../../contract'
import BigNumber from 'bignumber.js'
import eventBus from '../../common/utils/EventBus'
import { toDisplay } from '../../core/config'

const StakingFormPanel = (props: any) => {
  const { t }: any = useTranslation()
  const { address }: any = useAccount()
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({ amount:'0' })
  const stakingTokenBalance = useBalance({
    address,
    token: props?.initialData?.stakingToken,
  }) // Current META coin balance
  const userAmount = !!props?.initialData?.stakingToken
      ? props.fromWei(stakingTokenBalance.data?.value)
      : ''

  const [tabType, setTabType] = useState('stake')
  const [allowAmount, setAllowAmount] = useState('')
  const [stakeInputVal, setStakeInputVal] = useState('') // Stake Input Quantity
  const [unStakeInputVal, setUnStakeInputVal] = useState('') // Unstaking input quantity
  const handleChangeVal = (event: any) => {
    setStakeInputVal(event.target.value)
  }
  const handleChangeUVal = (event: any) => {
    setUnStakeInputVal(event.target.value)
  }
  const handleMax = () => {
    let _maxVal: any
    if (tabType === 'stake') {
      _maxVal = Number(userAmount + '')
      setStakeInputVal(_maxVal)
    } else {
      _maxVal = props.fromWei(userInfo.amount)
      setUnStakeInputVal(_maxVal)
    }
  }

  const _initStakeOrUnstake = async(type: string) => {
    if (type === 'stake') {
      // query stake max amount (userAmount)
      if (address) {
        try {
          const _allowAmount = await web3SDK.StakingPool.allowanceStakingPool()
          console.log('---The allowed pledge amount is', props.fromWei(_allowAmount))
          setAllowAmount(props.fromWei(_allowAmount))
        } catch(e) {
          console.log('---Query allowed pledge methods error',e)
        }
      }
    } else {
      // query unstake max amount (pendingClaim)
      try {
        setUserInfo(await props.userInfo())
        console.log('Current userInfo content', userInfo)
      } catch(e: any){
        console.log('---Query the current unstake quantity of userInfo error',e)
      }
    }
  }
  const changeTab = async(type: string) => {
    setTabType(type)
    setStakeInputVal('')
    setUnStakeInputVal('')
    _initStakeOrUnstake(type)
  }
  const handleUnstake = async() => {
    if (!unStakeInputVal) {
      return Toast(`Please enter first`)
    } else if (new BigNumber(props.fromWei(userInfo.amount)).lt(new BigNumber(unStakeInputVal))) {
      return Toast(`Your input exceeds ${props.fromWei(userInfo.amount)}`)
    }
    try {
      setLoading(true)
      await web3SDK.StakingPool.unstake(unStakeInputVal)
      await _initStakeOrUnstake('unstake')
      Toast('Successfully released the pledge')
    } catch(e: any){
      console.log('---Query the method to release the pledge error',e)
      Toast('Unstaking failed')
    } finally {
      sendMessage('unstake')
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    try {
      setLoading(true)
      await web3SDK.StakingPool.approveStakingPool()
      await _initStakeOrUnstake('stake')
      Toast('Authorization successful')
    } catch (e: any) {
      console.log('---Query authorization method error', e)
      Toast('Authorization failed')
    } finally {
      // sendMessage()
      setLoading(false)
    }
  }

  const handleStake = async () => {
    // Execute Stake
    if (!stakeInputVal) {
      return Toast(`Please enter first`)
    } else if (new BigNumber(userAmount).lt(new BigNumber(stakeInputVal))) {
      return Toast(`Your input exceeds ${userAmount}`)
    }
    try {
      setLoading(true)
      await web3SDK.StakingPool.stake(stakeInputVal)
      await _initStakeOrUnstake('stake')
      Toast('Pledge Success')
    } catch (e: any) {
      console.log('---Query pledge method error', e)
      Toast('Pledge Failure')
    } finally {
      sendMessage('stake')
      setLoading(false)
    }
  }

  const sendMessage = (type: any) => {
    eventBus.emit('reload-init', type)
  }

  const fetch = useCallback(async () => { 
    _initStakeOrUnstake('stake')
  },[])

  useEffect(() => {
    fetch()
  }, [])
  return (
    <div className="com-panel panel-form">
      <div className="form-tabs">
        <div
          className={`form-tab ${tabType === 'stake' ? 'active' : ''}`}
          onClick={() => changeTab('stake')}
        >
          Stake
        </div>
        <div
          className={`form-tab ${tabType === 'unstake' ? 'active' : ''}`}
          onClick={() => changeTab('unstake')}
        >
          Unstake
        </div>
      </div>
      {tabType === 'stake' ? (
        <>
          <div className="panel-input group-l-f">
            <div className="div-input">
              <input className="input-ninjax" readOnly placeholder="Available" />
            </div>
            <div className="div-other">
              <p className="text-balace">
                {!!props?.initialData?.stakingToken
                  ? toDisplay(props.fromWei(stakingTokenBalance.data?.value))
                  : '~'}{' '}
                {stakingTokenBalance.data?.symbol}
              </p>
              {/* <p className="text-fee">≈$8888.00</p> */}
            </div>
          </div>
          <div className="panel-input group-t-b">
            <p className="text-title">Amount</p>
            <div className="div-input-box">
              <div className="div-input">
                <input className="input-amount" value={stakeInputVal} placeholder="0.0" onChange={handleChangeVal} />
              </div>
              <div className="btn-to-max" onClick={handleMax}>Max</div>
            </div>
          </div>

          <div className="btn-all">
            {
              new BigNumber(allowAmount).lt(new BigNumber(stakeInputVal)) ? (
              <button className="table-btn-ffbf6e size-all" onClick={handleApprove}>
                Approve
              </button>
              ) : (
              <button className="table-btn-ffbf6e size-all" onClick={handleStake}>
                Stake
              </button>
              )
            }
          </div>
          {/* <p className="text-error">* You can unstake after 7 days.</p> */}
        </>
      ) : (
        <>
          <div className="panel-input group-l-f">
            <div className="div-input">
              <input className="input-ninjax" readOnly placeholder="Available" />
            </div>
            <div className="div-other">
              <p className="text-balace">{props.fromWei(userInfo.amount) || '~'}{' '}
                {stakingTokenBalance.data?.symbol}</p>
              {/* <p className="text-fee">≈$8888.00</p> */}
            </div>
          </div>
          <div className="panel-input group-t-b">
            <p className="text-title">Amount</p>
            <div className="div-input-box">
              <div className="div-input">
                <input className="input-amount" value={unStakeInputVal} placeholder="0.0" onChange={handleChangeUVal}/>
              </div>
              <div className="btn-to-max" onClick={handleMax}>Max</div>
            </div>
          </div>
          <div className="btn-all">
            <button className="table-btn-ffbf6e size-all" onClick={handleUnstake}>Unstake</button>
          </div>
          {/* <p className="text-error">* You can claim after 7 days.</p> */}
        </>
      )}
    <Overlay visible={loading}  style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
      <Loading className='cm-loading inline' size="24px">Loading...</Loading>
    </Overlay>
    </div>
  )
}

export default memo(StakingFormPanel)
