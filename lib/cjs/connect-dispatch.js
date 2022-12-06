"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var is_function_1 = __importDefault(require("./is-function"));
var is_undefined_or_null_1 = __importDefault(require("./is-undefined-or-null"));
var store_context_1 = __importDefault(require("./store-context"));
var connect = function (mapDispatchToProps) { return function (Component) {
    var ConnectDispatch = /** @class */ (function (_super) {
        __extends(ConnectDispatch, _super);
        function ConnectDispatch(props, context) {
            var _this = _super.call(this, props) || this;
            if ((0, is_undefined_or_null_1.default)(context.duxactStore)) {
                throw new Error('Store is not available in context. Use Provider to define the store in context.');
            }
            var duxactStore = context.duxactStore;
            if (!(0, is_function_1.default)(mapDispatchToProps)) {
                throw new Error('Dispatch mapping must be a function.');
            }
            _this.duxactStore = duxactStore;
            _this.dispatchers = mapDispatchToProps(duxactStore.dispatch);
            return _this;
        }
        ConnectDispatch.prototype.render = function () {
            return (react_1.default.createElement(Component, __assign({}, this.props, this.dispatchers)));
        };
        ConnectDispatch.contextType = store_context_1.default;
        return ConnectDispatch;
    }(react_1.default.Component));
    return ConnectDispatch;
}; };
exports.default = connect;
//# sourceMappingURL=connect-dispatch.js.map