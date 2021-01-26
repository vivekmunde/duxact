import isObject from '../src/is-user-defined-object';

describe('isUserDefinedObject()', () => {
  test('Should return true for user defined object', () => {
    expect.hasAssertions();
    expect(isObject({})).toBe(true);
    expect(isObject({ some: 'value' })).toBe(true);
  });

  test('Should return false for function', () => {
    expect.hasAssertions();
    expect(isObject(() => { })).toBe(false);
  });

  test('Should return false for undefined', () => {
    expect.hasAssertions();
    expect(isObject(undefined)).toBe(false);
  });

  test('Should return false for null', () => {
    expect.hasAssertions();
    expect(isObject(null)).toBe(false);
  });

  test('Should return false for Array', () => {
    expect.hasAssertions();
    expect(isObject(['array'])).toBe(false);
  });

  test('Should return false for string', () => {
    expect.hasAssertions();
    expect(isObject('string')).toBe(false);
  });

  test('Should return false for number', () => {
    expect.hasAssertions();
    expect(isObject(0)).toBe(false);
  });
});