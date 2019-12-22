import { AppActions, ErrorActions } from 'src/state/_actions';
import { Effect, put, takeLatest } from 'redux-saga/effects';

import { AwilixContainer } from 'awilix';
import { SagaIterator } from 'redux-saga';
import { getType } from 'typesafe-actions';

const initializeApp = function*(
    _container: AwilixContainer,
    { meta }: ReturnType<typeof AppActions.initializeApp>,
): SagaIterator {
    try {
        yield put(AppActions.initializeAppFinished(meta));
    } catch (e) {
        yield put(ErrorActions.requestFailure(e, undefined, meta));
    }
};

export default (container: AwilixContainer): Effect[] => [
    takeLatest(getType(AppActions.initializeApp), initializeApp, container),
];
