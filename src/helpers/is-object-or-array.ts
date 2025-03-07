import isPlainObject from 'lodash/isPlainObject';

export const isObjectOrArray = (data: unknown) => {
    return isPlainObject(data) || Array.isArray(data);
};
