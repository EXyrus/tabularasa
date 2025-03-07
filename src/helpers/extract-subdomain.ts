import config from 'config';

export const extractSubdomain = () => {
    const env = config.ENV;
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    if (env === hostname) {
        return null;
    } else {
        return parts[0];
    }
};
