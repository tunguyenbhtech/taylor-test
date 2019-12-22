import * as R from 'ramda';

import { createReducer, getType } from 'typesafe-actions';

import { Commit } from 'src/domain/commit';
import { CommitActions } from 'src/state/_actions';
import { CommitState } from './interfaces';
import { produce } from 'immer';

const stateKey = 'contact';

/* ------------- Initial State ------------- */
const INITIAL_STATE: CommitState = {
    commits: [],
};

/* ------------- Reducers ------------- */
const getRepoCommits = R.identity;

const getRepoCommitsSuccess = (
    state: CommitState,
    {
        payload: { commits },
    }: ReturnType<typeof CommitActions.getRepoCommitsSuccess>,
): CommitState =>
    produce(state, draft => {
        draft.commits = commits;
    });

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
    [getType(CommitActions.getRepoCommits)]: getRepoCommits,
    [getType(CommitActions.getRepoCommitsSuccess)]: getRepoCommitsSuccess,
});

const reducerMap = {
    [stateKey]: reducer,
};

/* ------------- Selectors ------------- */
const getReducerState = (state: any): CommitState => state[stateKey];

const selectors = {
    getCommitList: (state: CommitState): Commit[] => state.commits,
};

/* ------------- Export ------------- */
export default {
    // default export
    selectors,

    INITIAL_STATE,

    stateKey,
    getReducerState,
    reducerMap,
};
