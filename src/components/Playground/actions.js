export const SET_CELL = 'SET_CELL'
export const AI_MOVE = 'AI_MOVE'
export const PLAYER_MOVE = 'PLAYER_MOVE'
export const FETCH_AI_MOVE = 'FETCH_AI_MOVE'
export const FETCH_AI_MOVE_FULFILLED = 'FETCH_AI_MOVE_FULFILLED'


export const setCell = (position, symbol) => ({
  type: SET_CELL,
  payload: [ position, symbol ]
})

export const playerMove = position => ({
  type: PLAYER_MOVE,
  payload: position
})

export const AIMove = position => ({
  type: AI_MOVE,
  payload: position
})

export const fetchAIMove = board => ({
  type: FETCH_AI_MOVE,
  payload: board
})

export const fetchAIMoveFulfilled = move => ({
  type: FETCH_AI_MOVE_FULFILLED,
  payload: move
})
