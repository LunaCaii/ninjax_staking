import { connect } from 'react-redux'
import StakingFormPanel from './StakingFormPanel'
import { web3SDK } from '../../contract'

const mapState = () => ({
})

const mapDispatch = () => ({
    userInfo: async () => await web3SDK.StakingPool.userInfo(),
})

export default connect(mapState, mapDispatch)(StakingFormPanel)