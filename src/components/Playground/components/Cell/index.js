import EmptyCell from '../EmptyCell'

const XCell = () =>
  <div className='cell'>
    <div className='cell__value cell__value--x'>X</div>
  </div>

const OCell = () =>
  <div className='cell'>
    <div className='cell__value cell__value--o'>O</div>
  </div>


const Cell = ({ row, cell, cellType = null }) => ({
  O: <OCell/>,
  X: <XCell/>
})[cellType] || <EmptyCell {...{ row, cell }}/>

export default Cell
