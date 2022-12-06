import isFunction from './is-function';
import { TListener, TOnDispatch, TOnSubscribe, TReducer, TStore } from './types';

const createStore = <TState>(preloadedState: TState): TStore<TState> => {
  let currentState: TState = preloadedState;
  let listeners: TListener<TState>[] = [];

  const getState = (): TState => {
    return currentState;
  }

  const reducer: TReducer<TState> = (action) => {
    if (!isFunction(action)) {
      throw new Error('Action must be a function.');
    }

    return {
      ...currentState,
      ...action(currentState),
    };
  }

  const subscribe: TOnSubscribe<TState> = (listener) => {
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

  const dispatch: TOnDispatch<TState> = (action) => {
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

export default createStore;
