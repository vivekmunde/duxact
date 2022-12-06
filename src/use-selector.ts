import deepEqual from 'fast-deep-equal';
import { useContext, useEffect, useRef, useState } from 'react';
import isFunction from './is-function';
import StoreContext from './store-context';
import { TListener, TStoreContext } from './types';

const useSelector = <TState, TSelectedState>(selector: (state: TState) => TSelectedState, areEqual?: (a: TSelectedState | null | undefined, b: TSelectedState | null | undefined) => boolean) => {
  const { duxactStore } = useContext<TStoreContext<TState>>(StoreContext);

  if (!isFunction(selector)) {
    throw new Error('Selector must be a function.');
  }

  const ref = useRef<{ state: TSelectedState | null | undefined }>({ state: null });
  const [state, setState] = useState<TSelectedState>(selector(duxactStore.getState()));

  useEffect(() => {
    ref.current.state = state;

    const listener: TListener<TState> = (newState) => {
      const newSelectedState = selector(newState);
      if (!(areEqual ?? deepEqual)(ref.current.state, newSelectedState)) {
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
