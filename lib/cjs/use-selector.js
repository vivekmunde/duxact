"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
var react_1 = require("react");
var is_function_1 = __importDefault(require("./is-function"));
var store_context_1 = __importDefault(require("./store-context"));
var useSelector = function (selector, areEqual) {
    var duxactStore = (0, react_1.useContext)(store_context_1.default).duxactStore;
    if (!(0, is_function_1.default)(selector)) {
        throw new Error('Selector must be a function.');
    }
    var ref = (0, react_1.useRef)({ state: null });
    var _a = (0, react_1.useState)(selector(duxactStore.getState())), state = _a[0], setState = _a[1];
    (0, react_1.useEffect)(function () {
        ref.current.state = state;
        var listener = function (newState) {
            var newSelectedState = selector(newState);
            if (!(areEqual !== null && areEqual !== void 0 ? areEqual : fast_deep_equal_1.default)(ref.current.state, newSelectedState)) {
                ref.current.state = newSelectedState;
                setState(newSelectedState);
            }
        };
        var unsubscribeFromStateChanges = duxactStore.subscribe(listener);
        return function () {
            unsubscribeFromStateChanges();
        };
    }, []);
    return state;
};
exports.default = useSelector;
//# sourceMappingURL=use-selector.js.map