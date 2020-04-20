import { Commit } from 'src/domain/commit';
import { LinkHeader } from 'src/infra/api/interfaces';
import { createAction } from 'typesafe-actions';
import { createActionTypePrefixFormat } from '../common';

const typePrefixFormat = createActionTypePrefixFormat('Commit');

export const getRepoCommitsSuccess = createAction(
    typePrefixFormat('GET_REPO_COMMITS_SUCCESS'),
    (commits: Commit[], linkInfo?: LinkHeader) => ({
        commits,
        linkInfo,
    }),
)();

export type CommitActions = ReturnType<typeof getRepoCommitsSuccess>;
