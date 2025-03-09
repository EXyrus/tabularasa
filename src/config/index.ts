
import merge from 'lodash/merge';
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

const isLocalhost = [
    'localhost',
    'tabularasa.internal'
].includes(hostname);

switch(hostname) {
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

// Get environment variables from import.meta.env instead of using an env module
const envVariables = import.meta.env;
const envConfig = Object.fromEntries(
  Object.entries(envVariables).filter(([key]) => {
    return key.startsWith(PREFIX);
  }).map(([key, value]) => {
    return [
      key.replace(PREFIX, ''),
      value
    ];
  })
);

const config = merge({}, base, envConfig, override, {
    ENV,
    CDN_PREFIX: 'https://cdn.tabularasa.com.ng'
});

export default Object.freeze(config);
