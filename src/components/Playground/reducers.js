import { combineReducers } from 'redux'
import { fromJS } from 'immutable'
import { SET_CELL, AI_MOVE, PLAYER_MOVE } from './actions'
import { RESET_GAME, AI_WIN, PLAYER_WIN } from '../Header/actions'

const generateBoard = n => fromJS(Array(n).fill(1).map(() => Array(n)))

const generateBoardState = n => ({
  size: n,
  board: generateBoard(n)
})

const initialBoard = generateBoardState(3)

const board = (state = initialBoard, { type, payload = [[], null] }) => {
  switch (type) {
    case SET_CELL:
      return  { ...state, board: state.board.setIn(...payload) }
    case RESET_GAME:
      return initialBoard;
    case AI_WIN:
    case PLAYER_WIN:
      return generateBoardState(state.size)
  }
  return state
}


const initialMoves = {
  AI: [],
  player: []
}

const moves = (state = initialMoves, { type, payload }) => ({
  [AI_MOVE]: {...state, AI: [ payload, ...state.AI ]},
  [PLAYER_MOVE]: {...state, player: [ payload, ...state.player ]},
  [RESET_GAME]: initialMoves,
  [AI_WIN]: initialMoves,
  [PLAYER_WIN]: initialMoves,
})[type] || state

export default combineReducers({
  board,
  moves
})
