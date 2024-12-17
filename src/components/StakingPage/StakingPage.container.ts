import { connect } from 'react-redux'
import StakingPage from './StakingPage'
import { web3SDK } from '../../contract'
import { RootState } from '../../common/store/reducer'

const mapState = (state: RootState) => ({
    ...state
})

const mapDispatch = () => ({
    fromWei: (val: string) => web3SDK.fromWei(val),
    tokenInfo: async (tokenAddress: string) => await web3SDK.Token.tokenInfo(tokenAddress),
    stakingToken: async () => await web3SDK.StakingPool.stakingToken(),
})

export default connect(mapState, mapDispatch)(StakingPage)