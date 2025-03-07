import type { FetchResponseBase } from './base';

type Success<T> = {
    data: T;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
};

export type FetchResponseSuccess<T = {}> = FetchResponseBase & Success<T>;
