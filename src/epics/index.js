import { Observable } from 'rxjs'
import get from 'lodash.get'
import { combineEpics } from 'redux-observable'
import { checkBoard  } from '../helpers/checker'
import { AI_TURN, playerTurn, AITurn } from '../components/Header/actions'
import {
  PLAYER_MOVE,
  FETCH_AI_MOVE_FULFILLED,
  AIMove,
  fetchAIMove,
  fetchAIMoveFulfilled,
  setCell
} from '../components/Playground/actions'

const getBoard = state => get(state, 'playground.board', [])


const playerMoveEpic = action$ =>
  action$.ofType(PLAYER_MOVE)
    .switchMap(() => Observable.of(AITurn()))


const AIMoveEpic = action$ =>
  action$.ofType(FETCH_AI_MOVE_FULFILLED)
    .switchMap(({ payload }) =>
      Observable.merge(
        Observable.of(playerTurn()),
        Observable.of(setCell(payload, 'O')),
        Observable.of(AIMove(payload))
      )
    )



const getAIMoveEpic = (action$, store) =>
  action$.ofType(AI_TURN)
    .switchMap(() => Observable.of(fetchAIMove(getBoard(store.getState()))))
    .switchMap(({ payload }) =>
      Observable.ajax.post(
        'http://localhost:8080/get-move',
        { board: JSON.stringify(payload) },
      ).map(({ response }) => fetchAIMoveFulfilled(response))
    )


const checkBoardEpic = (action$, store) =>
  action$.ofType(FETCH_AI_MOVE_FULFILLED, PLAYER_MOVE)
    .do(({ payload: [ i, j ] }) => {
      const board = JSON.parse(JSON.stringify(getBoard(store.getState())))
      window.console.log(checkBoard(board[i][j], board))
    })
    .ignoreElements()


export default combineEpics(
  playerMoveEpic,
  AIMoveEpic,
  getAIMoveEpic,
  checkBoardEpic
)
