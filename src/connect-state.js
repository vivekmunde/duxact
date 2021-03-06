import React from 'react';
import deepEqual from 'fast-deep-equal';
import isUndefinedOrNull from './is-undefined-or-null';
import isFunction from './is-function';
import StoreContext from './store-context';

const connect = (mapStateToProps, areEqual = deepEqual) => Component => {
  class ConnectState extends React.Component {
    static contextType = StoreContext;

    constructor(props, context) {
      super(props);
      const { duxactStore } = context;

      if (isUndefinedOrNull(duxactStore)) {
        throw new Error('Store is not available in context. Use Provider to define the store in context.');
      }

      if (!isFunction(mapStateToProps)) {
        throw new Error('State mapping must be a function.');
      }

      this.duxactStore = duxactStore;
      this.state = mapStateToProps(duxactStore.getState());
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

    listener = (newState) => {
      const prevMappedState = this.state;
      const newMappedState = mapStateToProps(newState);
      if (!areEqual(prevMappedState, newMappedState)) {
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