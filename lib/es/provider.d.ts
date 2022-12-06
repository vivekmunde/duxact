import React from 'react';
import { TStore } from './types';
type TProps<TState> = {
    store: TStore<TState>;
};
declare class Provider<TState> extends React.Component<TProps<TState>> {
    value: {
        duxactStore: TStore<TState>;
    };
    constructor(props: TProps<TState>);
    render(): JSX.Element;
}
export default Provider;
