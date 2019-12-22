import { createAction } from 'typesafe-actions';
import { createActionTypePrefixFormat } from '../common';

const typePrefixFormat = createActionTypePrefixFormat('Fetching');

/* ------------- action creators ------------- */
export const started = createAction(typePrefixFormat('STARTED'))();

export const stopped = createAction(typePrefixFormat('STOPPED'))();

export type FetchingActions =
    | ReturnType<typeof started>
    | ReturnType<typeof stopped>;
