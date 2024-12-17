import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import promise from 'redux-promise'
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import { createRootReducer } from './reducer'
import { fetchInitialData } from './initialData/actions'

export const history = require('history').createBrowserHistory()

export function initStore() {
  const rootReducer = createRootReducer(history)
  const middleware = applyMiddleware(
    routerMiddleware(history),
    logger,
    thunk,
    promise,
  )

  const store = createStore(rootReducer, middleware)
  store.dispatch(fetchInitialData() as any);
  return store
}