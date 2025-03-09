
import * as Sentry from '@/overrides/sentry.override';

export const setLocalStorageItem = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        Sentry.captureException(error);
    }
};

export const getLocalStorageItem = (key: string) => {
    try {
        const item = localStorage.getItem(key);

        if (item === null) {
            return null;
        }

        // Try to parse as JSON, if it fails, return the raw string
        try {
            return JSON.parse(item);
        } catch {
            return item;
        }
    } catch (error) {
        Sentry.captureException(error);

        return null;
    }
};

export const removeLocalStorageItem = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        Sentry.captureException(error);
    }
};
