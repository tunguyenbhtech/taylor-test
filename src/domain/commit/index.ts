export interface CommitVerfication {
    verified: boolean;
    reason: string;
    signature: string;
    payload: string;
}

export interface CommitAuthor {
    id: number;
    avatar_url: string;
    html_url: string;
    name: string;
    email: string;
    date: string; // ISO date string
}

export interface Commit {
    url: string;
    author: CommitAuthor;
    committer: CommitAuthor;
    message: string;
    comment_count: number;
    verfication: CommitVerfication;
    tree: {
        url: string;
        sha: string;
    };
}
