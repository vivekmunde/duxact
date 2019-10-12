import React from 'react';
import isUndefinedOrNull from './is-undefined-or-null';
import StoreContext from './store-context';

class Provider extends React.Component {
    constructor(props, context) {
        super(props, context);

        const { store } = props;

        if (isUndefinedOrNull(store)) {
            throw new Error('Store is undefined.');
        }

        this.store = store;
    }

    render() {
        return (
            <StoreContext.Provider value={{ store: this.store }}>
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            </StoreContext.Provider>
        );
    }
}

export default Provider;
