import type { FetchResponseError } from './error';
import type { FetchResponseSuccess } from './success';

export type FetchResponse<T = {}> = (
    | FetchResponseSuccess<T>
    | FetchResponseError
) & {
    readonly accessToken?: string;
    readonly refreshToken?: string;
    readonly expiresIn?: number;
};
