import React from 'react';
import isUndefinedOrNull from './is-undefined-or-null';
import isFunction from './is-function';
import storeContextType from './store-context-type';

const connect = mapStateToProps => Component => {
    class ConnectState extends React.Component {
        static contextTypes = storeContextType;

        constructor(props, context) {
            super(props, context);
            const { store } = context;

            if (isUndefinedOrNull(store)) {
                throw new Error('Store is not available in context. Use Provider to define the store in context.');
            }

            if (!isFunction(mapStateToProps)) {
                throw new Error('State mapping must be a function.');
            }

            this.store = store;
            this.state = mapStateToProps(store.getState());
            this.subscribeToStateChanges();
        }

        componentWillUnmount() {
            this.unsubscribeFromStateChages();
        }

        subscribeToStateChanges = () => {
            this.unsubscribe = this.store.subscribe(this.listener);
        }

        unsubscribeFromStateChages = () => {
            this.unsubscribe();
        }

        listener = state => {
            this.setState(mapStateToProps(state));
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