// @flow
import * as R from 'ramda';

import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CommitActions } from 'src/state/_actions';
import CommitListV from './CommitListV';
import { CommitRedux } from 'src/state/reducers';

// connect redux
const useConnect = () => {
    // mapState
    const commits = useSelector(
        R.pipe(
            CommitRedux.getReducerState,
            CommitRedux.selectors.getCommitList,
        ),
    );

    const mapState = {
        commits,
    };

    // mapDispatch
    const dispatch = useDispatch();

    const mapDispatch = useMemo(
        () => ({
            getRepoCommits: (page?: number) =>
                dispatch(
                    CommitActions.getRepoCommits(page, {
                        thunk: true,
                    }),
                ),
        }),
        [dispatch],
    );

    return {
        ...mapState,
        ...mapDispatch,
    };
};

const CommitListVM = () => {
    // Get state in store
    const { commits, getRepoCommits } = useConnect();

    // fetch commit list
    useEffect(() => {
        getRepoCommits();
    }, [getRepoCommits]);

    return <CommitListV />;
};

export default CommitListVM;
