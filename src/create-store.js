import isFunction from './is-function';

export default function createStore(preloadedState) {
    let currentState = preloadedState || {};
    let listeners = [];

    function getState() {
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

        listeners.push(listener);

        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }

    function dispatch(action) {
        currentState = reducer(action);

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