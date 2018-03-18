import Moves from './components/Moves'
import Row from './components/Row'

const PlayGround = () =>
  <div className='flex p-4 mb-2'>
    <Moves moves={['[ 1, 1 ]']}/>

    <div className='flex flex-1 flex-col items-center w-full content-center'>

      {
        [0, 1, 2].map(i => <Row key={i} rowKey={i}/>)
      }

    </div>

    <Moves moves={['[ 0, 0 ]', '[ 2, 2 ]']}/>
  </div>

export default PlayGround