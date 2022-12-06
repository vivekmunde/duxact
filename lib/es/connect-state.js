var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import deepEqual from 'fast-deep-equal';
import React from 'react';
import isFunction from './is-function';
import isUndefinedOrNull from './is-undefined-or-null';
import StoreContext from './store-context';
var connect = function (mapStateToProps, areEqual) { return function (Component) {
    var ConnectState = /** @class */ (function (_super) {
        __extends(ConnectState, _super);
        function ConnectState(props, context) {
            var _this = _super.call(this, props) || this;
            _this.subscribeToStateChanges = function () {
                _this.unsubscribe = _this.duxactStore.subscribe(_this.listener);
            };
            _this.unsubscribeFromStateChanges = function () {
                _this.unsubscribe();
            };
            _this.listener = function (newState) {
                var prevMappedState = _this.state;
                var newMappedState = mapStateToProps(newState);
                if (!(areEqual !== null && areEqual !== void 0 ? areEqual : deepEqual)(prevMappedState, newMappedState)) {
                    _this.setState(newMappedState);
                }
            };
            if (isUndefinedOrNull(context.duxactStore)) {
                throw new Error('Store is not available in context. Use Provider to define the store in context.');
            }
            var duxactStore = context.duxactStore;
            if (!isFunction(mapStateToProps)) {
                throw new Error('State mapping must be a function.');
            }
            _this.duxactStore = duxactStore;
            _this.state = mapStateToProps(duxactStore.getState());
            _this.unsubscribe = function () { return undefined; };
            _this.subscribeToStateChanges();
            return _this;
        }
        ConnectState.prototype.componentWillUnmount = function () {
            this.unsubscribeFromStateChanges();
        };
        ConnectState.prototype.render = function () {
            return (React.createElement(Component, __assign({}, this.props, this.state)));
        };
        ConnectState.contextType = StoreContext;
        return ConnectState;
    }(React.Component));
    return ConnectState;
}; };
export default connect;
//# sourceMappingURL=connect-state.js.map