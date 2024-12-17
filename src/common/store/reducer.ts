import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { loadingReducer as loading } from './loading/reducer'
import { initialDataReducer as initialData } from './initialData/reducer'

export const createRootReducer = (history: History) =>
  combineReducers({
    loading,
    initialData,
    router: connectRouter(history),
  })

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>