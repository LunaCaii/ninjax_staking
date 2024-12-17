import { action } from 'typesafe-actions';
import { web3SDK } from '../../../contract/';
export const SET_INITIAL_DATA = '[Request] Set Initial Data';

export const fetchInitialData = (): any => {
    return async (dispatch: any) => {
        try {
            const stakingToken = await web3SDK.StakingPool.stakingToken();
            dispatch(action(SET_INITIAL_DATA, { data: { stakingToken } }));
        } catch (error) {
            console.error('Error fetching data:', error);
            dispatch(action(SET_INITIAL_DATA, { data: { stakingToken: null } }));
        }
    };
};

export type fetchInitialDataAction = ReturnType<typeof fetchInitialData>;
