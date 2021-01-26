import isFunction from '../src/is-function';

describe('isFunction()', () => {
  test('Should return true for function', () => {
    expect.hasAssertions();
    expect(isFunction(() => { })).toBe(true);
  });

  test('Should return false for undefined', () => {
    expect.hasAssertions();
    expect(isFunction()).toBe(false);
  });

  test('Should return false for null', () => {
    expect.hasAssertions();
    expect(isFunction(null)).toBe(false);
  });

  test('Should return false for string', () => {
    expect.hasAssertions();
    expect(isFunction('string')).toBe(false);
  });

  test('Should return false for array', () => {
    expect.hasAssertions();
    expect(isFunction(['array'])).toBe(false);
  });

  test('Should return false for object', () => {
    expect.hasAssertions();
    expect(isFunction({ obj: null })).toBe(false);
  });

  test('Should return false for number', () => {
    expect.hasAssertions();
    expect(isFunction(1)).toBe(false);
  });
});