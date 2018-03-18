import Cell from '../Cell'

const Row = ({ rowKey }) =>
  <div className='flex flex-row'>
    {
      [0, 1, 2].map(i => <Cell key={`${rowKey}-${i}`} row={rowKey} cell={i}/>)
    }
  </div>

export default Row
