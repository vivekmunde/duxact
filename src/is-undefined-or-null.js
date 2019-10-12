import isUndefined from './is-undefined';
import isNull from './is-null';

export default (val) => isUndefined(val) || isNull(val);