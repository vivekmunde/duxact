import { useContext } from 'react';
import StoreContext from './store-context';
import { TOnDispatch, TStoreContext } from './types';

const useDispatch = <TState,>(): TOnDispatch<TState> => {
  const { duxactStore } = useContext<TStoreContext<TState>>(StoreContext);

  return duxactStore.dispatch;
};

export default useDispatch;
