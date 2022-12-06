import { mount, shallow } from 'enzyme';
import React from 'react';
import { connectDispatch, createStore, Provider } from '../lib/cjs';

describe('connectDispatch()', () => {
  test('Should throw error if store is not defined in the context', () => {
    expect.hasAssertions();

    expect(() => {
      const Component = connectDispatch(() => { })(<div />);
      shallow(<Component />);
    }).toThrow(new Error('Store is not available in context. Use Provider to define the store in context.'));
  });

  test('Should throw error if mapDispatchToProps is not a function', () => {
    expect.hasAssertions();

    const expectedError = new Error('Dispatch mapping must be a function.');

    expect(() => {
      const store = createStore({});
      const Component = connectDispatch()(<div />);
      mount(<Provider store={store}><Component /></Provider>);
    }).toThrow(expectedError);

    expect(() => {
      const store = createStore({});
      const Component = connectDispatch({})(<div />);
      mount(<Provider store={store}><Component /></Provider>);
    }).toThrow(expectedError);
  });

  test('Should dispatch event & update state in store', () => {
    expect.hasAssertions();

    const store = createStore({ one: 'initial', two: 'initial' });

    const Button = connectDispatch(dispatch => ({
      updateState: dispatch(() => ({ two: 'changed' }))
    }))(
      ({ updateState }) => (
        <button
          onClick={updateState}
        >
          Click me to update state
        </button>
      )
    );

    const wrapper = mount(
      <Provider store={store}>
        <Button />
      </Provider>
    );

    wrapper.find(Button).simulate('click');
    expect(store.getState()).toEqual({ one: 'initial', two: 'changed' });
  });
});