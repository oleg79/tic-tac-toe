import './styles/styles.sass'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import createStore from './src/store'
import TicTacToe from './src/components/TicTacToe'

const store = createStore()

render(
  <Provider store={store}>
    <TicTacToe/>
  </Provider>
  , document.getElementById('app')
)
