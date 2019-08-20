import React from 'react';
import { mount } from 'enzyme';
import Provider from '../src/provider';
import storeContextType from '../src/store-context-type';

describe('<Provider />', () => {
    test('Should throw exception if the store is not defined', () => {
        expect.hasAssertions();

        const expectedError = new Error('Store is undefined.');

        expect(() => mount(<Provider />)).toThrow(expectedError);
        expect(() => mount(<Provider store={null} />)).toThrow(expectedError);
    });

    test('Should set store in the context', () => {
        expect.hasAssertions();

        const store = { getState: () => ({ some: 'value' }) };

        class ChildComponent extends React.Component {
            static contextTypes = storeContextType;

            render() {
                const { store } = this.context;
                return (
                    <div>{store.getState().some}</div>
                );
            }
        }

        const App = () => (
            <Provider store={store}>
                <ChildComponent />
            </Provider>
        );

        const wrapper = mount(<App />);
        expect(wrapper.find(ChildComponent).text()).toEqual('value');
    });
});