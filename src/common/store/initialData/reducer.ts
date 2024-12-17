import {
    SET_INITIAL_DATA,
    fetchInitialDataAction
} from './actions';

export type initialState = {
    stakingToken: string | null;
};

const INITIAL_STATE: initialState = {
    stakingToken: null,
};

type initialDataReducerAction = fetchInitialDataAction;

export function initialDataReducer(
    state: initialState = INITIAL_STATE,
    action: initialDataReducerAction
): initialState {
    switch (action.type) {
        case SET_INITIAL_DATA: {
            return {
                ...state,
                ...action.payload.data,
            };
        }
        default:
            return state;
    }
}
