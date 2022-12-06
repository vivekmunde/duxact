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
import React from 'react';
import isUndefinedOrNull from './is-undefined-or-null';
import StoreContext from './store-context';
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider(props) {
        var _this = _super.call(this, props) || this;
        var store = props.store;
        if (isUndefinedOrNull(store)) {
            throw new Error('Store is undefined.');
        }
        _this.value = { duxactStore: store };
        return _this;
    }
    Provider.prototype.render = function () {
        return (React.createElement(StoreContext.Provider, { value: this.value },
            React.createElement(React.Fragment, null, this.props.children)));
    };
    return Provider;
}(React.Component));
export default Provider;
//# sourceMappingURL=provider.js.map