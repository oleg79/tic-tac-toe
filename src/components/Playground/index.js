import { connect } from 'react-redux'
import Playground from './Playground'

export default connect(
  ({ playground }) => ({
    ...playground
  })
)(Playground)
