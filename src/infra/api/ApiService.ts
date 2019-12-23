import ky, { Options } from 'ky';

import { API_CONFIG } from 'src/constants';
import { Request, AuthRequest, FailureResponse } from './interfaces';
import { withUserToken, getResponseWithLinkHeaderInfo } from './utilities';

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
                (_request, _options, response): void => {
                    console.log('[DEV] API RESPONSE', {
                        response,
                        link: response.headers.get('Link'),
                    });
                },
            ],
        },
    };

    const api = ky.extend(apiConfig);

    const post: Request = async ({ url, data, options }) => {
        // https://github.com/sindresorhus/ky#json
        if (data) {
            options = {
                ...options,
                json: data,
            };
        }

        const res = await api.post(url, options);

        return getResponseWithLinkHeaderInfo(res);
    };
    const get: Request = async ({ url, data, options }) => {
        // https://github.com/sindresorhus/ky#searchparams
        if (data) {
            options = {
                ...options,
                searchParams: data,
            };
        }

        const res = await api.get(url, options);

        return getResponseWithLinkHeaderInfo(res);
    };
    const del: Request = async ({ url, options }) => {
        const res = await api.delete(url, options);

        return getResponseWithLinkHeaderInfo(res);
    };
    const put: Request = async ({ url, data, options }) => {
        // https://github.com/sindresorhus/ky#json
        if (data) {
            options = {
                ...options,
                json: data,
            };
        }

        const res = await api.put(url, options);

        return getResponseWithLinkHeaderInfo(res);
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
        return arg.message !== undefined;
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
