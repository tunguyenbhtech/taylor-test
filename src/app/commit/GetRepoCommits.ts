import { Commit } from 'src/domain/commit';

import { CommitRepository } from 'src/infra/commit/CommitRepository';
import { LinkHeader } from 'src/infra/api/interfaces';

interface Callbacks {
    onSuccess: (res: Commit[], linkInfo?: LinkHeader) => void;
    onError: (error: Error) => void;
}

interface Dependencies {
    commitRepository: CommitRepository;
}

export type GetRepoCommitsBehaviour = (cb: Callbacks, page?: number) => void;

export default ({
    commitRepository,
}: Dependencies): GetRepoCommitsBehaviour => {
    /**
     * get repository commit list
     *
     * @param {*} page pagination
     * @param {*} { onSuccess, onError }
     * @returns
     */
    const getRepoCommitsBehaviour: GetRepoCommitsBehaviour = async (
        { onSuccess, onError },
        page,
    ) => {
        try {
            const commitListRes = await commitRepository.getRepoCommits(page);

            onSuccess(commitListRes.commits, commitListRes.linkInfo);
        } catch (error) {
            onError(error);
        }
    };

    return getRepoCommitsBehaviour;
};
