import isUndefinedOrNull from './is-undefined-or-null';

export default (val: any) => {
  return !isUndefinedOrNull(val)
    && !Array.isArray(val)
    && typeof val === 'object';
}