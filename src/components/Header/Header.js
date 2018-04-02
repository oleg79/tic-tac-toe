import { lifecycle } from 'recompose'

const Header = ({ score, info: { turn, symbols, AIType, AITypes }, setAIType }) =>
  <div>
    <div className='flex p-4 mb-2'>
      <div className='flex-1 text-center'>
        <div>player</div>
        <div>{ symbols.player }</div>
      </div>
      <div className='flex-1 text-center'>
        <div>SCORE</div>
        <div>
          <span>{ score.player }</span>:<span>{ score.AI }</span>
        </div>
      </div>
      <div className='flex-1 text-center'>
        <div>AI</div>
        <div>{ symbols.AI }</div>
        {
          AITypes.map((type, i) =>
            <p key={i}>
              <input type='radio' onChange={() => setAIType(type)} checked={type === AIType}/>
              { type }
            </p>
          )
        }
      </div>
    </div>

    <div className='flex p-4 mb-2'>
      <div className='flex-1  text-center'>turn: { turn }</div>
    </div>
  </div>

export default lifecycle({
  componentDidMount() {
    this.props.initGame()
  }
})(Header)
