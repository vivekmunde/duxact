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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var is_undefined_or_null_1 = __importDefault(require("./is-undefined-or-null"));
var store_context_1 = __importDefault(require("./store-context"));
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider(props) {
        var _this = _super.call(this, props) || this;
        var store = props.store;
        if ((0, is_undefined_or_null_1.default)(store)) {
            throw new Error('Store is undefined.');
        }
        _this.value = { duxactStore: store };
        return _this;
    }
    Provider.prototype.render = function () {
        return (react_1.default.createElement(store_context_1.default.Provider, { value: this.value },
            react_1.default.createElement(react_1.default.Fragment, null, this.props.children)));
    };
    return Provider;
}(react_1.default.Component));
exports.default = Provider;
//# sourceMappingURL=provider.js.map