import { APP_CONFIG } from 'src/constants';

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
