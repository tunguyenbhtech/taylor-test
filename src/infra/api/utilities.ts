import { ApiResponse } from './interfaces';
import { Options } from 'ky';
import { UserToken } from 'src/domain/user';
import parseLinkHeader from 'parse-link-header';

/**
 * add user token to request header
 *
 * @param {Options} options - url Endpoint
 * @param {UserToken} userToken - user token string
 * @returns {Options}
 */
export const withUserToken = (
    options: Options,
    userToken?: UserToken,
): Options => {
    if (!userToken) {
        return options;
    }

    return {
        ...options,
        headers: {
            ...options.headers,
            authorization: `Bearer ${userToken.authToken}`,
        },
    };
};

/**
 * get api resposne with parsed link header
 *
 * @param {Response} response
 * @returns {Promise<ApiResponse>}
 */
export const getResponseWithLinkHeaderInfo = async (
    response: Response,
): Promise<ApiResponse> => {
    const jsonRes = await response.json();
    const link = parseLinkHeader(response.headers.get('Link'));

    return {
        data: jsonRes,
        meta: {
            link,
        },
    };
};
