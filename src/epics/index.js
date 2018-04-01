import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import { checkBoard, checkAvailableMoves } from '../helpers/checker'
import {
  PLAYER_MOVE,
  FETCH_AI_MOVE_FULFILLED,
  AIMove,
  fetchAIMove,
  fetchAIMoveFulfilled,
  setCell
} from '../components/Playground/actions'
import {
  INIT_GAME,
  RESET_GAME,
  AI_WIN,
  PLAYER_WIN,
  END_OF_THE_GAME,
  AI_TURN,
  playerTurn,
  AITurn,
  setSymbols
} from '../components/Header/actions'
import { applyTakeUntil, getAISymbol, getWinActionType, getBoard, getTurn } from '../helpers/epicsHelpers'


const playerMoveEpic = action$ =>
  action$.ofType(PLAYER_MOVE)
    .switchMap(() => applyTakeUntil(action$, Observable.of(AITurn())))


const AIMoveEpic = (action$, store) =>
  action$.ofType(FETCH_AI_MOVE_FULFILLED)
    .switchMap(({ payload }) => applyTakeUntil(action$,
      Observable.of(AIMove(payload)),
      Observable.of(setCell(payload, getAISymbol(store.getState()))),
      Observable.of(playerTurn())
    ))

const fetchAIMoveEpic = (action$, store) =>
  action$.ofType(AI_TURN)
    .switchMap(() => Observable.of(fetchAIMove(getBoard(store.getState()))))
    .switchMap(({ payload }) =>
      applyTakeUntil(action$, Observable.ajax.post('http://localhost:8080/get-move', { data: JSON.stringify({
          board: payload,
          AIType: 'dummy' // TODO: get from state
        }) })
        .map(({ response }) => fetchAIMoveFulfilled(response))
      )
    )

const checkBoardEpic = (action$, store) =>
  action$.ofType(FETCH_AI_MOVE_FULFILLED, PLAYER_MOVE)
    .switchMap(({ payload: [ i, j ] }) => {
      const state = store.getState()
      const board = JSON.parse(JSON.stringify(getBoard(state)))
      const move = board[i][j]
      if (checkBoard(move, board)) {
        return Observable.of({ type: getWinActionType(move, state), payload: move })
      } else if (!checkAvailableMoves(board)) {
        return Observable.of({ type: END_OF_THE_GAME })
      } else {
        return Observable.empty()
      }
    })

const resetGameEpic = (action$, store) =>
  action$.ofType(INIT_GAME, RESET_GAME)
    .switchMap(() => getTurn(store.getState()) === 'AI' ? Observable.of(AITurn()) : Observable.empty())

const AIWinEpic = action$ =>
  action$
    .ofType(AI_WIN)
    .switchMap(() => Observable.of(setSymbols({ player: 'X', AI: 'O' })))

const playerWinEpic = action$ =>
  action$
    .ofType(PLAYER_WIN)
    .switchMap(() => Observable.merge(
      Observable.of(setSymbols({ player: 'O', AI: 'X' })),
      Observable.of(AITurn())
    ))


export default combineEpics(
  playerMoveEpic,
  AIMoveEpic,
  fetchAIMoveEpic,
  resetGameEpic,
  checkBoardEpic,
  AIWinEpic,
  playerWinEpic
)
