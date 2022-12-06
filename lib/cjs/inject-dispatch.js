"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var is_user_defined_object_1 = __importDefault(require("./is-user-defined-object"));
var is_function_1 = __importDefault(require("./is-function"));
var injectDispatch = function (dispatchMapping) {
    return function (dispatch) {
        if (!(0, is_user_defined_object_1.default)(dispatchMapping)) {
            throw new Error('Dispatch mapping must be a user defined object.');
        }
        return Object.keys(dispatchMapping)
            .reduce(function (dispatchers, currentMappingKey) {
            if (!(0, is_function_1.default)(dispatchMapping[currentMappingKey])) {
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
exports.default = injectDispatch;
//# sourceMappingURL=inject-dispatch.js.map