import React from 'react';
import isUndefinedOrNull from './is-undefined-or-null';
import StoreContext from './store-context';

class Provider extends React.Component {
  constructor(props) {
    super(props);

    const { store } = props;

    if (isUndefinedOrNull(store)) {
      throw new Error('Store is undefined.');
    }

    this.duxactStore = store;
  }

  render() {
    return (
      <StoreContext.Provider value={{ duxactStore: this.duxactStore }}>
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      </StoreContext.Provider>
    );
  }
}

export default Provider;
