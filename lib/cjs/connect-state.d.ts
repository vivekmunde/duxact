import React from 'react';
declare const connect: <TProps, TState, TPropsDerivedFromState>(mapStateToProps: (state: TState) => TPropsDerivedFromState, areEqual?: ((a: TPropsDerivedFromState, b: TPropsDerivedFromState) => boolean) | undefined) => (Component: React.FC<TProps & TPropsDerivedFromState>) => React.ReactNode;
export default connect;
