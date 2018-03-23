import { Observable } from 'rxjs/Rx'
import get from 'lodash.get'
import { AI_WIN, END_OF_THE_GAME, PLAYER_WIN } from '../components/Header/actions'

export const getBoard = state => get(state, 'playground.board.board', [])
export const getTurn = state => get(state, 'gameStatus.info.turn')
export const getAISymbol = state =>  get(state, 'gameStatus.info.symbols.AI')

export const getWinActionType = (symbol, state) => {
  const AISymbol = getAISymbol(state)

  return AISymbol === symbol ? AI_WIN : PLAYER_WIN
}

export const applyTakeUntil = (action$, ...ob) =>
  Observable.merge(...ob.map(ob$ => ob$.takeUntil(action$.ofType(END_OF_THE_GAME, AI_WIN, PLAYER_WIN))))
