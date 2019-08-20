import isFunction from './is-function';

export default function createStore(preloadedState) {
    let currentState = preloadedState || {};
    let listeners = [];
    let isDispatching = false;

    function getState() {
        if (isDispatching) {
            throw new Error('Cannot call getState() as the store is dispatching an action currently and the state is getting updated.');
        }

        return currentState;
    }

    function reducer(action) {
        if (!isFunction(action)) {
            throw new Error('Action must be a function.');
        }

        return {
            ...currentState,
            ...action(currentState),
        };
    }

    function subscribe(listener) {
        if (!isFunction(listener)) {
            throw new Error('Listener must be a function.');
        }

        if (isDispatching) {
            throw new Error('Cannot subscribe as the store is dispatching an action.');
        }

        let isSubscribed = true;

        listeners.push(listener);

        return function unsubscribe() {
            if (!isSubscribed) {
                return;
            }

            if (isDispatching) {
                throw new Error('Cannot unsubscribe as the store is dispatching an action.');
            }

            isSubscribed = false;

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }

    function dispatch(action) {
        if (isDispatching) {
            throw new Error('Cannot dispatch as the store is already dispatching an action.');
        }

        try {
            isDispatching = true;
            currentState = reducer(action);
        } finally {
            isDispatching = false;
        }

        for (let i = 0; i < listeners.length; i++) {
            listeners[i](currentState);
        }
    }

    dispatch(function (state) {
        return state;
    });

    return {
        dispatch,
        getState,
        subscribe
    };
}