import { combineReducers } from 'redux'
import gameStatus from '../components/Header/reducers'
import playground from '../components/PlayGround/reducers'

export default combineReducers({
  gameStatus,
  playground,
})
