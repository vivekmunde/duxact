import { mount, shallow } from 'enzyme';
import React from 'react';
import { createStore, Provider, useDispatch } from '../lib/cjs';

describe('useDispatch()', () => {
  test('Should throw error if store is not defined in the context', () => {
    expect.hasAssertions();

    expect(() => {
      const Component = () => {
        const dispatch = useDispatch()
        return (
          <button
            onClick={dispatch((state) => state)}
          >
            Click me to update state
          </button>
        );
      };
      shallow(<Component />);
    }).toThrow(new Error('Store is not available in context. Use Provider to define the store in context.'));
  });

  test('Should dispatch event & update state in store', () => {
    expect.hasAssertions();

    const store = createStore({ one: 'initial', two: 'initial' });

    const Button = () => {
      const dispatch = useDispatch();

      const updateState = () => dispatch(() => ({ two: 'changed' }));

      return (
        <button
          onClick={updateState}
        >
          Click me to update state
        </button>
      );
    };

    const wrapper = mount(
      <Provider store={store}>
        <Button />
      </Provider>
    );

    wrapper.find(Button).simulate('click');
    expect(store.getState()).toEqual({ one: 'initial', two: 'changed' });
  });
});