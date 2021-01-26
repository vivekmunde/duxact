import arrayToMapStateToProps from '../src/array-to-map-state-to-props';

describe('arrayToMapStateToProps()', () => {
  test('Should throw error if argument is not an array of string', () => {
    expect.hasAssertions();
    expect(() => arrayToMapStateToProps()({})).toThrow(new Error('Mapping must be an array of prop names.'));
  });

  test('Should convert array to mapStateToProps', () => {
    expect.hasAssertions();
    const mapStateToProps = arrayToMapStateToProps(['one', 'two']);
    expect(mapStateToProps({ one: '1', two: '2', three: '3' })).toEqual({ one: '1', two: '2' });
  });
});