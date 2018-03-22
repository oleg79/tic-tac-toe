import { connect } from 'react-redux'
import Header from './Header'
import { initGame } from './actions'

export default connect(
  ({ gameStatus }) => ({
    ...gameStatus
  }),
  {
    initGame
  }
)(Header)
