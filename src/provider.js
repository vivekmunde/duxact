import React from 'react';
import isUndefinedOrNull from './is-undefined-or-null';
import storeContextType from './store-context-type';

class Provider extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { store } = props;

    if (isUndefinedOrNull(store)) {
      throw new Error('Store is undefined.');
    }

    this.duxactStore = store;
  }

  getChildContext() {
    return { duxactStore: this.duxactStore };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Provider.childContextTypes = storeContextType;

export default Provider;
