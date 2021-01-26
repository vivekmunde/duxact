import isUndefinedOrNull from '../src/is-undefined-or-null';

describe('isUndefinedOrNull()', () => {
  test('Should return true for undefined', () => {
    expect.hasAssertions();
    expect(isUndefinedOrNull()).toBe(true);
  });

  test('Should return true for null', () => {
    expect.hasAssertions();
    expect(isUndefinedOrNull(null)).toBe(true);
  });

  test('Should return false for some value', () => {
    expect.hasAssertions();
    expect(isUndefinedOrNull('')).toBe(false);
    expect(isUndefinedOrNull({})).toBe(false);
    expect(isUndefinedOrNull([])).toBe(false);
  });
});