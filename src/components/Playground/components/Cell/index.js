import { Motion, spring } from 'react-motion'
import EmptyCell from '../EmptyCell'

const XCell = () =>
    <Motion defaultStyle={{x: 0}} style={{x: spring(10000)}}>
      {
        ({ x }) =>
          <div className='cell' style={{ opacity: x / 10000 }}>
            <div className='cell__value cell__value--x'>X</div>
          </div>
      }
    </Motion>


const OCell = () =>
  <Motion defaultStyle={{x: 0}} style={{x: spring(10000)}}>
    {
      ({ x }) =>
        <div className='cell' style={{ opacity: x / 10000 }}>
          <div className='cell__value cell__value--o'>O</div>
        </div>
    }
  </Motion>


const Cell = ({ row, cell, cellType = null }) => ({
  O: <OCell/>,
  X: <XCell/>
})[cellType] || <EmptyCell {...{ row, cell }}/>

export default Cell
