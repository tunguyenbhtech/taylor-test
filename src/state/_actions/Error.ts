import { createAction } from 'typesafe-actions';

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

export type ErrorActions =
    | ReturnType<typeof errorsQueueAppend>
    | ReturnType<typeof currentErrorFinish>;
