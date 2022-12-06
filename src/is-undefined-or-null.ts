import isNull from './is-null';
import isUndefined from './is-undefined';

export default (val: any) => isUndefined(val) || isNull(val);