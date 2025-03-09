
import merge from 'lodash/merge';
import env from '../env';
import a from './a.json';
import base from './default.json';
import dev from './dev.json';
import int from './int.json';
import prod from './prod.json';
import qa from './qa.json';
import staging from './staging.json';

const PREFIX = 'VITE_APP_';

const { hostname, port } = globalThis.location;
let ENV = 'local';

let override = {};

const isLocalhost = ['localhost', 'tabularasa.internal'].includes(hostname);

switch (hostname) {
    case 'dev.tabularasa.com.ng':
        ENV = 'dev';
        override = dev;
        break;
    case 'qa.tabularasa.com.ng':
        ENV = 'qa';
        override = qa;
        break;
    case 'int.tabularasa.com.ng':
        ENV = 'int';
        override = int;
        break;
    case 'a.tabularasa.com.ng':
        ENV = 'a';
        override = a;
        break;
    case 'staging.tabularasa.com.ng':
        ENV = 'staging';
        override = staging;
        break;
    case 'tabularasa.ng':
        ENV = 'prod';
        override = prod;
        break;
    default:
        if (!isLocalhost) {
            override = dev;
        }

        if (!['3000'].includes(port) && !base.API_HOST) {
            base.API_HOST = 'api.tabularasa.internal';
        }
}

const envConfig = Object.fromEntries(
    Object.entries(env)
        .filter(([key]) => {
            return (key as string).startsWith(PREFIX);
        })
        .map(([key, value]: [string, string]) => {
            return [key.replace(PREFIX, ''), value];
        })
);
const config = merge({}, base, envConfig, override, {
    ENV
});

export default Object.freeze(config) as typeof base;
