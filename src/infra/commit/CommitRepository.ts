import { API_CONFIG } from 'src/constants';
import { ApiService } from 'src/infra/api/ApiService';
import { Commit } from 'src/domain/commit';
import { CommitResponse } from './interfaces';

interface Dependencies {
    apiService: ApiService;
}

export class CommitRepository {
    private apiService: ApiService;

    constructor({ apiService }: Dependencies) {
        this.apiService = apiService;
    }

    async getRepoCommits(page: number): Promise<Commit[]> {
        const url = `/repos/${API_CONFIG.GITHUB.user}/${API_CONFIG.GITHUB.repo}/commits`;

        const res: CommitResponse[] = await this.apiService.get({
            url,
            data: {
                page,
            },
        });

        return res.map(this._serializeCommit);
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
