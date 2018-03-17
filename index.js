import './styles.sass'
import { render } from 'react-dom'

render(
  <div className='container'>
    <div className='flex p-4 mb-2'>
      <div className='flex-1 text-center'>
        <div>you</div>
        <div>O</div>
      </div>
      <div className='flex-1 text-center'>
        <div>SCORE</div>
        <div>
          <span>7</span>:<span>4</span>
        </div>
      </div>
      <div className='flex-1 text-center'>
        <div>AI</div>
        <div>X</div>
      </div>
    </div>

    <div className='flex p-4 mb-2'>
      <div className='flex-1  text-center'>turn:you</div>
    </div>
    <div className='flex p-4 mb-2'>
      <div className='flex-1 text-center'>
        <h4>MOVES:</h4>
        <div className='my-2'>[ 1, 1 ]</div>
      </div>

      <div className='flex flex-1 flex-col items-center w-full content-center'>

        <div className='flex flex-row'>
          <div className='cell'>
            <div className='cell__value cell__value--x'>
              X
            </div>
          </div>
          <div className='cell'></div>
          <div className='cell'></div>
        </div>

        <div className='flex flex-row'>
          <div className='cell'></div>
          <div className='cell'>
            <div className='cell__value cell__value--o'>
              O
            </div>
          </div>
          <div className='cell'></div>
        </div>

        <div className='flex flex-row'>
          <div className='cell'></div>
          <div className='cell'></div>
          <div className='cell'>
            <div className='cell__value cell__value--x'>
              X
            </div>
          </div>
        </div>

      </div>

      <div className='flex-1 text-center'>
        <h4>MOVES:</h4>
        <div className='my-2'>[ 0, 0 ]</div>
        <div className='my-2'>[ 2, 2 ]</div>
      </div>
    </div>

    <div className='flex items-center p-4 mt-4 mb-2'>
      <button className='button'>RESET</button>
    </div>
  </div>,
  document.getElementById('app'))
