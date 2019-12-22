import { Effect, put, takeEvery } from 'redux-saga/effects';

import { ErrorActions } from '../actions';
import { SagaIterator } from 'redux-saga';
import { getType } from 'typesafe-actions';

const requestFailure = function*({
    error,
}: ReturnType<typeof ErrorActions.requestFailure>): SagaIterator {
    if (!error) {
        return;
    }
    if (typeof error === 'string') {
        yield put(ErrorActions.errorsQueueAppend(new Error(error)));
    } else if (error instanceof Error) {
        yield put(ErrorActions.errorsQueueAppend(error));
    }
};

export default (): Effect[] => [
    takeEvery(getType(ErrorActions.requestFailure), requestFailure),
];
