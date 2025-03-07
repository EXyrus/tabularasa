import type { FetchPayload } from './payload';

export type FetchAction = {
    type: 'FETCH';
    payload: FetchPayload & {
        errorMessage?: string;
        onError?: Function;
        onSuccess?: Function;
        parse?: boolean;
        resourceName: 'TOKEN' | 'USERS';
        showMessageOnError?: boolean;
        showSpinner?: boolean;
        silent?: boolean;
        successMessage?: string;
        trigger?: boolean;
        url: string;
    };
};
