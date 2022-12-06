var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import isUserDefinedObject from './is-user-defined-object';
import isFunction from './is-function';
var injectDispatch = function (dispatchMapping) {
    return function (dispatch) {
        if (!isUserDefinedObject(dispatchMapping)) {
            throw new Error('Dispatch mapping must be a user defined object.');
        }
        return Object.keys(dispatchMapping)
            .reduce(function (dispatchers, currentMappingKey) {
            if (!isFunction(dispatchMapping[currentMappingKey])) {
                throw new Error('Dispatcher must be a function.');
            }
            dispatchers[currentMappingKey] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return dispatchMapping[currentMappingKey].apply(dispatchMapping, __spreadArray([dispatch], args, false));
            };
            return dispatchers;
        }, {});
    };
};
export default injectDispatch;
//# sourceMappingURL=inject-dispatch.js.map