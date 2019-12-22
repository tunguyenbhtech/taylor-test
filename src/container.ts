import * as awilix from 'awilix';

import { CommitRepository } from 'src/infra/commit/CommitRepository';
import makeApiService from 'src/infra/api/ApiService';
import makeGetRepoCommits from 'src/app/commit/GetRepoCommits';

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer();

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
