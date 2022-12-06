import deepEqual from 'fast-deep-equal';
import { useContext, useEffect, useRef, useState } from 'react';
import isFunction from './is-function';
import StoreContext from './store-context';
var useSelector = function (selector, areEqual) {
    var duxactStore = useContext(StoreContext).duxactStore;
    if (!isFunction(selector)) {
        throw new Error('Selector must be a function.');
    }
    var ref = useRef({ state: null });
    var _a = useState(selector(duxactStore.getState())), state = _a[0], setState = _a[1];
    useEffect(function () {
        ref.current.state = state;
        var listener = function (newState) {
            var newSelectedState = selector(newState);
            if (!(areEqual !== null && areEqual !== void 0 ? areEqual : deepEqual)(ref.current.state, newSelectedState)) {
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
export default useSelector;
//# sourceMappingURL=use-selector.js.map