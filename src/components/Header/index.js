import { connect } from 'react-redux'
import Header from './Header'
import { initGame, setAIType } from './actions'

export default connect(
  ({ gameStatus }) => ({
    ...gameStatus
  }),
  {
    initGame,
    setAIType,
  }
)(Header)
