import React from 'react';
import { shallow, mount } from 'enzyme';
import createStore from '../src/create-store';
import Provider from '../src/provider';
import connectDispatch from '../src/connect-dispatch';

describe('connectDispatch()', () => {
  test('Should throw error if store is not defined in context', () => {
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