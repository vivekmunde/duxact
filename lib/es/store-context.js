import React from 'react';
var StoreContext = React.createContext({
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
export default StoreContext;
//# sourceMappingURL=store-context.js.map