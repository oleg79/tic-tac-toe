import './styles.sass'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './src/store'
import TicTacToe from './src/components/TicTacToe'

render(
  <Provider store={store}>
    <TicTacToe/>
  </Provider>
  , document.getElementById('app')
)
