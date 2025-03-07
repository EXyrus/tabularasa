import qs from 'qs';
import md5 from 'blueimp-md5';
import { compile } from 'path-to-regexp';

const BASE_URL = '//gravatar.com/avatar/';

type Options = { size?: number; default?: string };

export const gravatarUrl = (email: string, opts?: Options) => {
    if (!email.includes('@')) {
        throw new Error('Please specify an email');
    }

    const query = qs.stringify(opts);

    return (
        BASE_URL + md5(email.toLowerCase().trim()) + (query ? `?${query}` : '')
    );
};

export const getUrl = <T extends object>(pathname: string, params: T) =>
    compile<T>(pathname)(params);
