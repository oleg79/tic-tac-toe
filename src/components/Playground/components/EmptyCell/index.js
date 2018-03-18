import { connect } from 'react-redux'
import { setCell } from '../../actions'

const EmptyCell = ({ row, cell, symbol, setCell }) =>
  <div className='cell' onClick={() => setCell([ row, cell ], symbol) }></div>

export default connect(
  ({ gameStatus: { info } }) => ({
    symbol: info.symbols[ info.turn ]
  }),
  {
    setCell
  }
)(EmptyCell)
