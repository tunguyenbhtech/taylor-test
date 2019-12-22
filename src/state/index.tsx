import * as R from 'ramda';
import * as reducers from './reducers';
import * as sagas from './sagas';

import { Effect, all } from 'redux-saga/effects';
import React, { FC, ReactNode } from 'react';
import { ReducersMapObject, combineReducers } from 'redux';

import { AwilixContainer } from 'awilix';
import ReduxProviderFactory from './_providers/ReduxProviderFactory';
import { SagaIterator } from 'redux-saga';
import { StateType } from 'typesafe-actions';
import createStore from './createStore';
import { reducer as thunkReducer } from 'redux-saga-thunk';

/* ------------- Reducers ------------- */
const allReducers = Object.values(reducers).reduce(
    (prev: ReducersMapObject, curr: Record<string, any>): ReducersMapObject => {
        return {
            ...prev,
            ...curr.reducerMap,
        };
    },
    {
        thunk: thunkReducer,
    },
);

const rootReducer = combineReducers(allReducers);

/* ------------- Sagas ------------- */
const allSagas = (container: AwilixContainer): Effect[] =>
    R.flatten(R.map(s => s(container), R.values(sagas)));
// Object.values(sagas)
//     .flat(3)
//     .map(s => s(container));

const rootSaga = function*(container: AwilixContainer): SagaIterator {
    yield all(allSagas(container));
};

export type RootState = StateType<typeof rootReducer>;

/* ------------- Create Store ------------- */
const { store } = createStore(rootReducer, rootSaga);

// persistor.purge();

interface Props {
    loading?: ReactNode;
    children: ReactNode;
}

/* ------------- Create Provider ------------- */
export const ReduxProvider: FC<Props> = ({ loading, children }) => (
    <ReduxProviderFactory store={store}>{children}</ReduxProviderFactory>
);
