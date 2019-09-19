import { isArray, isObject } from 'util';

export function getPropValue(value: any) {
    let propValue = `''`;
    switch (typeof value) {
        case 'boolean':
        case 'number':
            propValue = `${value}`;
            break;
        case 'string':
            propValue = `'${value}'`;
            break;
        default:
            if (isArray(value)) {
                propValue = `[${value.map((item) => {
                    if (typeof item === 'string') {
                        return `'${item}'`;
                    }
                    if (isObject(item)) {
                        return JSON.stringify(item);
                    }
                    return item;
                }).toString()}]`;
            } else if (isObject(value)) {
                propValue = `${JSON.stringify(value)}`;
            }
    }
    return propValue;
}
