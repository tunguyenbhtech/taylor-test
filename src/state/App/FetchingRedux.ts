import { createReducer, getType } from 'typesafe-actions';

import { FetchingActions } from 'src/state/_actions';
import { FetchingState } from './interfaces';
import { produce } from 'immer';

const stateKey = 'fetching';

/* ------------- Initial State ------------- */
const INITIAL_STATE: FetchingState = {
    fetching: false,
    fetchingCount: 0,
};

/* ------------- Reducers ------------- */
const started = (state: FetchingState): FetchingState =>
    produce(state, draft => {
        draft.fetchingCount = draft.fetchingCount + 1;
        draft.fetching = draft.fetchingCount > 0;
    });

const stopped = (state: FetchingState): FetchingState =>
    produce(state, draft => {
        draft.fetchingCount = Math.max(draft.fetchingCount - 1, 0);
        draft.fetching = draft.fetchingCount > 0;
    });

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
    [getType(FetchingActions.started)]: started,
    [getType(FetchingActions.stopped)]: stopped,
});

const reducerMap = { [stateKey]: reducer };

/* ------------- Selectors ------------- */
const getReducerState = (state: any): FetchingState => state[stateKey];

const selectors = {
    getFetchingStatus: ({ fetching }: FetchingState): boolean => fetching,
};

/* ------------- Export ------------- */
export default {
    selectors,

    // default export
    INITIAL_STATE,

    stateKey,
    getReducerState,
    reducer,
    reducerMap,
};
