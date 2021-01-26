import React from 'react';
import isUndefinedOrNull from './is-undefined-or-null';
import isFunction from './is-function';
import StoreContext from './store-context';

const connect = mapDispatchToProps => Component => {
  class ConnectDispatch extends React.Component {
    static contextType = StoreContext;

    constructor(props, context) {
      super(props);
      const { duxactStore } = context;

      if (isUndefinedOrNull(duxactStore)) {
        throw new Error('Store is not available in context. Use Provider to define the store in context.');
      }

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