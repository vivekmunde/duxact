import deepEqual from 'fast-deep-equal';
import React from 'react';
import isFunction from './is-function';
import isUndefinedOrNull from './is-undefined-or-null';
import StoreContext from './store-context';
import { TListener, TStore, TStoreContext } from './types';

const connect = <TProps, TState, TPropsDerivedFromState>(mapStateToProps: (state: TState) => TPropsDerivedFromState, areEqual?: (a: TPropsDerivedFromState, b: TPropsDerivedFromState) => boolean): ((Component: React.FC<TProps & TPropsDerivedFromState>) => React.ReactNode) => Component => {
  class ConnectState extends React.Component<TProps, TPropsDerivedFromState> {
    static contextType = StoreContext;

    duxactStore: TStore<TState>;

    unsubscribe: () => void;

    constructor(props: TProps, context: TStoreContext<TState>) {
      super(props);
      
      if(isUndefinedOrNull(context.duxactStore)) {
        throw new Error('Store is not available in context. Use Provider to define the store in context.');
      }
      
      const { duxactStore } = context;

      if (!isFunction(mapStateToProps)) {
        throw new Error('State mapping must be a function.');
      }

      this.duxactStore = duxactStore;
      this.state = mapStateToProps(duxactStore.getState());
      this.unsubscribe = () => undefined;
      this.subscribeToStateChanges();
    }

    componentWillUnmount() {
      this.unsubscribeFromStateChanges();
    }

    subscribeToStateChanges = () => {
      this.unsubscribe = this.duxactStore.subscribe(this.listener);
    }

    unsubscribeFromStateChanges = () => {
        this.unsubscribe();
    }

    listener: TListener<TState> = (newState) => {
      const prevMappedState = this.state;
      const newMappedState = mapStateToProps(newState);
      if (!(areEqual ?? deepEqual)(prevMappedState, newMappedState)) {
        this.setState(newMappedState);
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
        />
      );
    }
  }

  return ConnectState;
};

export default connect;