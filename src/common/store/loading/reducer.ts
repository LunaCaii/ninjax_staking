import {
  SHOW_Loading,
  CLOSE_Loading,
  ShowLoadingAction,
  CloseLoadingAction,
} from './actions'

export type LoadingState = {
  open: boolean
}

const INITIAL_STATE: LoadingState = {
  open: false,
}

type LoadingReducerAction = ShowLoadingAction | CloseLoadingAction

export function loadingReducer(
  state: LoadingState = INITIAL_STATE,
  action: LoadingReducerAction
): LoadingState {
  switch (action.type) {
    case SHOW_Loading: {
      return {
        ...state,
        ...action.payload.data,
      }
    }
    case CLOSE_Loading: {
      return {
        ...state,
        ...action.payload.data,
      }
    }
    default:
      return state
  }
}
