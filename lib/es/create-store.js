var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import isFunction from './is-function';
var createStore = function (preloadedState) {
    var currentState = preloadedState;
    var listeners = [];
    var getState = function () {
        return currentState;
    };
    var reducer = function (action) {
        if (!isFunction(action)) {
            throw new Error('Action must be a function.');
        }
        return __assign(__assign({}, currentState), action(currentState));
    };
    var subscribe = function (listener) {
        if (!isFunction(listener)) {
            throw new Error('Listener must be a function.');
        }
        listeners.push(listener);
        return function unsubscribe() {
            var index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    };
    var dispatch = function (action) {
        currentState = reducer(action);
        for (var i = 0; i < listeners.length; i++) {
            listeners[i](currentState);
        }
    };
    dispatch(function (state) {
        return state;
    });
    return {
        dispatch: dispatch,
        getState: getState,
        subscribe: subscribe
    };
};
export default createStore;
//# sourceMappingURL=create-store.js.map