"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var store_context_1 = __importDefault(require("./store-context"));
var useDispatch = function () {
    var duxactStore = (0, react_1.useContext)(store_context_1.default).duxactStore;
    return duxactStore.dispatch;
};
exports.default = useDispatch;
//# sourceMappingURL=use-dispatch.js.map