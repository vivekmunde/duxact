import React from 'react';
import connectDispatch from './connect-dispatch';
import connectState from './connect-state';
import isUndefinedOrNull from './is-undefined-or-null';
import { TOnDispatch } from './types';

const connect = <TProps, TState, TPropsDerivedFromState, TDispatchers>(mapStateToProps: (state: TState) => TPropsDerivedFromState, mapDispatchToProps: (dispatch: TOnDispatch<TState>) => TDispatchers, areEqual?: (a: TPropsDerivedFromState, b: TPropsDerivedFromState) => boolean): (Component: React.FC<TProps & TPropsDerivedFromState & TDispatchers>) => React.ReactNode =>
  Component => {
    if (isUndefinedOrNull(mapStateToProps)) {
      return connectDispatch<TProps, TState, TDispatchers>(mapDispatchToProps)(Component as React.FC<TProps & TDispatchers>);
    }

    if (isUndefinedOrNull(mapDispatchToProps)) {
      return connectState<TProps, TState, TPropsDerivedFromState>(mapStateToProps, areEqual)(Component as React.FC<TProps & TPropsDerivedFromState>);
    }

    return connectState<TProps, TState, TPropsDerivedFromState>(mapStateToProps, areEqual)(connectDispatch<TProps, TState, TDispatchers>(mapDispatchToProps)(Component as React.FC<TProps & TDispatchers>) as React.FC<TProps & TPropsDerivedFromState>);
  };

export default connect;
