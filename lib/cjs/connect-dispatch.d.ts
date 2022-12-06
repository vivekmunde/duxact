import React from 'react';
import { TOnDispatch } from './types';
declare const connect: <TProps, TState, TDispatchers>(mapDispatchToProps: (dispatch: TOnDispatch<TState>) => TDispatchers) => (Component: React.FC<TProps & TDispatchers>) => React.ReactNode;
export default connect;
