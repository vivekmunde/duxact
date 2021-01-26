import React from 'react';
import isEqual from 'fast-deep-equal';
import isUndefinedOrNull from './is-undefined-or-null';
import isFunction from './is-function';
import storeContextType from './store-context-type';

const connect = mapStateToProps => Component => {
  class ConnectState extends React.Component {
    static contextTypes = storeContextType;

    constructor(props, context) {
      super(props, context);
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

    listener = state => {
      const currentState = this.state;
      const newState = mapStateToProps(state);
      if (!isEqual(currentState, newState)) {
        this.setState(newState);
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