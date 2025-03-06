import Cookies from 'js-cookie';
import { v4 as uuid } from 'uuid';
import env from 'env';
import type { AppScope, BrowserId, SessionId } from 'types';

export type AppInfo = {
    version: string;
    buildNumber: string;
    buildBranch: string;
    buildTime: string;
    buildReason: string;
    pullRequest: {
        source: string;
        target: string;
    };
    author: string;
    packageName: string;
};

const sessionId = uuid() as SessionId;
let browserId = Cookies.get('browserId') as BrowserId;

if (!browserId) {
    browserId = uuid() as BrowserId;
}

Cookies.set('browserId', browserId, {
    expires: 12 * 30 // 1 year
});

export const getAppInfo = (): AppInfo => {
    const {
        VITE_APP_BUILD_NUM = '',
        VITE_APP_BUILD_REASON = '',
        VITE_APP_BUILD_SOURCEBRANCH = '',
        VITE_APP_BUILD_SOURCEVERSIONAUTHOR = '',
        VITE_APP_BUILD_TIME = Date.now(),
        VITE_APP_GIT_HEAD = '',
        VITE_APP_PULLREQUEST_SOURCEBRANCH = '',
        VITE_APP_PULLREQUEST_TARGETBRANCH = '',
        VITE_APP_VERSION = '',
        VITE_APP_PACKAGE_NAME = '@tabularasa/website'
    } = env;

    return {
        version: `${VITE_APP_VERSION}-${VITE_APP_GIT_HEAD.substring(
            0,
            7
        )}${VITE_APP_BUILD_NUM ? `+${VITE_APP_BUILD_NUM}` : ''}`,
        buildNumber: VITE_APP_BUILD_NUM,
        buildTime: new Date(VITE_APP_BUILD_TIME).toLocaleString('en-US', {
            timeZone: 'Africa/Lagos',
            timeZoneName: 'short'
        }),
        buildBranch: VITE_APP_BUILD_SOURCEBRANCH.replace('refs/heads/', ''),
        buildReason: VITE_APP_BUILD_REASON,
        pullRequest: {
            source: VITE_APP_PULLREQUEST_SOURCEBRANCH.replace(
                'refs/heads/',
                ''
            ),
            target: VITE_APP_PULLREQUEST_TARGETBRANCH.replace('refs/heads/', '')
        },
        author: VITE_APP_BUILD_SOURCEVERSIONAUTHOR,
        packageName: VITE_APP_PACKAGE_NAME
    };
};

export const getAppName = () => env.VITE_APP_NAME || '';

export const getAppRoot = () => {
    return document.getElementById('root') ?? document.body;
};

export const getBrowserId = () => {
    return browserId;
};

export const getSessionId = () => {
    return sessionId;
};

export const getVendorAppScope = (): AppScope => {
    return 'vendor';
};

export const getInstitutionAppScope = (): AppScope => {
    return 'institution';
};

export const getStudentAppScope = (): AppScope => {
    return 'student';
};

export const getAppScope = (): AppScope => {
    const { hostname, pathname } = globalThis.location;
    const parts = hostname
        .split('.')
        .concat(pathname.split('/'))
        .filter(Boolean);

    // vendor
    if (parts.includes(getVendorAppScope())) {
        return getVendorAppScope();
    }

    // institution
    if (parts.includes(getInstitutionAppScope())) {
        return getInstitutionAppScope();
    }

    // student
    if (parts.includes(getStudentAppScope())) {
        return getStudentAppScope();
    }

    return 'public';
};

export const getInstitutionScope = () => {
    // get institution info  from local storage
    const institutionInfo = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return institutionInfo;
};
