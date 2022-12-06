import { createStore } from '../lib/cjs';

describe('createStore()', () => {
  describe('getState()', () => {
    test('Should return initial state', () => {
      expect.hasAssertions();

      const initialState = { some: 'value' };

      const { getState } = createStore(initialState);

      expect(getState()).toEqual(initialState);
    });

    test('Should return state as an empty object if initial state was not defined', () => {
      expect.hasAssertions();

      const { getState } = createStore();

      expect(getState()).toEqual({});
    });

    test('Should return current state', () => {
      expect.hasAssertions();

      const initialState = { some: 'value' };

      const { getState, dispatch } = createStore(initialState);

      const newState = { some: 'changed' };
      dispatch(() => newState);

      expect(getState()).toEqual(newState);
    });
  });

  describe('dispatch()', () => {
    test('Should throw error if action is not a function', () => {
      expect.hasAssertions();
      expect(() => {
        const { dispatch } = createStore({});
        dispatch();
      }).toThrow(new Error('Action must be a function.'));
    });

    test('Should pass the current state to dispatcher', () => {
      expect.hasAssertions();

      const initialState = { some: 'value' };

      const { dispatch } = createStore(initialState);

      const dispatcher = jest.fn();
      dispatcher.mockReturnValue(initialState);

      dispatch(dispatcher);

      expect(dispatcher).toHaveBeenCalledWith(initialState);
    });

    test('Should update the state', () => {
      expect.hasAssertions();

      const initialState = { one: 'initial', two: 'initial' };

      const { getState, dispatch } = createStore(initialState);

      dispatch(() => ({ two: 'changed' }));

      expect(getState()).toEqual({ one: 'initial', two: 'changed' });
    });
  });

  describe('subscribe()', () => {
    test('Should throw error if listener is not a function', () => {
      expect.hasAssertions();
      const { subscribe } = createStore({});
      expect(() => subscribe()).toThrow(new Error('Listener must be a function.'));
      expect(() => subscribe({})).toThrow(new Error('Listener must be a function.'));
    });

    test('Should not unsubscribe if the subscription is already unsubscribed', () => {
      expect.hasAssertions();

      const { subscribe, dispatch } = createStore({});

      const unsubscriber = subscribe(() => { });

      const subscriber = jest.fn();
      subscribe(subscriber);

      unsubscriber();
      unsubscriber();

      dispatch(() => ({}));

      expect(subscriber).toHaveBeenCalledTimes(1);
    });
  });

  test('Should call the subscribed listeners with updated state', () => {
    expect.hasAssertions();

    const initialState = { some: 'value' };

    const { subscribe, dispatch } = createStore(initialState);

    let newState = { some: 'changed' };
    subscribe((currentState) => {
      expect(currentState).toEqual({ ...initialState, ...newState });
    });
    dispatch(() => newState);

    newState = { some: 'changed again' };
    subscribe((currentState) => {
      expect(currentState).toEqual({ ...initialState, ...newState });
    });
    dispatch(() => newState);
  });

  test('Should unsubscribe the subscribed listeners', () => {
    expect.hasAssertions();

    const initialState = { some: 'value' };

    const { subscribe, dispatch } = createStore(initialState);

    const listener1 = jest.fn();
    const listener2 = jest.fn();

    const unsubscribe1 = subscribe(listener1);
    const unsubscribe2 = subscribe(listener2);

    dispatch(() => ({ some: 'changed' }));

    unsubscribe1();

    dispatch(() => ({ some: 'again' }));

    unsubscribe2();

    dispatch(() => ({ some: 'again & again' }));

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(2);
  });
});