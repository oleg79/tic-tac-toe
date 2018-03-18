import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import { AI_TURN, playerTurn, AITurn } from '../components/Header/actions'
import {
  PLAYER_MOVE,
  FETCH_AI_MOVE_FULFILLED,
  AIMove,
  fetchAIMove,
  fetchAIMoveFulfilled,
  setCell
} from '../components/Playground/actions'


const playerMoveEpic = action$ =>
  action$
    .ofType(PLAYER_MOVE)
    .switchMap(() => Observable.of(AITurn()))

const AIMoveEpic = action$ =>
  action$
    .ofType(FETCH_AI_MOVE_FULFILLED)
    .switchMap(({ payload }) =>
      Observable.merge(
        Observable.of(playerTurn()),
        Observable.of(setCell(payload, 'O')),
        Observable.of(AIMove(payload))
      )
    )



const getAIMove = (action$, store) =>
  action$
    .ofType(AI_TURN)
    .switchMap(() => Observable.of(fetchAIMove(store.getState().playground.board)))
    .switchMap(() =>
      Observable.ajax.getJSON('/move.json').delay(2000)
        .map(({ data }) => fetchAIMoveFulfilled(data))
    )




export default combineEpics(
  playerMoveEpic,
  AIMoveEpic,
  getAIMove
)
