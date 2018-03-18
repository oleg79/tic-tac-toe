export const SET_CELL = 'SET_CELL'
export const AI_MOVE = 'AI_MOVE'
export const PLAYER_MOVE = 'PLAYER_MOVE'


export const setCell = (position, symbol) => ({
  type: SET_CELL,
  payload: [ position, symbol ]
})
