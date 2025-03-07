import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';
import isPlainObject from 'lodash/isPlainObject';

export const mapKeyToSnakeCase = (data: object) => {
    if (isPlainObject(data)) {
        return mapKeys(data, (_value, key) => snakeCase(key));
    }

    return data;
};
