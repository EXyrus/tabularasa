import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';

export const mapKeyToCamelCase = (response: object) =>
    mapKeys(response, (_value, key) => camelCase(key));
