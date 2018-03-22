export const PLAYER_WIN = 'PLAYER_WIN'
export const AI_WIN = 'AI_WIN'
export const PLAYER_TURN = 'PLAYER_TURN'
export const AI_TURN = 'AI_TURN'
export const INIT_GAME = 'INIT_GAME'
export const RESET_GAME = 'RESET_GAME'
export const END_OF_THE_GAME = 'END_OF_THE_GAME'
export const SET_SYMBOLS = 'SET_SYMBOLS'

export const initGame = () => ({
  type: INIT_GAME
})

export const playerTurn = () => ({
  type: PLAYER_TURN
})

export const AITurn = () => ({
  type: AI_TURN
})

export const resetGame = () => ({
  type: RESET_GAME
})

export const setSymbols = symbolsMap => ({
  type: SET_SYMBOLS,
  payload: symbolsMap
})
