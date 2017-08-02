import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import autobahnConnection from './services/autobahn'
import { Shell } from './ui/shell/'
import rootReducer from './reducers'

const middlewares: any[] = [thunk]

const autobahnService = () => ({
  type: 'START_BOOTSTRAP',
  payload: autobahnConnection,
})

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares))
store.dispatch(autobahnService())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={Shell} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
