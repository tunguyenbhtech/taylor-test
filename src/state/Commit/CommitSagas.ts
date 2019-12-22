import { CommitActions, ErrorActions } from 'src/state/_actions';
import { END, SagaIterator, eventChannel } from 'redux-saga';
import { Effect, cancelled, put, take, takeLatest } from 'redux-saga/effects';
import {
    GetRepoCommitsBehaviour,
    GetRepoCommitsBehaviourRes,
} from 'src/app/commit/GetRepoCommits';

import { AwilixContainer } from 'awilix';

/**
 * get user contact list redux saga side effect
 *
 * @param {AwilixContainer} container - awilix container
 * @param {Object} data - action params
 */
const getRepoCommits = function*(
    container: AwilixContainer,
    {
        payload: { page },
        meta,
    }: ReturnType<typeof CommitActions.getRepoCommits>,
): SagaIterator {
    try {
        // resolve login behaviour from awilix container
        const getRepoCommitsBehaviour = container.resolve<
            GetRepoCommitsBehaviour
        >('getRepoCommits');

        // app behaviour will use callbacks to handle multiple use cases
        // so we need to use eventChannel pattern to deal with callback in sagas
        const channel = eventChannel<GetRepoCommitsBehaviourRes>(emitter => {
            getRepoCommitsBehaviour(
                {
                    onSuccess: commits => {
                        emitter({ commits });
                        emitter(END);
                    },
                    onError: error => {
                        emitter({ error });
                        emitter(END);
                    },
                },
                page,
            );
            // Return an unsubscribe method
            return (): void => {
                // Perform any cleanup you need here
            };
        });

        // only 1 callback will be called,
        // no need to loop here
        const input = yield take(channel);

        // break loop when event channel end
        if (input === END) {
            return;
        }

        // cast take channel data to SignInUserBehaviourRes since take channel is returning unknown type
        // TODO: why does take channel return unknown even when channel return tyep is defined ?
        const { commits, error } = input as GetRepoCommitsBehaviourRes;

        // Handle the data...
        if (error) {
            throw error;
        }

        if (commits) {
            // set new commit list to redux
            yield put(CommitActions.getRepoCommitsSuccess(commits, meta));
        }
    } catch (e) {
        yield put(ErrorActions.requestFailure(e, undefined, meta));
    } finally {
        if (yield cancelled()) {
            yield put(ErrorActions.requestFailure(undefined, undefined, meta));
        }
    }
};

export default (container: AwilixContainer): Effect[] => [
    takeLatest(CommitActions.getRepoCommits, getRepoCommits, container),
];
