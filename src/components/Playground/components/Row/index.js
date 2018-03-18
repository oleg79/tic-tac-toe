import Cell from '../Cell'

const Row = ({ rowKey, row }) =>
  <div className='flex flex-row'>
    {
      row.map((cell, i) => <Cell key={`${rowKey}-${i}`} row={rowKey} cell={i} cellType={cell}/>)
    }
  </div>

export default Row
