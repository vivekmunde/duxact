import { useContext } from 'react';
import isUndefinedOrNull from './is-undefined-or-null';
import StoreContext from './store-context';

const useDispatch = () => {
  const { duxactStore } = useContext(StoreContext);

  if (isUndefinedOrNull(duxactStore)) {
    throw new Error('Store is not available in context. Use Provider to define the store in context.');
  }

  return duxactStore.dispatch;
};

export default useDispatch;
