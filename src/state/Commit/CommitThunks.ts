import { CommitActions } from 'src/state/_actions';

import { AppThunk } from 'src/state/common';
import { ErrorThunks } from 'src/state/thunks';

export const getRepoCommits = (page?: number): AppThunk<Promise<void>> => (
    dispatch,
    _getState,
    container,
) => {
    return new Promise((resolve, reject) => {
        const getRepoCommitsBehaviour = container.cradle.getRepoCommits;

        getRepoCommitsBehaviour(
            {
                onSuccess: (commits, linkInfo) => {
                    dispatch(
                        CommitActions.getRepoCommitsSuccess(commits, linkInfo),
                    );
                },
                onError: error => {
                    dispatch(ErrorThunks.requestFailure(error));
                    reject(error);
                },
            },
            page,
        );
    });
};

export default {
    getRepoCommits,
};
