import * as awilix from 'awilix';

import makeApiService, { ApiService } from 'src/infra/api/ApiService';
import makeGetRepoCommits, {
    GetRepoCommitsBehaviour,
} from 'src/app/commit/GetRepoCommits';

import { CommitRepository } from 'src/infra/commit/CommitRepository';

export interface Cradle {
    apiService: ApiService;
    commitRepository: CommitRepository;
    getRepoCommits: GetRepoCommitsBehaviour;
}

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer<Cradle>();

/* ------------- Infra ------------- */
container
    // services
    .register({
        apiService: awilix.asFunction(makeApiService).singleton(),
    })
    // repositories
    .register({
        commitRepository: awilix.asClass(CommitRepository).singleton(),
    });

/* ------------- App ------------- */
container
    // commit
    .register({
        getRepoCommits: awilix.asFunction(makeGetRepoCommits).singleton(),
    });

export default container;
