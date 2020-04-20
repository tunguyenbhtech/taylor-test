import { APP_CONFIG } from 'src/constants';
import { Action } from 'redux';
import { AwilixContainer } from 'awilix';
import { Cradle } from 'src/container';
import { RootState } from 'src/state';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export const reducerPrefixFormat: (key: string) => string = _key =>
    `${APP_CONFIG.prefixReducer}/${_key}/`.toUpperCase();

export const createActionTypePrefixFormat = (
    prefix: string,
): ((name: string) => string) => {
    const actionTypePrefixFormat = (type: string): string => {
        return reducerPrefixFormat(prefix) + type;
    };

    return actionTypePrefixFormat;
};

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    AwilixContainer<Cradle>,
    Action<string>
>;

export type AppThunkDispatch = ThunkDispatch<
    RootState,
    AwilixContainer<Cradle>,
    Action<string>
>;
