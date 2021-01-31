import React from 'react';
import { shallow, mount } from 'enzyme';
import createStore from '../src/create-store';
import Provider from '../src/provider';
import useSelector from '../src/use-selector';

describe('useSelector()', () => {
  test('Should throw error if store is not defined in the context', () => {
    expect.hasAssertions();

    expect(() => {
      const Component = () => {
        const state = useSelector((state) => state);
        return (<div>{state.value}</div>);
      };
      shallow(<Component />);
    }).toThrow(new Error('Store is not available in context. Use Provider to define the store in context.'));
  });

  test('Should throw error if mapStateToProps is not a function', () => {
    expect.hasAssertions();

    expect(() => {
      const store = createStore({});
      const Component = () => {
        const state = useSelector();
        return (<div>{state.value}</div>);
      };
      mount(<Provider store={store}><Component /></Provider>);
    }).toThrow(new Error('State mapping must be a function.'));

    expect(() => {
      const store = createStore({});
      const Component = () => {
        const state = useSelector();
        return (<div>{state.value}</div>);
      };
      mount(<Provider store={store}><Component /></Provider>);
    }).toThrow(new Error('State mapping must be a function.'));
  });

  test('Should supply initial state to component', () => {
    expect.hasAssertions();

    const StateConsumer = () => {
      const value = useSelector(({ value }) => value);
      return (<div>{value}</div>);
    };

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

    const StateConsumer = () => {
      const { one, two } = useSelector(({ one, two }) => ({ one, two }));
      return (<div>{one} &amp; {two}</div>);
    };

    const wrapper = mount(
      <Provider store={store}>
        <StateConsumer />
      </Provider>
    );

    store.dispatch(() => ({ two: 'initial' }));

    expect(wrapper.text()).toEqual('initial & initial');

    store.dispatch(() => ({ two: 'changed' }));

    expect(wrapper.text()).toEqual('initial & changed');
  });

  test('Should unsubscribe when the component is unmounted', () => {
    expect.hasAssertions();

    const unsubscribe = jest.fn();
    const store = {
      getState: () => ({ dummy: 'dummy' }),
      subscribe: () => unsubscribe
    };

    const ShowWhenToggleIsTrue = () => {
      const dummy = useSelector(({ dummy }) => dummy);
      return <div>{dummy}</div>;
    };

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

  test('Should update changes to only selected state has changed', () => {
    expect.hasAssertions();

    const store = createStore({ one: 'initial', two: 'initial', three: 'initial' });

    const renderConsumer = jest.fn();

    const StateConsumer = () => {
      const { one, two } = useSelector(({ one, two }) => ({ one, two }));
      renderConsumer();
      return (<div>{one} &amp; {two}</div>);
    };

    const wrapper = mount(
      <Provider store={store}>
        <StateConsumer />
      </Provider>
    );

    expect(wrapper.text()).toEqual('initial & initial');
    expect(renderConsumer).toHaveBeenCalledTimes(1);

    store.dispatch(() => ({ three: 'changed' }));

    expect(wrapper.text()).toEqual('initial & initial');
    expect(renderConsumer).toHaveBeenCalledTimes(1);
  });

  test('Should use passed function for state change comparison', () => {
    expect.hasAssertions();

    const store = createStore({ value: 'no' });

    const renderConsumer = jest.fn();

    const StateConsumer = () => {
      const { value } = useSelector(
        ({ value }) => ({ value }),
        (prevState, newState) => (prevState.value === newState.value),
      );
      renderConsumer();
      return (<div>{value}</div>);
    };

    const wrapper = mount(
      <Provider store={store}>
        <StateConsumer />
      </Provider>
    );

    expect(wrapper.text()).toEqual('no');
    expect(renderConsumer).toHaveBeenCalledTimes(1);

    store.dispatch(() => ({ value: 'no' }));
    expect(wrapper.text()).toEqual('no');
    expect(renderConsumer).toHaveBeenCalledTimes(1);

    store.dispatch(() => ({ value: 'yes' }));
    expect(wrapper.text()).toEqual('yes');
    expect(renderConsumer).toHaveBeenCalledTimes(2);
  });
});
