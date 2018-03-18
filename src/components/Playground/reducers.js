import { combineReducers } from 'redux'
import { fromJS } from 'immutable'
import { SET_CELL, AI_MOVE, PLAYER_MOVE } from './actions'
import { RESET_GAME } from '../Header/actions'

const initialBoard = fromJS([ Array(3), Array(3), Array(3) ])

const board = (state = initialBoard, { type, payload = [[], null] }) => ({
  [SET_CELL]: state.setIn(...payload),
  [RESET_GAME]: initialBoard
})[type] || state


const initialMoves = {
  AI: [],
  player: []
}

const moves = (state = initialMoves, { type, payload }) => ({
  [AI_MOVE]: {...state, AI: [ payload, ...state.AI ]},
  [PLAYER_MOVE]: {...state, player: [ payload, ...state.player ]},
  [RESET_GAME]: initialMoves
})[type] || state

export default combineReducers({
  board,
  moves
})
