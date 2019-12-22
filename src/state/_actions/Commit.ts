import { Commit } from 'src/domain/commit';
// import { PageInfo } from 'src/domain/connecitonManager';
import { SagaThunkMeta } from './interfaces';
import { createAction } from 'typesafe-actions';
import { createActionTypePrefixFormat } from '../common';

const typePrefixFormat = createActionTypePrefixFormat('Commit');

/* ------------- action creators ------------- */
export const getRepoCommits = createAction(
    typePrefixFormat('GET_REPO_COMMITS'),
    (page?: number, _meta?) => ({ page }),
    (_page, meta?: SagaThunkMeta) => meta,
)();

export const getRepoCommitsSuccess = createAction(
    typePrefixFormat('GET_REPO_COMMITS_SUCCESS'),
    (commits: Commit[], _meta?) => ({
        commits,
    }),
    (_contactMap, meta?: SagaThunkMeta) => meta,
)();

export type CommitActions =
    | ReturnType<typeof getRepoCommits>
    | ReturnType<typeof getRepoCommitsSuccess>;
