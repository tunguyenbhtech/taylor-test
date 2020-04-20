import { AppState } from './interfaces';
import { createReducer } from 'typesafe-actions';

const stateKey = 'app';

/* ------------- Initial State ------------- */
const INITIAL_STATE: AppState = {};

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {});

const reducerMap = { [stateKey]: reducer };

/* ------------- Selectors ------------- */
const getReducerState = (state: any): AppState => state[stateKey];

const selectors = {};

/* ------------- Export ------------- */
export default {
    // default export
    selectors,

    INITIAL_STATE,

    stateKey,
    getReducerState,
    reducer,
    reducerMap,
};
