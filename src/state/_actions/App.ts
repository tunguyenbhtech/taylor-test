import { createAction } from 'typesafe-actions';
import { createActionTypePrefixFormat } from '../common';

const typePrefixFormat = createActionTypePrefixFormat('App');

/* ------------- action creators ------------- */
export const initializeApp = createAction(
    typePrefixFormat('INITIALIZE_APP'),
    undefined, // payload creator
)();

export const initializeAppFinished = createAction(
    typePrefixFormat('CURRENT_ERROR_FINISH'),
    undefined, // payload creator
)();

export type AppActions =
    | ReturnType<typeof initializeApp>
    | ReturnType<typeof initializeAppFinished>;
