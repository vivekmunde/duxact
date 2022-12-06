import { useContext } from 'react';
import StoreContext from './store-context';
var useDispatch = function () {
    var duxactStore = useContext(StoreContext).duxactStore;
    return duxactStore.dispatch;
};
export default useDispatch;
//# sourceMappingURL=use-dispatch.js.map