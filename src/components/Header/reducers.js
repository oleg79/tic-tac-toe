import { combineReducers } from 'redux'
import { PLAYER_WIN, AI_WIN, PLAYER_TURN, AI_TURN, RESET_GAME, SET_SYMBOLS, SET_AI_TYPE } from './actions';

export const AI = 'AI'
export const PLAYER = 'player'

const initialScore = {
  player: 0,
  AI: 0
};

const score = (state = initialScore, { type }) => ({
  [PLAYER_WIN]: { ...state, player: state.player + 1 },
  [AI_WIN]: { ...state, AI: state.AI + 1 },
  [RESET_GAME]: initialScore
})[type] || state;

const initialTurn = () => [ PLAYER, AI ][ Math.round(Math.random()) ]

const initialInfo = () => {
  const turn = initialTurn()
  return {
    turn,
    AIType: 'dummy',
    AITypes: [ 'dummy', 'clever' ],
    symbols: {
      AI: turn === AI ? 'X' : 'O',
      player: turn === PLAYER ? 'X' : 'O',
    }
  }
}

const info = (state = initialInfo(), { type, payload }) => ({
  [PLAYER_TURN]: {...state, turn: PLAYER},
  [AI_TURN]: {...state, turn: AI},
  [SET_SYMBOLS]: {...state, symbols: payload},
  [SET_AI_TYPE]: {...state, AIType: payload},
  [RESET_GAME]: initialInfo()
})[type] || state;

export default combineReducers({
  score,
  info,
})
