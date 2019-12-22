import * as R from 'ramda';

import { createReducer, getType } from 'typesafe-actions';

import { ErrorActions } from 'src/state/_actions';
import { ErrorState } from './interfaces';
import { produce } from 'immer';

const stateKey = 'error';

/* ------------- Initial State ------------- */
const INITIAL_STATE: ErrorState = {
    errorsQueue: [],
    currentError: undefined,
};

/* ------------- Reducers ------------- */
const errorsQueueAppend = (
    state: ErrorState,
    { payload: { error } }: ReturnType<typeof ErrorActions.errorsQueueAppend>,
): ErrorState =>
    produce(state, draft => {
        let { errorsQueue = [] } = draft;
        const { currentError } = draft;

        if (currentError?.message === error.message) {
            // do nothing to reduce duplicate error
        } else if (
            errorsQueue.findIndex(item => item.message === error.message) > -1
        ) {
            // do nothing to reduce duplicate error
        } else {
            errorsQueue = errorsQueue.concat(error);
        }

        if (currentError) {
            draft.errorsQueue = errorsQueue;
        } else {
            draft.errorsQueue = errorsQueue.slice(1);
            draft.currentError = errorsQueue[0];
        }
    });

const currentErrorFinish = (state: ErrorState): ErrorState =>
    produce(state, draft => {
        const errorsQueue = draft.errorsQueue;
        if (errorsQueue.length > 0) {
            draft.errorsQueue = errorsQueue.slice(1);
            draft.currentError = errorsQueue[0];
        } else {
            Object.assign(draft, INITIAL_STATE);
        }
    });

const requestFailure = R.identity;

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
    [getType(ErrorActions.errorsQueueAppend)]: errorsQueueAppend,
    [getType(ErrorActions.currentErrorFinish)]: currentErrorFinish,

    [getType(ErrorActions.requestFailure)]: requestFailure,
});

const reducerMap = { [stateKey]: reducer };

/* ------------- Selectors ------------- */
const getReducerState = (state: any): ErrorState => state[stateKey];

const selectors = {
    getCurrentError: ({ currentError }: ErrorState): Error | undefined =>
        currentError,
};

/* ------------- Export ------------- */
export default {
    selectors,

    // default export
    INITIAL_STATE,

    stateKey,
    getReducerState,
    reducerMap,
};
