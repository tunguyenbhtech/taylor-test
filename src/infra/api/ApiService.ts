import ky, { Options } from 'ky';

import { API_CONFIG } from 'src/constants';
import { UserToken } from 'src/domain/user';
import { withUserToken } from './utilities';

type RequestParams = {
    url: string;
    options?: Options;
    data?: Record<string, any>;
};

type AuthRequestParams = {
    userToken: UserToken;
} & RequestParams;

type Request = (params: RequestParams) => Promise<any>;
type AuthRequest = (params: AuthRequestParams) => Promise<any>;

export type SuccessResponse = {
    success?: any;
    message?: string;
};

export type FailureResponse = {
    error: any;
};

export type ApiResponse = SuccessResponse | FailureResponse;

export interface ApiService {
    post: Request;
    get: Request;
    del: Request;
    put: Request;
    authGet: AuthRequest;
    authPost: AuthRequest;
    authDel: AuthRequest;
    authPut: AuthRequest;
    isFailureResponse: (arg: any) => arg is FailureResponse;
}

const PREFIX_URL = API_CONFIG.HOST;

// Api service factory
export default (): ApiService => {
    const apiConfig: Options = {
        prefixUrl: PREFIX_URL,
        timeout: API_CONFIG.timeout,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        throwHttpErrors: false,
        retry: 0,
        hooks: {
            beforeRequest: [
                (request): void => {
                    console.log('[DEV] API REQUEST', { request });
                },
            ],
            afterResponse: [
                (response): void => {
                    console.log('[DEV] API RESPONSE', { response });
                },
            ],
        },
    };

    const api = ky.extend(apiConfig);

    const post: Request = ({ url, data, options }) => {
        // https://github.com/sindresorhus/ky#json
        if (data) {
            options = {
                ...options,
                json: data,
            };
        }

        return api.post(url, options).json();
    };
    const get: Request = ({ url, data, options }) => {
        // https://github.com/sindresorhus/ky#searchparams
        if (data) {
            options = {
                ...options,
                searchParams: data,
            };
        }

        return api.get(url, options).json();
    };
    const del: Request = ({ url, options }) => api.delete(url, options).json();
    const put: Request = ({ url, data, options }) => {
        // https://github.com/sindresorhus/ky#json
        if (data) {
            options = {
                ...options,
                json: data,
            };
        }

        return api.put(url, options).json();
    };

    const authGet: AuthRequest = ({ url, userToken, data, options = {} }) =>
        get({ url, data, options: withUserToken(options, userToken) });

    const authPost: AuthRequest = ({ url, userToken, data, options = {} }) =>
        post({ url, data, options: withUserToken(options, userToken) });

    const authDel: AuthRequest = ({ url, userToken, options = {} }) =>
        del({ url, options: withUserToken(options, userToken) });

    const authPut: AuthRequest = ({ url, userToken, data, options = {} }) =>
        put({ url, data, options: withUserToken(options, userToken) });

    /**
     * API Failure Response type guard
     *
     * @param {*} arg any
     * @returns {arg is FailureResponse}
     */
    const isFailureResponse = (arg: any): arg is FailureResponse => {
        return arg.error !== undefined;
    };

    return {
        post,
        get,
        del,
        put,
        authGet,
        authPost,
        authDel,
        authPut,
        isFailureResponse,
    };
};
