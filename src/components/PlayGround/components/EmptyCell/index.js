const EmptyCell = ({ row, cell }) =>
  <div className='cell' onClick={() => { console.log([ row, cell ]) }}></div>

export default EmptyCell
