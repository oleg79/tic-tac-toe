import { combineReducers } from 'redux'
import gameStatus from '../components/Header/reducers'
import playground from '../components/Playground/reducers'

export default combineReducers({
  gameStatus,
  playground,
})
