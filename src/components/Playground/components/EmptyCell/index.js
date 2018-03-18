import { connect } from 'react-redux'
import { setCell, playerMove } from '../../actions'

const EmptyCell = ({ row, cell, symbol, turn, setCell, playerMove, AITurn }) => {

  const onClick = () => {
    if (turn === 'player') {
      const position = [ row, cell ];

      setCell(position, symbol)
      playerMove(position)
    }
  }

  return (
    <div
      className='cell'
      onClick={onClick}
    ></div>
  )
}


export default connect(
  ({ gameStatus: { info } }) => ({
    symbol: info.symbols[ info.turn ],
    turn: info.turn
  }),
  {
    setCell,
    playerMove,
  }
)(EmptyCell)
