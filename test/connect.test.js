import React from 'react';
import { mount } from 'enzyme';
import createStore from '../src/create-store';
import Provider from '../src/provider';
import connect from '../src/connect';

describe('connect()', () => {
  test('Should connect mapStateToProps', () => {
    expect.hasAssertions();

    const mapStateToProps = ({ one, two }) => ({ one, two });

    const StateConsumer = connect(mapStateToProps)(
      ({ one, two }) => (
        <div>{one}{two}</div>
      )
    );

    const wrapper = mount(
      <Provider store={createStore({ one: '1', two: '2' })}>
        <StateConsumer />
      </Provider>
    );

    expect(wrapper.text()).toEqual('12');
  });

  test('Should connect mapDispatchToProps', () => {
    expect.hasAssertions();

    const dispatcher1 = jest.fn(state => state);
    const dispatcher2 = jest.fn(state => state);

    const store = createStore({ one: '1', two: '2' });

    const mapDispatchToProps = dispatch => ({
      action1: dispatch(dispatcher1),
      action2: dispatch(dispatcher2)
    });

    const ActionConsumer = connect(null, mapDispatchToProps)(
      ({ action1, action2 }) => (
        <div>
          <button id="btn1" onClick={action1}>One</button>
          <button id="btn2" onClick={action2}>One</button>
        </div>
      )
    );

    const wrapper = mount(
      <Provider store={store}>
        <ActionConsumer />
      </Provider>
    );

    wrapper.find('#btn1').simulate('click');
    wrapper.find('#btn2').simulate('click');

    expect(dispatcher1).toHaveBeenCalledWith(store.getState());
    expect(dispatcher2).toHaveBeenCalledWith(store.getState());
  });

  test('Should connect mapStateToProps & mapDispatchToProps', () => {
    expect.hasAssertions();

    const dispatcher1 = jest.fn(state => state);
    const dispatcher2 = jest.fn(state => state);

    const store = createStore({ one: '1', two: '2' });

    const mapStateToProps = ({ one, two }) => ({ one, two });

    const mapDispatchToProps = dispatch => ({
      action1: dispatch(dispatcher1),
      action2: dispatch(dispatcher2)
    });

    const Component = connect(mapStateToProps, mapDispatchToProps)(
      ({ action1, action2, one, two }) => (
        <div>
          <div id="div">{one}{two}</div>
          <button id="btn1" onClick={action1}>One</button>
          <button id="btn2" onClick={action2}>Two</button>
        </div>
      )
    );

    const wrapper = mount(
      <Provider store={store}>
        <Component />
      </Provider>
    );

    wrapper.find('#btn1').simulate('click');
    wrapper.find('#btn2').simulate('click');

    expect(wrapper.find('#div').text()).toEqual('12');
    expect(dispatcher1).toHaveBeenCalledWith(store.getState());
    expect(dispatcher2).toHaveBeenCalledWith(store.getState());
  });
});