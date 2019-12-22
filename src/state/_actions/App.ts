import { SagaThunkMeta } from './interfaces';
import { createAction } from 'typesafe-actions';
import { createActionTypePrefixFormat } from '../common';

const typePrefixFormat = createActionTypePrefixFormat('App');

/* ------------- action creators ------------- */
export const initializeApp = createAction(
    typePrefixFormat('INITIALIZE_APP'),
    undefined, // payload creator
    (meta: SagaThunkMeta) => meta,
)();

export const initializeAppFinished = createAction(
    typePrefixFormat('CURRENT_ERROR_FINISH'),
    undefined, // payload creator
    (meta: SagaThunkMeta) => meta,
)();

export type AppActions =
    | ReturnType<typeof initializeApp>
    | ReturnType<typeof initializeAppFinished>;
