import { Commit } from 'src/domain/commit';
import { User } from 'src/domain/user';

export interface CommitParentPath {
    url: string;
    sha: string;
}

export interface CommitResponse {
    url: string;
    sha: string;
    node_id: string;
    html_url: string;
    comments_url: string;
    commit: Commit & {
        author: {
            name: string;
            email: string;
            date: string; // ISO date string;
        };
        committer: {
            name: string;
            email: string;
            date: string; // ISO date string;
        };
    };
    author: User;
    committer: User;
    parents: CommitParentPath[];
}
