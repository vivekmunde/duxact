import isUndefined from '../src/is-undefined';

describe('isUndefined()', () => {
  test('Should return true for undefined', () => {
    expect.hasAssertions();
    expect(isUndefined()).toBe(true);
  });

  test('Should return false for null', () => {
    expect.hasAssertions();
    expect(isUndefined(null)).toBe(false);
  });

  test('Should return false for some value', () => {
    expect.hasAssertions();
    expect(isUndefined('')).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined([])).toBe(false);
  });
});