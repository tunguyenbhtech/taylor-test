import { UserToken } from 'src/domain/user';
import { Options } from 'ky';

type RequestParams = {
    url: string;
    options?: Options;
    data?: Record<string, any>;
};

type AuthRequestParams = {
    userToken: UserToken;
} & RequestParams;

export type Request = (params: RequestParams) => Promise<any>;
export type AuthRequest = (params: AuthRequestParams) => Promise<any>;

export type SuccessResponse = any;

export type FailureResponse = {
    message: string;
    documentation_url?: string;
};

export interface LinkInfo {
    page: string;
    per_page: string;
    rel: string;
    url: string;
    [x: string]: string;
}

export interface LinkHeader {
    next?: LinkInfo;
    prev?: LinkInfo;
    last?: LinkInfo;
}

export interface ApiResponse<T = SuccessResponse> {
    data: T;
    meta?: {
        link?: LinkHeader;
    };
}
