import { memo, useCallback, useEffect, useState } from 'react'
import './styles/StakingFormPanel.scss'
import { useTranslation } from 'react-i18next'
import { useAccount, useBalance } from 'wagmi'
import { Toast, Overlay, Loading } from 'react-vant'
import { web3SDK } from '../../contract'
import Bignumber from 'bignumber.js'
import eventBus from '../../common/utils/EventBus'

const StakingFormPanel = (props: any) => {
  const { t }: any = useTranslation()
  const { address }: any = useAccount()
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({ amount:'0' })
  const stakingTokenBalance = useBalance({
    address,
    token: props?.initialData?.stakingToken,
  }) // 当前META币余额
  const userAmount = !!props?.initialData?.stakingToken
      ? props.fromWei(stakingTokenBalance.data?.value)
      : ''

  const [tabType, setTabType] = useState('stake')
  const [allowAmount, setAllowAmount] = useState('')
  const [stakeInputVal, setStakeInputVal] = useState('') // 质押输入数量
  const [unStakeInputVal, setUnStakeInputVal] = useState('') // 解质押输入数量
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
    if (type === 'staking') {
      // query stake max amount (userAmount)
      if (address) {
        try {
          const _allowAmount = await web3SDK.StakingPool.allowanceStakingPool()
          console.log('---允许质押数量为', props.fromWei(_allowAmount))
          setAllowAmount(props.fromWei(_allowAmount))
        } catch(e) {
          console.log('---查询允许质押方法error',e)
        }
      }
    } else {
      // query unstake max amount (pendingClaim)
      try {
        setUserInfo(await props.userInfo())
        console.log('当前userInfo内容', userInfo)
      } catch(e: any){
        console.log('---查询userInfo当前可unstake数量error',e)
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
      return Toast(`请先输入`)
    } else if (Number(unStakeInputVal) > Number(props.fromWei(userInfo.amount))) {
      return Toast(`您的输入超出${props.fromWei(userInfo.amount)}`)
    }
    try {
      setLoading(true)
      await web3SDK.StakingPool.unstake(unStakeInputVal)
      await _initStakeOrUnstake('unStake')
      Toast('解除质押成功')
    } catch(e: any){
      console.log('---查询解除质押方法error',e)
      Toast('解除质押失败')
    } finally {
      sendMessage()
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    try {
      setLoading(true)
      await web3SDK.StakingPool.approveStakingPool()
      await _initStakeOrUnstake('stake')
      Toast('授权成功')
    } catch (e: any) {
      console.log('---查询授权方法error', e)
      Toast('授权失败')
    } finally {
      // sendMessage()
      setLoading(false)
    }
  }

  const handleStake = async () => {
    // 执行stake
    if (!stakeInputVal) {
      return Toast(`请先输入`)
    } else if (stakeInputVal > userAmount) {
      return Toast(`您的输入超出${userAmount}`)
    }
    try {
      setLoading(true)
      await web3SDK.StakingPool.stake(stakeInputVal)
      await _initStakeOrUnstake('stake')
      Toast('质押成功')
    } catch (e: any) {
      console.log('---查询质押方法error', e)
      Toast('质押失败')
    } finally {
      sendMessage()
      setLoading(false)
    }
  }

  const sendMessage = () => {
    eventBus.emit('reload-init')
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
                  ? props.fromWei(stakingTokenBalance.data?.value)
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
              Bignumber(allowAmount).lt(stakeInputVal) ? (
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
          <p className="text-error">* You can unstake after 7 days.</p>
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
          <p className="text-error">* You can unstake after 7 days.</p>
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
