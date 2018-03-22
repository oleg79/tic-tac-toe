const getLeftDiagonal = n => Array(n).fill(1).map((_, i) => [i, i])

const getRightDiagonal = n => {
  let i = Math.floor(n / 2)
  let j = i
  const output = [[ i--, j++ ]]
  for(; i >= 0; --i, ++j) {
    output.push([ i, j ], [ j, i ])
  }

  return output
}

const getHorizontals = n => {
  const output = []

  for (let i = 0; i < n; i++) {
    output.push([])
    for (let j = 0; j < n; j++) {
      output[i].push([i,j])
    }
  }

  return output
}

const getVerticals = n => {
  const output = []

  for (let i = 0; i < n; i++) {
    output.push([])
    for (let j = 0; j < n; j++) {
      output[i].push([j,i])
    }
  }

  return output
}

export const checkBoard = (symbol, board) => {
  const n = board.length
  const everyPredicate = ([i, j]) => board[i][j] === symbol
  const somePredicate = v => v.every(everyPredicate)

  return  getLeftDiagonal(n).every(everyPredicate) ||
          getRightDiagonal(n).every(everyPredicate) ||
          getVerticals(n).some(somePredicate) ||
          getHorizontals(n).some(somePredicate)
}

export const checkAvailableMoves = board => [].concat(...board).some(c => !c)
