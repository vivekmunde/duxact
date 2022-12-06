import React from 'react';
import { TOnDispatch } from './types';
declare const connect: <TProps, TState, TPropsDerivedFromState, TDispatchers>(mapStateToProps: (state: TState) => TPropsDerivedFromState, mapDispatchToProps: (dispatch: TOnDispatch<TState>) => TDispatchers, areEqual?: ((a: TPropsDerivedFromState, b: TPropsDerivedFromState) => boolean) | undefined) => (Component: React.FC<TProps & TPropsDerivedFromState & TDispatchers>) => React.ReactNode;
export default connect;
