import type { FetchResponseBase } from './base';

type ValidationError = string[];
export type ServerErrors = Record<string, ValidationError[]>;

type Error = {
    message: string;
    url: string;
    errors?: ServerErrors;
    errorCode?: string;
};
export type FetchResponseError = FetchResponseBase & Error;
