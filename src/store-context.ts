import React from 'react';
import { TStoreContext } from './types';

type TState = any;

const StoreContext = React.createContext<TStoreContext<TState>>({
    duxactStore: {
        dispatch: () => {
            throw new Error('Store is not available in context. Use Provider to define the store in context.');
        },
        getState: () => {
            throw new Error('Store is not available in context. Use Provider to define the store in context.');
        },
        subscribe: () => {
            throw new Error('Store is not available in context. Use Provider to define the store in context.');
        },
    },
});

export default StoreContext;
