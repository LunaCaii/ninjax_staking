import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import promise from 'redux-promise'
import { createRootReducer } from './reducer'

export const history = require('history').createBrowserHistory()

export function initStore() {
  const rootReducer = createRootReducer(history)
  const middleware = applyMiddleware(
    routerMiddleware(history),
    // logger,
    promise
  )

  return createStore(rootReducer, middleware)
}