"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var StoreContext = react_1.default.createContext({
    duxactStore: {
        dispatch: function () {
            throw new Error('Store is not available in context. Use Provider to define the store in context.');
        },
        getState: function () {
            throw new Error('Store is not available in context. Use Provider to define the store in context.');
        },
        subscribe: function () {
            throw new Error('Store is not available in context. Use Provider to define the store in context.');
        },
    },
});
exports.default = StoreContext;
//# sourceMappingURL=store-context.js.map