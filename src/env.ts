if (!globalThis?.process) {
    globalThis.process = {
        env: {} as NodeJS.ProcessEnv
    } as NodeJS.Process;
}

const env: ImportMetaEnv = {
    NODE_ENV: import.meta.env.NODE_ENV,
    PUBLIC_URL: import.meta.env.PUBLIC_URL,
    VITE_APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION,
    VITE_APP_FACEBOOK_APP_ID: import.meta.env.VITE_APP_FACEBOOK_APP_ID,
    VITE_APP_GA4_TRACKING_ID: import.meta.env.VITE_APP_GA4_TRACKING_ID,
    VITE_APP_GA_TRACKING_ID: import.meta.env.VITE_APP_GA_TRACKING_ID,
    VITE_APP_GIT_HEAD: import.meta.env.VITE_APP_GIT_HEAD,
    VITE_APP_KEYWORDS: import.meta.env.VITE_APP_KEYWORDS,
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
    VITE_APP_PACKAGE_NAME: import.meta.env.VITE_APP_PACKAGE_NAME,
    VITE_APP_POSTHOG_API_KEY: import.meta.env.VITE_APP_POSTHOG_API_KEY,
    VITE_APP_STATIC_HOST: import.meta.env.VITE_APP_STATIC_HOST,
    VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
    VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION,
    VITE_APP_WORK_OFFLINE: import.meta.env.VITE_APP_WORK_OFFLINE,
    VITE_APP_BUILD_REASON: import.meta.env.VITE_APP_BUILD_REASON,
    VITE_APP_BUILD_SOURCEBRANCH: import.meta.env.VITE_APP_BUILD_SOURCEBRANCH,
    VITE_APP_BUILD_SOURCEVERSIONAUTHOR: import.meta.env
        .VITE_APP_BUILD_SOURCEVERSIONAUTHOR,
    VITE_APP_PULLREQUEST_SOURCEBRANCH: import.meta.env
        .VITE_APP_PULLREQUEST_SOURCEBRANCH,
    VITE_APP_BUILD_NUM: import.meta.env.VITE_APP_BUILD_NUM,
    VITE_APP_PULLREQUEST_TARGETBRANCH: import.meta.env
        .VITE_APP_PULLREQUEST_TARGETBRANCH,
    VITE_APP_BUILD_TIME: import.meta.env.VITE_APP_BUILD_TIME,
    SENTRY_AUTH_TOKEN: import.meta.env.SENTRY_AUTH_TOKEN,
    BASE_URL: import.meta.env.BASE_URL,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    SSR: import.meta.env.SSR
};

export default env;
