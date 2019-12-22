import { Reducer, Store, applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware, { Saga } from 'redux-saga';

import container from 'src/container';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';

interface CreatedStore {
    store: Store;
}

// creates the store
export default (rootReducer: Reducer, rootSaga: Saga): CreatedStore => {
    /* ------------- Redux Configuration ------------- */

    const middleware = [thunkMiddleware];
    const enhancers = [];

    /* ------------- Saga Middleware ------------- */

    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);
    // middleware.push(GraphQLClient.middleware())

    /* ------------- Assemble Middleware ------------- */

    enhancers.push(applyMiddleware(...middleware));

    /* ------------- createStore ------------- */

    const store = createStore(rootReducer, compose(...enhancers));

    // kick off root saga
    // sagaMiddleware.run(rootSaga, getFirebase)
    sagaMiddleware.run(rootSaga, container);

    return { store };
};
