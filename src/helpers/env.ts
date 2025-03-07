import env from 'env';

export const isTestEnv = () => {
    return env.NODE_ENV === 'test';
};

export const isProdEnv = () => {
    return env.NODE_ENV === 'production';
};

export const isDevEnv = () => {
    return env.NODE_ENV === 'development';
};

export const isCypress = () => {
    return typeof globalThis.parent?.Cypress !== 'undefined';
};
