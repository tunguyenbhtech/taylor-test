import { API_CONFIG, APP_CONFIG } from 'src/constants';
import { ApiService } from 'src/infra/api/ApiService';
import { ApiResponse, LinkHeader } from 'src/infra/api/interfaces';
import { Commit } from 'src/domain/commit';
import { CommitResponse } from './interfaces';

interface Dependencies {
    apiService: ApiService;
}

export interface GetRepoCommitsRes {
    commits: Commit[];
    linkInfo?: LinkHeader;
}

export class CommitRepository {
    private apiService: ApiService;

    constructor({ apiService }: Dependencies) {
        this.apiService = apiService;
    }

    async getRepoCommits(page?: number): Promise<GetRepoCommitsRes> {
        const url = `repos/${API_CONFIG.GITHUB.user}/${API_CONFIG.GITHUB.repo}/commits`;

        const res: ApiResponse<CommitResponse[]> = await this.apiService.get({
            url,
            data: {
                page,
                per_page: APP_CONFIG.QUERY_PAGE_SIZE,
            },
        });

        return {
            commits: res.data.map(this._serializeCommit),
            linkInfo: res.meta?.link,
        };
    }

    private _serializeCommit(res: CommitResponse): Commit {
        const { commit, author, committer } = res;

        return {
            ...commit,
            author: {
                ...commit.author,
                id: author.id,
                avatar_url: author.avatar_url,
                html_url: author.html_url,
            },
            committer: {
                ...commit.committer,
                id: committer.id,
                avatar_url: committer.avatar_url,
                html_url: committer.html_url,
            },
        };
    }
}
