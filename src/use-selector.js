import { useContext, useEffect, useState, useRef } from 'react';
import deepEqual from 'fast-deep-equal';
import isUndefinedOrNull from './is-undefined-or-null';
import isFunction from './is-function';
import StoreContext from './store-context';

const useSelector = (selector, areEqual = deepEqual) => {
  const { duxactStore } = useContext(StoreContext);

  if (isUndefinedOrNull(duxactStore)) {
    throw new Error('Store is not available in context. Use Provider to define the store in context.');
  }

  if (!isFunction(selector)) {
    throw new Error('Selector must be a function.');
  }

  const ref = useRef({ state: null });
  const [state, setState] = useState(selector(duxactStore.getState()));

  useEffect(() => {
    ref.current.state = state;

    const listener = function (newState) {
      const newSelectedState = selector(newState);
      if (!areEqual(ref.current.state, newSelectedState)) {
        ref.current.state = newSelectedState;
        setState(newSelectedState);
      }
    };

    const unsubscribeFromStateChanges = duxactStore.subscribe(listener);

    return function () {
      unsubscribeFromStateChanges();
    }
  }, []);

  return state;
};

export default useSelector;
