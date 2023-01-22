type PlainObject<T = any> = {
    [k in string]: T;
};

function isObjectLike(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}
function isEqual(a: object, b: object): boolean {
    // @ts-ignore
    return isObjectLike(a) && isObjectLike(b) ? Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(key => isEqual(a[key], b[key])): a === b
}

export default isEqual
