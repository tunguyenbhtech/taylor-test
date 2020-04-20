import { Reducer, Store, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import container from 'src/container';

interface CreatedStore {
    store: Store;
}

// creates the store
export default (rootReducer: Reducer): CreatedStore => {
    /* ------------- Redux Configuration ------------- */

    const middleware = [];
    const enhancers = [];

    // middleware.push(GraphQLClient.middleware())

    /* ------------- Thunk Middleware ------------- */
    // inject container to thunk's extra argument
    const thunkMiddleWare = thunk.withExtraArgument(container);
    middleware.push(thunkMiddleWare);

    /* ------------- Assemble Middleware ------------- */

    enhancers.push(applyMiddleware(...middleware));

    /* ------------- createStore ------------- */

    const store = createStore(rootReducer, compose(...enhancers));

    return { store };
};
