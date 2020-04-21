import { CommitActions } from 'src/state/_actions';

import { AppThunk } from 'src/state/common';
import { ErrorThunks } from 'src/state/thunks';

export const getRepoCommits = (page?: number): AppThunk<Promise<void>> => (
    dispatch,
    _getState,
    container,
) => {
    // use promise to throw / reject error inside callback
    return new Promise((resolve, reject) => {
        const getRepoCommitsBehaviour = container.cradle.getRepoCommits;

        getRepoCommitsBehaviour(
            {
                onSuccess: (commits, linkInfo) => {
                    dispatch(
                        CommitActions.getRepoCommitsSuccess(commits, linkInfo),
                    );

                    // finish promise
                    resolve();
                },
                onError: error => {
                    dispatch(ErrorThunks.requestFailure(error));

                    // rejcect error to outer function
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
