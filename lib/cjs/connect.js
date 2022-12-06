"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connect_dispatch_1 = __importDefault(require("./connect-dispatch"));
var connect_state_1 = __importDefault(require("./connect-state"));
var is_undefined_or_null_1 = __importDefault(require("./is-undefined-or-null"));
var connect = function (mapStateToProps, mapDispatchToProps, areEqual) {
    return function (Component) {
        if ((0, is_undefined_or_null_1.default)(mapStateToProps)) {
            return (0, connect_dispatch_1.default)(mapDispatchToProps)(Component);
        }
        if ((0, is_undefined_or_null_1.default)(mapDispatchToProps)) {
            return (0, connect_state_1.default)(mapStateToProps, areEqual)(Component);
        }
        return (0, connect_state_1.default)(mapStateToProps, areEqual)((0, connect_dispatch_1.default)(mapDispatchToProps)(Component));
    };
};
exports.default = connect;
//# sourceMappingURL=connect.js.map