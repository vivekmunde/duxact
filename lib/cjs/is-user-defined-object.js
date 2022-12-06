"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var is_undefined_or_null_1 = __importDefault(require("./is-undefined-or-null"));
exports.default = (function (val) {
    return !(0, is_undefined_or_null_1.default)(val)
        && !Array.isArray(val)
        && typeof val === 'object';
});
//# sourceMappingURL=is-user-defined-object.js.map