import { connect } from 'react-redux'
import { resetGame } from '../Header/actions'

const Footer = ({ resetGame }) =>
  <div className='flex items-center p-4 mt-4 mb-2'>
    <button className='button' onClick={resetGame}>RESET</button>
  </div>

export default connect(
  null,
  { resetGame }
)(Footer)
