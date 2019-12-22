import { createReducer, getType } from 'typesafe-actions';

import { AppActions } from 'src/state/_actions';
import { AppState } from './interfaces';
import * as R from 'ramda';

const stateKey = 'app';

/* ------------- Initial State ------------- */
const INITIAL_STATE: AppState = {};

/* ------------- Reducers ------------- */
const initializeApp = R.identity;
const initializeAppFinished = R.identity;

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
    [getType(AppActions.initializeApp)]: initializeApp,
    [getType(AppActions.initializeAppFinished)]: initializeAppFinished,
});

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
    reducerMap,
};
