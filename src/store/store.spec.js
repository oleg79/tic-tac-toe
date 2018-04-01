import get from 'lodash.get'
import { AI, PLAYER } from '../components/Header/reducers'
import { AI_TURN, PLAYER_TURN } from '../components/Header/actions'
import createStore from './'

describe('store', () => {
  const store = createStore()

  it('should change turn', () => {
    const initialTurn = get(store.getState(), 'gameStatus.info.turn')

    if (initialTurn === AI) {
      store.dispatch({ type: PLAYER_TURN })
      const turn = get(store.getState(), 'gameStatus.info.turn')
      expect(turn).toBe(PLAYER)
    }

    if (initialTurn === PLAYER) {
      store.dispatch({ type: AI_TURN })
      const turn = get(store.getState(), 'gameStatus.info.turn')
      expect(turn).toBe(AI)
    }
  })
})