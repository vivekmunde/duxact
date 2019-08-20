import isUndefinedOrNull from './is-undefined-or-null';

export default function (val) {
    return !isUndefinedOrNull(val)
        && !Array.isArray(val)
        && typeof val === 'object';
}