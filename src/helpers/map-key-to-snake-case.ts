
import { snakeCase } from 'lodash';

/**
 * Recursively transforms keys of an object from camelCase to snake_case
 * @param {any} object - The object to transform
 * @returns {any} - The transformed object
 */
export const mapKeyToSnakeCase = (object: any): any => {
  if (object === null || object === undefined || typeof object !== 'object') {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(item => mapKeyToSnakeCase(item));
  }

  return Object.keys(object).reduce((acc, key) => {
    const snakeKey = snakeCase(key);
    acc[snakeKey] = mapKeyToSnakeCase(object[key]);
    return acc;
  }, {} as Record<string, any>);
};

export default mapKeyToSnakeCase;
