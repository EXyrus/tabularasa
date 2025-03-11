
import { camelCase } from 'lodash';

/**
 * Recursively transforms keys of an object from snake_case to camelCase
 * @param {any} object - The object to transform
 * @returns {any} - The transformed object
 */
export const mapKeyToCamelCase = (object: any): any => {
  if (object === null || object === undefined || typeof object !== 'object') {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(item => mapKeyToCamelCase(item));
  }

  return Object.keys(object).reduce((acc, key) => {
    const camelKey = camelCase(key);
    acc[camelKey] = mapKeyToCamelCase(object[key]);
    return acc;
  }, {} as Record<string, any>);
};
