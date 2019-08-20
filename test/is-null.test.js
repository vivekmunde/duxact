import isNull from '../src/is-null';

describe('isNull()', () => {
    test('Should return true for null', () => {
        expect.hasAssertions();
        expect(isNull(null)).toBe(true);
    });

    test('Should return false for undefined', () => {
        expect.hasAssertions();
        expect(isNull()).toBe(false);
    });

    test('Should return false for some value', () => {
        expect.hasAssertions();
        expect(isNull('')).toBe(false);
        expect(isNull({})).toBe(false);
        expect(isNull([])).toBe(false);
    });
});