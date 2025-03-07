// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck disable for now
import PATHS from 'pages/institution/paths.json';
import config from 'config';
import { getRemoteConfigBooleanValue } from 'overrides/firebase.remote-config';
import { extractSubdomain } from './extract-subdomain';

export const getTenantUrl = (route: string) => {
    const subdomain = extractSubdomain();
    const isTenantSubdomain = subdomain !== null;
    const isUseSubDomainEnabled =
        isTenantSubdomain && getRemoteConfigBooleanValue('UseSubDomain');
    const env = config.ENV;
    let destination = '';

    if (env === 'server' && isUseSubDomainEnabled) {
        destination = PATHS[route as keyof typeof PATHS]?.server;
    } else {
        destination = PATHS[route as keyof typeof PATHS]?.local;
    }

    return destination;
};
