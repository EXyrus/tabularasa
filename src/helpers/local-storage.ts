
import * as Sentry from '@/overrides/sentry.override';
import type { AppType } from '@/types';

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

// Helper function to specifically get the app type
export const getAppType = (): AppType => {
    const appType = getLocalStorageItem('appType');
    
    if (appType === 'vendor' || appType === 'institution' || appType === 'guardian') {
        return appType;
    }
    
    // Default to vendor if no valid app type is found
    return 'vendor';
};

