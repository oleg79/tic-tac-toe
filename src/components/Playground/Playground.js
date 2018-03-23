import Moves from './components/Moves'
import Row from './components/Row'

const Playground = ({ board: { board }, moves }) =>
  <div className='flex p-4 mb-2'>
    <Moves moves={ moves.player }/>

    <div className='flex flex-1 flex-col items-center w-full content-center'>

      {
        board.map((row, i) => <Row key={i} rowKey={i} row={row}/>)
      }

    </div>

    <Moves moves={ moves.AI }/>
  </div>

export default Playground
