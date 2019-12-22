import { Commit } from 'src/domain/commit';
import { LinkHeader } from 'src/infra/api/interfaces';

export interface CommitState {
    commits: Commit[];
    pageInfo?: LinkHeader;
}
