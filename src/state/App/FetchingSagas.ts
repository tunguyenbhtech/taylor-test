import { ErrorActions, FetchingActions } from 'src/state/actions';
// take from reducers & put to Fetching reducer
import { Effect, put, takeEvery } from 'redux-saga/effects';

import { SagaIterator } from 'redux-saga';

const started = function*({
    type,
}: ReturnType<typeof FetchingActions.started>): SagaIterator {
    // __DEV__ && console.warn('started ', type)
    yield put(FetchingActions.started());
};

const stopped = function*({
    type,
}: ReturnType<typeof FetchingActions.stopped>): any {
    // __DEV__ && console.warn('stopped ', type)
    yield put(FetchingActions.stopped());
};

export default (): Effect[] => [
    takeEvery(ErrorActions.requestFailure, stopped),
];
