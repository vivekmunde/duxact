import React from 'react';
import isFunction from './is-function';
import isUndefinedOrNull from './is-undefined-or-null';
import StoreContext from './store-context';
import { TOnDispatch, TStore, TStoreContext } from './types';

const connect = <TProps, TState, TDispatchers>(mapDispatchToProps: (dispatch: TOnDispatch<TState>) => TDispatchers): ((Component: React.FC<TProps & TDispatchers>) => React.ReactNode) => Component => {
  class ConnectDispatch extends React.Component<TProps> {
    static contextType = StoreContext;

    duxactStore: TStore<TState>

    dispatchers: TDispatchers

    constructor(props: TProps, context: TStoreContext<TState>) {
      super(props);
      
      if(isUndefinedOrNull(context.duxactStore)) {
        throw new Error('Store is not available in context. Use Provider to define the store in context.');
      }

      const duxactStore = context.duxactStore;

      if (!isFunction(mapDispatchToProps)) {
        throw new Error('Dispatch mapping must be a function.');
      }

      this.duxactStore = duxactStore;
      this.dispatchers = mapDispatchToProps(duxactStore.dispatch);
    }

    render() {
      return (
        <Component
          {...this.props}
          {...this.dispatchers}
        />
      );
    }
  }

  return ConnectDispatch;
};

export default connect;
