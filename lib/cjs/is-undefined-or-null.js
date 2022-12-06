"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var is_null_1 = __importDefault(require("./is-null"));
var is_undefined_1 = __importDefault(require("./is-undefined"));
exports.default = (function (val) { return (0, is_undefined_1.default)(val) || (0, is_null_1.default)(val); });
//# sourceMappingURL=is-undefined-or-null.js.map