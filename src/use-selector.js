import { useContext, useEffect, useState } from 'react';
import deepEqual from 'fast-deep-equal';
import isUndefinedOrNull from './is-undefined-or-null';
import isFunction from './is-function';
import StoreContext from './store-context';

const useSelector = (mapStateToProps, areEqual = deepEqual) => {
  const { duxactStore } = useContext(StoreContext);

  if (isUndefinedOrNull(duxactStore)) {
    throw new Error('Store is not available in context. Use Provider to define the store in context.');
  }

  if (!isFunction(mapStateToProps)) {
    throw new Error('State mapping must be a function.');
  }

  const [state, setState] = useState(mapStateToProps(duxactStore.getState()));

  useEffect(() => {
    const listener = (updatedState) => {
      const prevState = state;
      const newState = mapStateToProps(updatedState);
      if (!areEqual(prevState, newState)) {
        setState(newState);
      }
    };

    const unsubscribeFromStateChanges = duxactStore.subscribe(listener);

    return () => {
      unsubscribeFromStateChanges();
    }
  }, []);

  return state;
};

export default useSelector;
