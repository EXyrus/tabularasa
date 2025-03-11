import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';

 const mapKeyToCamelCase = (response: object) =>
    mapKeys(response, (_value, key) => camelCase(key));

export default mapKeyToCamelCase;