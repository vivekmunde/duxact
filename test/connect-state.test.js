import React from 'react';
import { shallow, mount } from 'enzyme';
import createStore from '../src/create-store';
import Provider from '../src/provider';
import connectState from '../src/connect-state';

describe('connectState()', () => {
    test('Should throw error if store is not defined in the context', () => {
        expect.hasAssertions();

        expect(() => {
            const Component = connectState(() => { })(<div />);
            shallow(<Component />);
        }).toThrow(new Error('Store is not available in context. Use Provider to define the store in context.'));
    });

    test('Should throw error if mapStateToProps is not a function', () => {
        expect.hasAssertions();

        expect(() => {
            const store = createStore({});
            const Component = connectState()(<div />);
            mount(<Provider store={store}><Component /></Provider>);
        }).toThrow(new Error('State mapping must be a function.'));

        expect(() => {
            const store = createStore({});
            const Component = connectState({})(<div />);
            mount(<Provider store={store}><Component /></Provider>);
        }).toThrow(new Error('State mapping must be a function.'));
    });

    test('Should supply initial state to component', () => {
        expect.hasAssertions();

        const StateConsumer = connectState(({ value }) => ({ value }))(
            ({ value }) => (
                <div>{value}</div>)
        );

        const wrapper = mount(
            <Provider store={createStore({ value: 'initial' })}>
                <StateConsumer />
            </Provider>
        );

        expect(wrapper.text()).toEqual('initial');
    });

    test('Should update changed state to component', () => {
        expect.hasAssertions();

        const store = createStore({ one: 'initial', two: 'initial' });

        const StateConsumer = connectState(({ one, two }) => ({ one, two }))(
            ({ one, two }) => (
                <div>{one} &amp; {two}</div>)
        );

        const wrapper = mount(
            <Provider store={store}>
                <StateConsumer />
            </Provider>
        );

        store.dispatch(() => ({ two: 'changed' }));

        expect(wrapper.text()).toEqual('initial & changed');
    });

    test('Should unsubscribe when the component is unmounded', () => {
        expect.hasAssertions();

        const unsubscribe = jest.fn();
        const store = {
            getState: () => ({ dummy: 'dummy' }),
            subscribe: () => unsubscribe
        };

        const ShowWhenToggleIsTrue = connectState(({ dummy }) => ({ dummy }))(
            () => <div />
        );

        class Component extends React.Component {
            state = { toggle: true }

            toggle = () => {
                this.setState({ toggle: !this.state.toggle });
            }

            render() {
                const { toggle } = this.state;

                return (
                    <div>
                        <button id="btn" onClick={this.toggle}>Toggle</button>
                        {toggle && <ShowWhenToggleIsTrue />}
                    </div>
                );
            }
        }

        const wrapper = mount(
            <Provider store={store}>
                <Component />
            </Provider>
        );

        wrapper.find('#btn').simulate('click');

        expect(unsubscribe).toHaveBeenCalledTimes(1);
    });
});