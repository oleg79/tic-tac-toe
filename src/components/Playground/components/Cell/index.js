import { Motion, spring } from 'react-motion'
import EmptyCell from '../EmptyCell'

const XCell = () =>
  <Motion defaultStyle={{x: 0, y: 0}} style={{x: spring(18000), y: spring(10000)}}>
    {
      ({ x, y }) =>
        <div className='cell' style={{ transform: `rotateY(${x / 100}deg)`, opacity: y / 10000 }}>
          <div className='cell__value cell__value--o'>X</div>
        </div>
    }
  </Motion>


const OCell = () =>
  <Motion defaultStyle={{x: 0, y: 0}} style={{x: spring(18000), y: spring(10000)}}>
    {
      ({ x, y }) =>
        <div className='cell' style={{ transform: `rotateY(${x / 100}deg)`, opacity: y / 10000 }}>
          <div className='cell__value cell__value--o'>O</div>
        </div>
    }
  </Motion>


const Cell = ({ row, cell, cellType = null }) => ({
  O: <OCell/>,
  X: <XCell/>
})[cellType] || <EmptyCell {...{ row, cell }}/>

export default Cell
