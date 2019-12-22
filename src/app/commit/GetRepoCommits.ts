import { Commit } from 'src/domain/commit';

import { CommitRepository } from 'src/infra/commit/CommitRepository';

interface Callbacks {
    onSuccess: (res: Commit[]) => void;
    onError: (error: Error) => void;
}

interface Dependencies {
    commitRepository: CommitRepository;
}

export interface GetRepoCommitsBehaviourRes {
    commits?: Commit[];
    error?: Error;
}

export type GetRepoCommitsBehaviour = (cb: Callbacks, page?: number) => any;

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

            return onSuccess(commitListRes);
        } catch (error) {
            return onError(error);
        }
    };

    return getRepoCommitsBehaviour;
};
