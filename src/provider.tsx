import React from 'react';
import isUndefinedOrNull from './is-undefined-or-null';
import StoreContext from './store-context';
import { TStore } from './types';

type TProps<TState> = { store: TStore<TState> };

class Provider<TState> extends React.Component<TProps<TState>> {
  value: { duxactStore: TStore<TState> }

  constructor(props: TProps<TState>) {
    super(props);

    const { store } = props;

    if (isUndefinedOrNull(store)) {
      throw new Error('Store is undefined.');
    }

    this.value = { duxactStore: store };
  }

  render() {
    return (
      <StoreContext.Provider value={this.value}>
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      </StoreContext.Provider>
    );
  }
}

export default Provider;
