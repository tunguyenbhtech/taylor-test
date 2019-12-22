import { createAction, createCustomAction } from 'typesafe-actions';

import { SagaThunkMeta } from './interfaces';
import { createActionTypePrefixFormat } from '../common';

const typePrefixFormat = createActionTypePrefixFormat('Error');

/* ------------- action creators ------------- */
export const errorsQueueAppend = createAction(
    typePrefixFormat('ERRORS_QUEUE_APPEND'),
    (error: Error) => ({ error }),
)();

export const currentErrorFinish = createAction(
    typePrefixFormat('CURRENT_ERROR_FINISH'),
)();

export const requestFailure = createCustomAction(
    typePrefixFormat('REQUEST_FAILURE'),
    (error?: boolean | Error, payload?: any, meta?: SagaThunkMeta) => ({
        payload,
        error,
        meta,
    }),
);

export type ErrorActions =
    | ReturnType<typeof errorsQueueAppend>
    | ReturnType<typeof currentErrorFinish>
    | ReturnType<typeof requestFailure>;
