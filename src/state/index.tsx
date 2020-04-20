import * as reducers from './reducers';

import React, { FC, ReactNode } from 'react';
import { ReducersMapObject, combineReducers } from 'redux';

import ReduxProviderFactory from './_providers/ReduxProviderFactory';
import { StateType } from 'typesafe-actions';
import createStore from './createStore';

/* ------------- Reducers ------------- */
const allReducers = Object.values(reducers).reduce(
    (prev: ReducersMapObject, curr: Record<string, any>): ReducersMapObject => {
        return {
            ...prev,
            ...curr.reducerMap,
        };
    },
    {},
);

const rootReducer = combineReducers(allReducers);

export type RootState = StateType<typeof rootReducer>;

/* ------------- Create Store ------------- */
const { store } = createStore(rootReducer);

// persistor.purge();

interface Props {
    loading?: ReactNode;
    children: ReactNode;
}

/* ------------- Create Provider ------------- */
export const ReduxProvider: FC<Props> = ({ children }) => (
    <ReduxProviderFactory store={store}>{children}</ReduxProviderFactory>
);
