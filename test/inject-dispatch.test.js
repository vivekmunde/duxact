import injectDispatch from '../src/inject-dispatch';

describe('injectDispatch()', () => {
  test('Should throw error if dispatchMapping is not defined', () => {
    expect.hasAssertions();
    expect(injectDispatch()).toThrow(new Error('Dispatch mapping must be a user defined object.'));
  });

  test('Should throw error if dispatcher is not a function', () => {
    expect.hasAssertions();
    expect(injectDispatch({ some: undefined })).toThrow(new Error('Dispatcher must be a function.'));
  });

  test('Should inject dispatch as first argument', () => {
    expect.hasAssertions();

    const dispatch = () => { };
    const argument = 'argument';

    const dispatcher = jest.fn();

    const injector = injectDispatch({ dispatcher });

    const { dispatcher: injectedDispatcher } = injector(dispatch);

    injectedDispatcher(argument);
    expect(dispatcher).toHaveBeenCalledWith(dispatch, argument);
  });
});