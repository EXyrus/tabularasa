export type ResponseStatus = 'success' | 'error' | 'failure';

export type FetchResponseBase = {
    code?: number;
    status: ResponseStatus;
    message?: string;
};
