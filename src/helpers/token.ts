
import type { TokenPayload } from '@/types';
import * as Sentry from '@/overrides/sentry.override';
import { setLocalStorageItem } from './local-storage';

export const decodeTokenPayload = (payload: string) => {
    try {
        const decodedPayload = atob(payload);

        return JSON.parse(decodedPayload) as TokenPayload;
    } catch (error) {
        Sentry.captureException(error);

        return null;
    }
};

export const getTokenPayload = (payload: string) => {
    const decodedPayload = decodeTokenPayload(payload);

    setLocalStorageItem('token', decodedPayload?.token as string);

    return decodedPayload;
};
