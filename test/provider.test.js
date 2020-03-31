import React from 'react';
import { shallow, mount } from 'enzyme';
import Provider from '../src/provider';
import StoreContext from '../src/store-context';

describe('<Provider />', () => {
    test('Should throw exception if the store is not defined', () => {
        expect.hasAssertions();

        const expectedError = new Error('Store is undefined.');

        expect(() => shallow(<Provider />)).toThrow(expectedError);
        expect(() => shallow(<Provider store={null} />)).toThrow(expectedError);
    });

    test('Should set store in the context', () => {
        expect.hasAssertions();

        const store = { getState: () => ({ some: 'value' }) };

        class ChildComponent extends React.Component {
            static contextType = StoreContext;

            render() {
                const { duxactStore } = this.context;
                return (
                    <React.Fragment>{duxactStore.getState().some}</React.Fragment>
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